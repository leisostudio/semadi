export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

// ─── Database Schema Types ────────────────────────────────────────────────────

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: Project
        Insert: ProjectInsert
        Update: ProjectUpdate
      }
      blog_posts: {
        Row: BlogPost
        Insert: BlogPostInsert
        Update: BlogPostUpdate
      }
      contact_messages: {
        Row: ContactMessage
        Insert: ContactMessageInsert
        Update: ContactMessageUpdate
      }
      gallery: {
        Row: GalleryItem
        Insert: GalleryItemInsert
        Update: GalleryItemUpdate
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: {
      project_status: 'active' | 'completed'
    }
  }
}

// ─── Project ──────────────────────────────────────────────────────────────────

export interface Project {
  id: string
  title: string
  description: string
  image_url: string | null
  status: 'active' | 'completed'
  created_at: string
}

export type ProjectInsert = Omit<Project, 'id' | 'created_at'> & {
  id?: string
  created_at?: string
}

export type ProjectUpdate = Partial<ProjectInsert>

// ─── Blog Post ────────────────────────────────────────────────────────────────

export interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  image_url: string | null
  author_id: string | null
  created_at: string
}

export type BlogPostInsert = Omit<BlogPost, 'id' | 'created_at'> & {
  id?: string
  created_at?: string
}

export type BlogPostUpdate = Partial<BlogPostInsert>

// ─── Contact Message ──────────────────────────────────────────────────────────

export interface ContactMessage {
  id: string
  name: string
  email: string
  message: string
  read_status: boolean
  created_at: string
}

export type ContactMessageInsert = Omit<ContactMessage, 'id' | 'created_at'> & {
  id?: string
  created_at?: string
  read_status?: boolean
}

export type ContactMessageUpdate = Partial<ContactMessageInsert>

// ─── Gallery ─────────────────────────────────────────────────────────────────

export interface GalleryItem {
  id: string
  image_url: string
  caption: string | null
  created_at: string
}

export type GalleryItemInsert = Omit<GalleryItem, 'id' | 'created_at'> & {
  id?: string
  created_at?: string
}

export type GalleryItemUpdate = Partial<GalleryItemInsert>

// ─── Convenience Re-exports ───────────────────────────────────────────────────

export type ProjectStatus = Database['public']['Enums']['project_status']
