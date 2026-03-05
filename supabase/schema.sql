-- ============================================================
-- SEMADI – Supabase PostgreSQL Schema
-- Run this in the Supabase SQL Editor to set up your database.
-- ============================================================

-- ── Enable UUID generation ────────────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ── projects ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.projects (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url   TEXT,
  status      TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed')),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Public read
CREATE POLICY "projects_public_read"
  ON public.projects FOR SELECT
  USING (true);

-- Authenticated write
CREATE POLICY "projects_auth_insert"
  ON public.projects FOR INSERT
  TO authenticated WITH CHECK (true);

CREATE POLICY "projects_auth_update"
  ON public.projects FOR UPDATE
  TO authenticated USING (true);

CREATE POLICY "projects_auth_delete"
  ON public.projects FOR DELETE
  TO authenticated USING (true);

-- ── blog_posts ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title      TEXT NOT NULL,
  slug       TEXT NOT NULL UNIQUE,
  content    TEXT NOT NULL DEFAULT '',
  image_url  TEXT,
  author_id  UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "blog_posts_public_read"
  ON public.blog_posts FOR SELECT USING (true);

CREATE POLICY "blog_posts_auth_insert"
  ON public.blog_posts FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "blog_posts_auth_update"
  ON public.blog_posts FOR UPDATE TO authenticated USING (true);

CREATE POLICY "blog_posts_auth_delete"
  ON public.blog_posts FOR DELETE TO authenticated USING (true);

-- ── contact_messages ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  message     TEXT NOT NULL,
  read_status BOOLEAN NOT NULL DEFAULT false,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Anyone can insert (contact form is public)
CREATE POLICY "contact_messages_public_insert"
  ON public.contact_messages FOR INSERT WITH CHECK (true);

-- Only authenticated users can read/update/delete
CREATE POLICY "contact_messages_auth_read"
  ON public.contact_messages FOR SELECT TO authenticated USING (true);

CREATE POLICY "contact_messages_auth_update"
  ON public.contact_messages FOR UPDATE TO authenticated USING (true);

CREATE POLICY "contact_messages_auth_delete"
  ON public.contact_messages FOR DELETE TO authenticated USING (true);

-- ── gallery ──────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.gallery (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url  TEXT NOT NULL,
  caption    TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;

CREATE POLICY "gallery_public_read"
  ON public.gallery FOR SELECT USING (true);

CREATE POLICY "gallery_auth_insert"
  ON public.gallery FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "gallery_auth_update"
  ON public.gallery FOR UPDATE TO authenticated USING (true);

CREATE POLICY "gallery_auth_delete"
  ON public.gallery FOR DELETE TO authenticated USING (true);

-- ── Indexes for performance ───────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_projects_status     ON public.projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON public.projects(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug      ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created   ON public.blog_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_read        ON public.contact_messages(read_status);
CREATE INDEX IF NOT EXISTS idx_messages_created     ON public.contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_gallery_created      ON public.gallery(created_at DESC);
