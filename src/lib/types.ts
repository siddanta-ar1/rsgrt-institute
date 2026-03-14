// Database types matching the Supabase schema

export type Course = {
  id: string
  title: string
  image_url: string | null
  syllabus_slug: string
}

export type NewsItem = {
  id: string
  title: string
  description: string | null
  image_url: string | null
  external_link: string | null
  created_at: string
}

export type Profile = {
  id: string
  username: string | null
  avatar_url: string | null
  updated_at: string
}

export type Message = {
  id: number
  created_at: string
  content: string
  profile_id: string
  profiles?: Profile
}
