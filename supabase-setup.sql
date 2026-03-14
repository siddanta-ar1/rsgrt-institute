-- ============================================================
-- RSGRT Institute — Complete Database Setup
-- Safe to run even if tables/policies already exist.
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New query)
-- ============================================================


-- ────────────────────────────────────────────────────────────
-- 1. ENABLE EXTENSIONS
-- ────────────────────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- ────────────────────────────────────────────────────────────
-- 2. TABLES (already exist — skip creation, fix FK cascades)
-- ────────────────────────────────────────────────────────────

-- Add ON DELETE CASCADE to profiles → auth.users (if missing)
ALTER TABLE public.profiles
  DROP CONSTRAINT IF EXISTS profiles_id_fkey,
  ADD CONSTRAINT profiles_id_fkey
    FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- Add ON DELETE CASCADE to messages → profiles (if missing)
ALTER TABLE public.messages
  DROP CONSTRAINT IF EXISTS messages_profile_id_fkey,
  ADD CONSTRAINT messages_profile_id_fkey
    FOREIGN KEY (profile_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


-- ────────────────────────────────────────────────────────────
-- 3. ENABLE ROW LEVEL SECURITY
-- ────────────────────────────────────────────────────────────
ALTER TABLE public.courses  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;


-- ────────────────────────────────────────────────────────────
-- 4. RLS POLICIES — COURSES
-- ────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "Public read access to courses" ON public.courses;
CREATE POLICY "Public read access to courses"
  ON public.courses FOR SELECT
  TO public
  USING (true);


-- ────────────────────────────────────────────────────────────
-- 5. RLS POLICIES — NEWS
-- ────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "Public read access to news" ON public.news;
CREATE POLICY "Public read access to news"
  ON public.news FOR SELECT
  TO public
  USING (true);


-- ────────────────────────────────────────────────────────────
-- 6. RLS POLICIES — PROFILES
-- ────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON public.profiles;
CREATE POLICY "Public profiles are viewable by everyone."
  ON public.profiles FOR SELECT
  TO public
  USING (true);

DROP POLICY IF EXISTS "Users can insert their own profile." ON public.profiles;
CREATE POLICY "Users can insert their own profile."
  ON public.profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile." ON public.profiles;
CREATE POLICY "Users can update their own profile."
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);


-- ────────────────────────────────────────────────────────────
-- 7. RLS POLICIES — MESSAGES
-- ────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "Authenticated users can read all messages." ON public.messages;
CREATE POLICY "Authenticated users can read all messages."
  ON public.messages FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Users can insert their own messages." ON public.messages;
CREATE POLICY "Users can insert their own messages."
  ON public.messages FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = profile_id);


-- ────────────────────────────────────────────────────────────
-- 8. AUTO-CREATE PROFILE ON SIGNUP (TRIGGER)
-- ────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, username, avatar_url, updated_at)
  VALUES (
    NEW.id,
    COALESCE(
      NULLIF(NEW.raw_user_meta_data ->> 'full_name', ''),
      NULLIF(split_part(NEW.email, '@', 1), ''),
      'user_' || LEFT(NEW.id::text, 8)
    ),
    NEW.raw_user_meta_data ->> 'avatar_url',
    now()
  )
  ON CONFLICT (id) DO UPDATE SET
    username = EXCLUDED.username,
    avatar_url = EXCLUDED.avatar_url,
    updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();


-- ────────────────────────────────────────────────────────────
-- 9. INDEXES FOR PERFORMANCE
-- ────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_messages_profile_id ON public.messages(profile_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON public.messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_news_created_at ON public.news(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_courses_syllabus_slug ON public.courses(syllabus_slug);


-- ────────────────────────────────────────────────────────────
-- 10. SEED DATA — Courses matching the syllabus slugs
-- ────────────────────────────────────────────────────────────
INSERT INTO public.courses (title, image_url, syllabus_slug) VALUES
  ('ArcGIS Pro',              '/arcgis&qgis.jpeg',  'arcgis'),
  ('Google Earth Engine',     '/search.png',         'gee'),
  ('Python for Data Science', '/python.jpeg',        'python'),
  ('QGIS',                   '/arcgis&qgis.jpeg',   'qgis'),
  ('R Programming',          '/r.jpeg',              'r-programming'),
  ('SPSS Statistics',         '/ml.png',             'spss'),
  ('Web Development',        '/webDesign.png',       'web-development')
ON CONFLICT (syllabus_slug) DO NOTHING;


-- ============================================================
-- DONE! Safe to re-run — all statements are idempotent.
-- ============================================================
