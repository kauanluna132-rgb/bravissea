-- Update storage policies to allow image uploads without authentication requirement for vessel-images bucket
DROP POLICY IF EXISTS "Authenticated users can manage vessel images" ON storage.objects;
DROP POLICY IF EXISTS "Vessel images are publicly readable" ON storage.objects;

-- Create new policies for vessel-images bucket
CREATE POLICY "Anyone can upload to vessel-images bucket" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'vessel-images');

CREATE POLICY "Anyone can read vessel-images" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'vessel-images');

CREATE POLICY "Anyone can update vessel-images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'vessel-images')
WITH CHECK (bucket_id = 'vessel-images');

CREATE POLICY "Anyone can delete vessel-images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'vessel-images');

-- Add category column to vessels table
ALTER TABLE vessels ADD COLUMN IF NOT EXISTS category text DEFAULT 'Yacht';