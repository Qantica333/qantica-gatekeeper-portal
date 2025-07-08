
-- Create the downloads table for tracking file downloads
CREATE TABLE IF NOT EXISTS public.downloads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  email TEXT NOT NULL,
  ip_address TEXT,
  file_name TEXT NOT NULL
);

-- Enable RLS on downloads table
ALTER TABLE public.downloads ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for downloads table
CREATE POLICY "Allow insert downloads for authenticated users" 
  ON public.downloads 
  FOR INSERT 
  TO authenticated 
  WITH CHECK (true);

CREATE POLICY "Allow select downloads for authenticated users" 
  ON public.downloads 
  FOR SELECT 
  TO authenticated 
  USING (true);

-- Update the files storage bucket policy to only allow authenticated users to download
DROP POLICY IF EXISTS "Allow public downloads" ON storage.objects;
CREATE POLICY "Allow authenticated downloads only" 
  ON storage.objects 
  FOR SELECT 
  TO authenticated 
  USING (bucket_id = 'files');

-- Create function to get client IP address
CREATE OR REPLACE FUNCTION public.get_client_ip()
RETURNS TEXT AS $$
BEGIN
  RETURN coalesce(
    current_setting('request.headers', true)::json->>'x-forwarded-for',
    current_setting('request.headers', true)::json->>'x-real-ip',
    inet_client_addr()::text
  );
EXCEPTION
  WHEN others THEN
    RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
