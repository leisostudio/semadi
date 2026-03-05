import type { Metadata } from 'next'
import { createSupabaseServer } from '@/lib/supabase'
import type { BlogPost } from '@/types/supabase'
import BlogCard from '@/components/ui/BlogCard'
import SectionHeader from '@/components/ui/SectionHeader'

export const metadata: Metadata = {
  title: 'Blog & Notícias',
  description:
    'Artigos, notícias e relatos dos missionários da SEMADI ao redor do mundo.',
}

async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const supabase = createSupabaseServer()
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data ?? []
  } catch (err) {
    console.error('[BlogPage] fetch error:', err)
    return []
  }
}

const FALLBACK: BlogPost[] = [
  { id: '1', title: 'Nova base missionária inaugurada no Acre', slug: 'nova-base-missionaria-acre', content: '<p>Após dois anos de construção, a SEMADI inaugura sua nova base de operações no coração da Amazônia, ampliando o alcance dos projetos na região Norte do Brasil e em países vizinhos da América do Sul.</p>', image_url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&auto=format&fit=crop&q=60', author_id: null, created_at: new Date(Date.now() - 3  * 86400000).toISOString() },
  { id: '2', title: 'Relatório anual 2024: um ano de graça e impacto', slug: 'relatorio-anual-2024', content: '<p>Confira os números, histórias e testemunhos que marcaram 2024 para a SEMADI e os povos que servimos ao redor do mundo. Um ano de conquistas e aprendizados.</p>', image_url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format&fit=crop&q=60', author_id: null, created_at: new Date(Date.now() - 10 * 86400000).toISOString() },
  { id: '3', title: 'Jovens missionários: como a próxima geração está respondendo', slug: 'jovens-missionarios-proxima-geracao', content: '<p>Cada vez mais jovens brasileiros estão respondendo ao chamado missionário. Conversamos com três deles sobre suas histórias, motivações e desafios no campo.</p>', image_url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&auto=format&fit=crop&q=60', author_id: null, created_at: new Date(Date.now() - 20 * 86400000).toISOString() },
  { id: '4', title: 'A história de Fatima: de refugiada a líder comunitária', slug: 'historia-fatima-refugiada-lider', content: '<p>Fatima chegou ao campo de refugiados com nada além de seus filhos. Dois anos depois, coordena um centro de apoio para 300 famílias sírias. Esta é a história de como a esperança muda tudo.</p>', image_url: 'https://images.unsplash.com/photo-1469571486292-b53601010b89?w=800&auto=format&fit=crop&q=60', author_id: null, created_at: new Date(Date.now() - 30 * 86400000).toISOString() },
  { id: '5', title: 'Tradução concluída: a Bíblia em mais uma língua indígena', slug: 'traducao-biblia-lingua-indigena', content: '<p>Após 12 anos de trabalho, a equipe de tradutores da SEMADI conclui a versão da Bíblia na língua Apurinã, falada por menos de 3.000 pessoas na Amazônia.</p>', image_url: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&auto=format&fit=crop&q=60', author_id: null, created_at: new Date(Date.now() - 45 * 86400000).toISOString() },
  { id: '6', title: 'Parceria com hospitais locais expande atendimento no Quênia', slug: 'parceria-hospitais-quenia', content: '<p>A SEMADI firmou parceria com três hospitais no interior do Quênia para levar atendimento médico preventivo a comunidades rurais que antes ficavam dias de distância do serviço mais próximo.</p>', image_url: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&auto=format&fit=crop&q=60', author_id: null, created_at: new Date(Date.now() - 60 * 86400000).toISOString() },
]

export default async function BlogPage() {
  const posts = await getAllPosts()
  const display = posts.length > 0 ? posts : FALLBACK
  const [featured, ...rest] = display

  return (
    <>
      {/* Hero */}
      <div className="page-hero py-20 lg:py-28">
        <div className="page-hero-pattern" aria-hidden="true" />
        <div className="container-site relative z-10 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-blue-200">Notícias</p>
          <h1 className="font-display font-bold text-white text-5xl md:text-6xl">Blog & Notícias</h1>
          <p className="mt-5 text-lg text-blue-100 max-w-xl mx-auto">
            Relatos do campo, artigos de reflexão e notícias dos projetos missionários da SEMADI.
          </p>
        </div>
      </div>

      <div className="section bg-white">
        <div className="container-site">
          {/* Featured */}
          <section aria-labelledby="destaque-heading">
            <SectionHeader
              eyebrow="Destaque"
              title="Mais recente"
              className="mb-8"
              id="destaque-heading"
            />
            <BlogCard post={featured} featured />
          </section>

          {/* All posts grid */}
          {rest.length > 0 && (
            <section aria-labelledby="todos-posts-heading" className="mt-16">
              <SectionHeader
                eyebrow="Arquivo"
                title="Todas as publicações"
                className="mb-8"
                id="todos-posts-heading"
              />
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  )
}
