import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { createSupabaseServer } from '@/lib/supabase'
import type { BlogPost } from '@/types/supabase'
import BlogCard from '@/components/ui/BlogCard'
import SectionHeader from '@/components/ui/SectionHeader'

async function getLatestPosts(): Promise<BlogPost[]> {
  try {
    const supabase = createSupabaseServer()
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(3)

    if (error) throw error
    return data ?? []
  } catch (err) {
    console.error('[LatestBlog] fetch error:', err)
    return []
  }
}

const FALLBACK_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Nova base missionária inaugurada no Acre',
    slug: 'nova-base-missionaria-acre',
    content:
      '<p>Após dois anos de construção, a SEMADI inaugura sua nova base de operações no coração da Amazônia, ampliando o alcance dos projetos na região Norte do Brasil e em países vizinhos.</p>',
    image_url:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&auto=format&fit=crop&q=60',
    author_id: null,
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    title: 'Relatório anual 2024: um ano de graça e impacto',
    slug: 'relatorio-anual-2024',
    content:
      '<p>Confira os números, histórias e testemunhos que marcaram 2024 para a SEMADI e os povos que servimos ao redor do mundo.</p>',
    image_url:
      'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format&fit=crop&q=60',
    author_id: null,
    created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    title: 'Jovens missionários: como a próxima geração está respondendo',
    slug: 'jovens-missionarios-proxima-geracao',
    content:
      '<p>Cada vez mais jovens brasileiros estão respondendo ao chamado missionário. Conversamos com três deles sobre suas histórias e motivações.</p>',
    image_url:
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&auto=format&fit=crop&q=60',
    author_id: null,
    created_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

export default async function LatestBlog() {
  const posts = await getLatestPosts()
  const displayPosts = posts.length > 0 ? posts : FALLBACK_POSTS
  const [featured, ...rest] = displayPosts

  return (
    <section className="section bg-white" aria-labelledby="latest-blog-heading">
      <div className="container-site">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <SectionHeader
            eyebrow="Blog & Notícias"
            title="Últimas do campo"
            subtitle="Histórias, relatórios e reflexões dos nossos missionários ao redor do mundo."
            id="latest-blog-heading"
          />
          <Link
            href="/blog"
            className="shrink-0 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-150"
            aria-label="Ver todos os artigos do blog"
          >
            Ver todos
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        {/* Layout: featured + 2 secondary */}
        {displayPosts.length === 1 ? (
          <BlogCard post={featured} featured />
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
            {/* Featured post – takes 3 columns */}
            <div className="lg:col-span-3">
              <BlogCard post={featured} featured className="h-full" />
            </div>
            {/* Side posts – 2 columns */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {rest.slice(0, 2).map((post) => (
                <BlogCard key={post.id} post={post} className="flex-1" />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
