create or replace function public.has_role_internal(_user_id uuid, _role public.app_role)
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

revoke execute on function public.has_role_internal(uuid, public.app_role) from public, anon, authenticated;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security invoker
set search_path = public
as $$
    select case
        when _user_id = auth.uid() or public.has_role_internal(auth.uid(), 'admin')
        then public.has_role_internal(_user_id, _role)
        else false
    end;
$$;

grant execute on function public.has_role(uuid, public.app_role) to authenticated;

revoke execute on function public.handle_new_user() from public, anon, authenticated;
revoke execute on function public.generate_reference_number() from public, anon, authenticated;