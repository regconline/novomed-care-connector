CREATE TABLE public.appointment_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL CHECK (char_length(first_name) BETWEEN 1 AND 80),
  surname text NOT NULL CHECK (char_length(surname) BETWEEN 1 AND 80),
  phone text NOT NULL CHECK (char_length(phone) BETWEEN 7 AND 25),
  email text CHECK (email IS NULL OR char_length(email) <= 255),
  practice text NOT NULL CHECK (practice IN ('elsies-river','hout-bay')),
  preferred_date date NOT NULL,
  preferred_time text NOT NULL CHECK (preferred_time IN ('morning','midday','afternoon')),
  category text NOT NULL CHECK (char_length(category) <= 80),
  contact_method text NOT NULL CHECK (contact_method IN ('phone','email','sms')),
  privacy_consent boolean NOT NULL CHECK (privacy_consent = true),
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.appointment_requests TO anon, authenticated;
GRANT ALL ON public.appointment_requests TO service_role;
ALTER TABLE public.appointment_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit an appointment request" ON public.appointment_requests
  FOR INSERT TO anon, authenticated WITH CHECK (status = 'new' AND privacy_consent = true);