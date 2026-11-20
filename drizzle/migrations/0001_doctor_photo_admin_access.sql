CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL,
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own assigned roles"
  ON public.user_roles FOR SELECT TO authenticated
  USING (user_id = auth.uid());
CREATE OR REPLACE FUNCTION public.has_doctor_photo_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'doctor_photo_admin'
  );
$$;
REVOKE ALL ON FUNCTION public.has_doctor_photo_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.has_doctor_photo_admin() TO authenticated;
CREATE POLICY "Visitors can view doctor portraits"
  ON storage.objects FOR SELECT TO anon, authenticated
  USING (bucket_id = 'doctor-portraits' AND name IN ('dr-z-a-essop.jpg', 'dr-m-y-samsodien.jpg'));
CREATE POLICY "Doctor photo administrators can upload portraits"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'doctor-portraits' AND name IN ('dr-z-a-essop.jpg', 'dr-m-y-samsodien.jpg') AND public.has_doctor_photo_admin());
CREATE POLICY "Doctor photo administrators can replace portraits"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'doctor-portraits' AND name IN ('dr-z-a-essop.jpg', 'dr-m-y-samsodien.jpg') AND public.has_doctor_photo_admin())
  WITH CHECK (bucket_id = 'doctor-portraits' AND name IN ('dr-z-a-essop.jpg', 'dr-m-y-samsodien.jpg') AND public.has_doctor_photo_admin());
CREATE POLICY "Doctor photo administrators can remove portraits"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'doctor-portraits' AND name IN ('dr-z-a-essop.jpg', 'dr-m-y-samsodien.jpg') AND public.has_doctor_photo_admin());