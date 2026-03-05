import type { Metadata } from 'next'
import BlogPostForm from '@/components/admin/BlogPostForm'

export const metadata: Metadata = { title: 'Novo Post | Admin SEMADI' }

export default function NovoPostPage() {
  return <BlogPostForm />
}
