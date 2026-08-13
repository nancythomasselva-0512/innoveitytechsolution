-- =========================================================================
-- INNOVEITY TECH SOLUTION - SUPABASE PRODUCTION DATABASE SCHEMA
-- Execute this SQL script in your Supabase SQL Editor (https://supabase.com/dashboard)
-- =========================================================================

-- 1. Key-Value Settings Table for CMS Sections (Home, About, Contact, SEO, Custom Fields)
CREATE TABLE IF NOT EXISTS public.cms_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Projects Table
CREATE TABLE IF NOT EXISTS public.cms_projects (
    id BIGINT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT,
    description TEXT,
    image TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Showcase Projects Table
CREATE TABLE IF NOT EXISTS public.cms_showcase_projects (
    id TEXT PRIMARY KEY,
    tag TEXT,
    title TEXT NOT NULL,
    subtitle TEXT,
    description TEXT,
    image TEXT,
    tech JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Team Members Table
CREATE TABLE IF NOT EXISTS public.cms_team (
    id BIGINT PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT,
    category TEXT DEFAULT 'Team Member',
    image TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Admin Users Table
CREATE TABLE IF NOT EXISTS public.cms_admin_users (
    id BIGINT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'Admin',
    status TEXT DEFAULT 'Active',
    last_login TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================================================
-- DISABLE RLS / ALLOW ANONYMOUS ACCESS FOR PUBLIC WEBSITE DATA
-- (Or configure public read, authenticated update policies)
-- =========================================================================

ALTER TABLE public.cms_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_showcase_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_team ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_admin_users ENABLE ROW LEVEL SECURITY;

-- Allow Public Read Access
CREATE POLICY "Public Read Settings" ON public.cms_settings FOR SELECT USING (true);
CREATE POLICY "Public Write Settings" ON public.cms_settings FOR ALL USING (true);

CREATE POLICY "Public Read Projects" ON public.cms_projects FOR SELECT USING (true);
CREATE POLICY "Public Write Projects" ON public.cms_projects FOR ALL USING (true);

CREATE POLICY "Public Read Showcase" ON public.cms_showcase_projects FOR SELECT USING (true);
CREATE POLICY "Public Write Showcase" ON public.cms_showcase_projects FOR ALL USING (true);

CREATE POLICY "Public Read Team" ON public.cms_team FOR SELECT USING (true);
CREATE POLICY "Public Write Team" ON public.cms_team FOR ALL USING (true);

CREATE POLICY "Public Read Admin Users" ON public.cms_admin_users FOR SELECT USING (true);
CREATE POLICY "Public Write Admin Users" ON public.cms_admin_users FOR ALL USING (true);

-- =========================================================================
-- ENABLE SUPABASE REALTIME PUBLICATION FOR LIVE SYNC ACROSS ALL DEVICES
-- =========================================================================

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime') THEN
    CREATE PUBLICATION supabase_realtime;
  END IF;
END $$;

ALTER PUBLICATION supabase_realtime ADD TABLE public.cms_settings;
ALTER PUBLICATION supabase_realtime ADD TABLE public.cms_projects;
ALTER PUBLICATION supabase_realtime ADD TABLE public.cms_showcase_projects;
ALTER PUBLICATION supabase_realtime ADD TABLE public.cms_team;
ALTER PUBLICATION supabase_realtime ADD TABLE public.cms_admin_users;

-- Done!
