
-- Remove overly permissive UPDATE policy on reports
DROP POLICY IF EXISTS "Anyone can update reports" ON public.reports;

-- Remove broad SELECT (listing) policy on storage.objects for reports bucket.
-- Public bucket files remain accessible via getPublicUrl (CDN), but the bucket
-- can no longer be enumerated through the storage API.
DROP POLICY IF EXISTS "Public read reports" ON storage.objects;

-- Replace anonymous upload policy with one that restricts file type and size
DROP POLICY IF EXISTS "Anyone upload reports" ON storage.objects;

CREATE POLICY "Anyone upload report images"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (
  bucket_id = 'reports'
  AND (storage.extension(name) = ANY (ARRAY['jpg','jpeg','png','webp','gif']))
  AND (metadata->>'size')::bigint < 5242880
);
