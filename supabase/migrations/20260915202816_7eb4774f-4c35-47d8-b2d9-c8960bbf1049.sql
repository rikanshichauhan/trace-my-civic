create type public.app_role as enum ('citizen', 'official', 'admin');

create table public.profiles (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users(id) on delete cascade,
    full_name text,
    phone text,
    ward text,
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now(),
    unique (user_id)
);

grant select, insert, update, delete on public.profiles to authenticated;
grant all on public.profiles to service_role;
alter table public.profiles enable row level security;

create policy "Users can read own profile"
    on public.profiles for select to authenticated
    using (auth.uid() = user_id);

create policy "Users can update own profile"
    on public.profiles for update to authenticated
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
    insert into public.profiles (user_id, full_name)
    values (new.id, coalesce(new.raw_user_meta_data->>'full_name', new.email));
    return new;
end;
$$;

create trigger on_auth_user_created
    after insert on auth.users
    for each row execute function public.handle_new_user();

create table public.user_roles (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users(id) on delete cascade,
    role public.app_role not null,
    unique (user_id, role)
);

grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;

create policy "Users can read own roles"
    on public.user_roles for select to authenticated
    using (auth.uid() = user_id);

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
    select exists (
        select 1 from public.user_roles
        where user_id = _user_id and role = _role
    );
$$;

create table public.complaints (
    id uuid primary key default gen_random_uuid(),
    reference_number text unique not null,
    reporter_id uuid not null references auth.users(id),
    category text not null,
    severity text not null,
    landmark text,
    description text not null,
    latitude numeric,
    longitude numeric,
    location_accuracy numeric,
    status text not null default 'submitted',
    assigned_to uuid references auth.users(id),
    ward text,
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now(),
    resolved_at timestamp with time zone
);

grant select, insert, update, delete on public.complaints to authenticated;
grant all on public.complaints to service_role;
alter table public.complaints enable row level security;

create policy "Reporters can manage own complaints"
    on public.complaints for all to authenticated
    using (auth.uid() = reporter_id)
    with check (auth.uid() = reporter_id);

create policy "Assigned officials can view and update"
    on public.complaints for all to authenticated
    using (
        public.has_role(auth.uid(), 'official') and assigned_to = auth.uid()
    )
    with check (
        public.has_role(auth.uid(), 'official') and assigned_to = auth.uid()
    );

create policy "Admins can manage all complaints"
    on public.complaints for all to authenticated
    using (public.has_role(auth.uid(), 'admin'))
    with check (public.has_role(auth.uid(), 'admin'));

create table public.evidence (
    id uuid primary key default gen_random_uuid(),
    complaint_id uuid not null references public.complaints(id) on delete cascade,
    kind text not null check (kind in ('before', 'after')),
    storage_path text not null,
    public_url text,
    uploaded_by uuid not null references auth.users(id),
    created_at timestamp with time zone not null default now()
);

grant select, insert, update, delete on public.evidence to authenticated;
grant all on public.evidence to service_role;
alter table public.evidence enable row level security;

create policy "Reporters can view evidence on own complaints"
    on public.evidence for select to authenticated
    using (
        auth.uid() in (
            select reporter_id from public.complaints where id = complaint_id
        )
    );

create policy "Officials can manage evidence for assigned complaints"
    on public.evidence for all to authenticated
    using (
        public.has_role(auth.uid(), 'official')
        and auth.uid() in (
            select assigned_to from public.complaints where id = complaint_id
        )
    )
    with check (
        public.has_role(auth.uid(), 'official')
        and auth.uid() in (
            select assigned_to from public.complaints where id = complaint_id
        )
    );

create policy "Admins can manage all evidence"
    on public.evidence for all to authenticated
    using (public.has_role(auth.uid(), 'admin'))
    with check (public.has_role(auth.uid(), 'admin'));

create table public.timeline_events (
    id uuid primary key default gen_random_uuid(),
    complaint_id uuid not null references public.complaints(id) on delete cascade,
    status_from text,
    status_to text,
    actor_id uuid references auth.users(id),
    note text,
    created_at timestamp with time zone not null default now()
);

grant select, insert on public.timeline_events to authenticated;
grant all on public.timeline_events to service_role;
alter table public.timeline_events enable row level security;

create policy "Reporters can view timeline of own complaints"
    on public.timeline_events for select to authenticated
    using (
        auth.uid() in (
            select reporter_id from public.complaints where id = complaint_id
        )
    );

create policy "Officials can view and create timeline for assigned complaints"
    on public.timeline_events for all to authenticated
    using (
        public.has_role(auth.uid(), 'official')
        and auth.uid() in (
            select assigned_to from public.complaints where id = complaint_id
        )
    )
    with check (
        public.has_role(auth.uid(), 'official')
        and auth.uid() in (
            select assigned_to from public.complaints where id = complaint_id
        )
    );

create policy "Admins can manage all timeline events"
    on public.timeline_events for all to authenticated
    using (public.has_role(auth.uid(), 'admin'))
    with check (public.has_role(auth.uid(), 'admin'));

create or replace function public.update_updated_at_column()
returns trigger
language plpgsql
as $$
begin
    new.updated_at = now();
    return new;
end;
$$;

create trigger update_complaints_updated_at
    before update on public.complaints
    for each row execute function public.update_updated_at_column();

create or replace function public.generate_reference_number()
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
    next_num integer;
    ref text;
begin
    select coalesce(max(nullif(regexp_replace(reference_number, '[^0-9]', '', 'g'), '')), '0')::integer + 1
    into next_num
    from public.complaints;
    ref := 'CT-' || lpad(next_num::text, 5, '0');
    return ref;
end;
$$;