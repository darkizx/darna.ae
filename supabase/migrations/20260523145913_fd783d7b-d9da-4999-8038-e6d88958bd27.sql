
-- Storage bucket for report images
INSERT INTO storage.buckets (id, name, public) VALUES ('reports', 'reports', true) ON CONFLICT DO NOTHING;

CREATE POLICY "Public read reports" ON storage.objects FOR SELECT USING (bucket_id = 'reports');
CREATE POLICY "Anyone upload reports" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'reports');

-- Reports table
CREATE TABLE public.reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT,
  priority TEXT,
  sentiment TEXT,
  ai_summary TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  image_url TEXT,
  location_name TEXT,
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  reporter_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view reports" ON public.reports FOR SELECT USING (true);
CREATE POLICY "Anyone can insert reports" ON public.reports FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update reports" ON public.reports FOR UPDATE USING (true);

-- Seed sample data across UAE
INSERT INTO public.reports (title, description, category, priority, sentiment, ai_summary, status, location_name, lat, lng, reporter_name) VALUES
('إشارة مرور معطلة', 'إشارة المرور في شارع الشيخ زايد لا تعمل منذ الصباح', 'مرور', 'high', 'negative', 'عطل في إشارة المرور يسبب ازدحاماً', 'in_progress', 'دبي - شارع الشيخ زايد', 25.2048, 55.2708, 'أحمد'),
('تجمع نفايات', 'حاويات النفايات ممتلئة في الحي', 'نفايات', 'medium', 'negative', 'حاجة لجدولة جمع النفايات', 'pending', 'أبوظبي - الكورنيش', 24.4539, 54.3773, 'فاطمة'),
('إنارة شارع', 'أعمدة الإنارة لا تعمل في الشارع الرئيسي', 'إنارة', 'high', 'negative', 'مشكلة سلامة عامة بسبب الإنارة', 'resolved', 'الشارقة - شارع الملك فيصل', 25.3463, 55.4209, 'محمد'),
('حديقة بحاجة صيانة', 'الحديقة العامة تحتاج صيانة للمعدات', 'حدائق', 'low', 'neutral', 'صيانة دورية مطلوبة', 'pending', 'دبي - حديقة الصفا', 25.1853, 55.2521, 'سارة'),
('تسرب مياه', 'تسرب مياه من ماسورة في الشارع', 'مياه', 'high', 'negative', 'تسرب يستوجب تدخل سريع', 'in_progress', 'دبي - الكرامة', 25.2425, 55.3081, 'خالد'),
('مطب صناعي', 'مطب صناعي مفقود يحتاج إعادة تركيب', 'طرق', 'medium', 'neutral', 'سلامة الطرق', 'pending', 'عجمان - وسط المدينة', 25.4052, 55.5136, 'علي');
