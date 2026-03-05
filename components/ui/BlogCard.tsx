import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Calendar } from 'lucide-react'
import type { BlogPost } from '@/types/supabase'
import { cn } from '@/lib/utils'

interface BlogCardProps {
  post: BlogPost
  featured?: boolean
  className?: string
}

/** Strip HTML tags from rich-text content for the excerpt */
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim()
}

export default function BlogCard({ post, featured = false, className }: BlogCardProps) {
  const imageUrl =
    post.image_url ??
    `https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&auto=format&fit=crop&q=60`

  const excerpt = stripHtml(post.content).slice(0, 160) + '…'

  return (
    <article
      className={cn(
        'card group flex overflow-hidden',
        featured ? 'flex-col md:flex-row' : 'flex-col',
        className
      )}
    >
      {/* Image */}
      <div
        className={cn(
          'relative overflow-hidden bg-slate-100 shrink-0',
          featured
            ? 'aspect-video md:aspect-auto md:w-2/5'
            : 'aspect-video w-full'
        )}
      >
        <Image
          src={imageUrl}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6 lg:p-7">
        {/* Meta */}
        <div className="mb-3 flex items-center gap-2 text-xs text-slate-400">
          <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
          <time dateTime={post.created_at}>
            {new Date(post.created_at).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })}
          </time>
        </div>

        {/* Title */}
        <h3
          className={cn(
            'font-display font-bold text-slate-900 mb-3 line-clamp-2 transition-colors duration-150 group-hover:text-blue-600',
            featured ? 'text-xl md:text-2xl' : 'text-lg'
          )}
        >
          <Link href={`/blog/${post.slug}`} className="focus-visible:outline-blue-500">
            <span className="absolute inset-0" aria-hidden="true" />
            {post.title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-slate-500 leading-relaxed flex-1 line-clamp-3">
          {excerpt}
        </p>

        {/* CTA */}
        <div className="mt-5 flex items-center gap-1 text-sm font-semibold text-blue-600 group-hover:text-blue-700 transition-colors duration-150">
          Leia mais
          <ArrowRight
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </div>
      </div>
    </article>
  )
}
