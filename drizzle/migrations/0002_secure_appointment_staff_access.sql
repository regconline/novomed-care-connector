CREATE OR REPLACE FUNCTION public.has_practice_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = auth.uid()
      AND role = 'practice_admin'
  );
$$;
REVOKE ALL ON FUNCTION public.has_practice_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.has_practice_admin() TO authenticated;
GRANT SELECT ON public.appointment_requests TO authenticated;
CREATE POLICY "Practice administrators can view appointment requests"
ON public.appointment_requests
FOR SELECT
TO authenticated
USING (public.has_practice_admin());