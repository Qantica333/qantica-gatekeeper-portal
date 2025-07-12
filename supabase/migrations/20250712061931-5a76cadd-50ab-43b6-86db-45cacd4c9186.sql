
-- Insert a record into downloads table when a file is downloaded
-- This will be used to track downloads with email and file_name
-- The table already exists with the correct structure: id, created_at, email, file_name

-- Let's also create a function to easily insert download records
CREATE OR REPLACE FUNCTION public.record_download(
  p_email TEXT,
  p_file_name TEXT
) 
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.downloads (email, file_name)
  VALUES (p_email, p_file_name);
END;
$$;
