alter function public.update_updated_at_column() set search_path = public;

revoke execute on function public.handle_new_user() from public, authenticated;
revoke execute on function public.generate_reference_number() from public, authenticated;
revoke execute on function public.has_role(uuid, public.app_role) from public;