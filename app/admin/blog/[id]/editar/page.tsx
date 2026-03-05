import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createSupabaseServer } from '@/lib/supabase'
import BlogPostForm from '@/components/admin/BlogPostForm'

interface Props { params: { id: string } }

export const metadata: Metadata = { title: 'Editar Post | Admin SEMADI' }

export default async function EditarPostPage({ params }: Props) {
  const supabase = createSupabaseServer()
  const { data: post, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', params.id)
    .single()

  if (error || !post) notFound()

  return <BlogPostForm post={post} />
}
