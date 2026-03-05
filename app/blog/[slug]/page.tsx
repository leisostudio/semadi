import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { createSupabaseServer } from '@/lib/supabase'
import type { BlogPost } from '@/types/supabase'
import { Calendar, ArrowLeft, User } from 'lucide-react'
import { stripHtml } from '@/lib/utils'

interface Props {
  params: { slug: string }
}

async function getPost(slug: string): Promise<BlogPost | null> {
  try {
    const supabase = createSupabaseServer()
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error) return null
    return data
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug)
  if (!post) return { title: 'Artigo não encontrado' }

  const excerpt = stripHtml(post.content).slice(0, 160)
  return {
    title: post.title,
    description: excerpt,
    openGraph: {
      title: post.title,
      description: excerpt,
      images: post.image_url ? [{ url: post.image_url }] : [],
      type: 'article',
      publishedTime: post.created_at,
    },
  }
}

// Fallback post for demo purposes
const DEMO_POST: BlogPost = {
  id: 'demo',
  title: 'Nova base missionária inaugurada no Acre',
  slug: 'nova-base-missionaria-acre',
  content: `
    <p>Após dois anos de construção e muita oração, a SEMADI inaugura sua nova base de operações no coração da Amazônia. O projeto, localizado no município de Cruzeiro do Sul (AC), representa um marco histórico para a organização e para os povos que seremos.</p>
    <h2>Uma visão que se torna realidade</h2>
    <p>A ideia surgiu em 2021, quando nossa equipe identificou a necessidade de um ponto estratégico de apoio para as missões na Amazônia Ocidental. Com o generoso apoio de igrejas parceiras e doadores individuais, o sonho se tornou tijolo e concreto.</p>
    <p>A base conta com alojamento para 40 missionários, clínica médica, biblioteca com mais de 3.000 volumes, laboratório de tradução e uma antena de rádio FM comunitária que já alcança 12 comunidades ribeirinhas.</p>
    <h2>Impacto imediato</h2>
    <p>No primeiro mês de operação, a clínica atendeu mais de 200 pacientes de etnias Jaminawa, Kulina e Ashaninka. A rádio transmite programas de saúde, alfabetização e devotos diários em cinco línguas indígenas.</p>
    <blockquote><p>"Esta base é muito mais do que um prédio. É um sinal de que Deus não se esqueceu de nenhum povo na floresta." — Rev. Samuel Alves, Diretor Geral da SEMADI.</p></blockquote>
    <h2>Como você pode ajudar</h2>
    <p>A base ainda precisa de equipamentos médicos, geradores de energia solar e livros didáticos em línguas indígenas. Sua doação vai diretamente para suprir essas necessidades. Acesse nossa página de doações e faça parte desta história.</p>
  `,
  image_url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&auto=format&fit=crop&q=60',
  author_id: null,
  created_at: new Date(Date.now() - 3 * 86400000).toISOString(),
}

export default async function BlogPostPage({ params }: Props) {
  let post = await getPost(params.slug)

  // Use demo post as fallback in dev when DB is empty
  if (!post) {
    if (params.slug === DEMO_POST.slug) {
      post = DEMO_POST
    } else {
      notFound()
    }
  }

  const imageUrl =
    post.image_url ??
    'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&auto=format&fit=crop&q=60'

  return (
    <>
      {/* Back link */}
      <div className="bg-white border-b border-slate-100 py-3">
        <div className="container-site">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors duration-150"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Voltar ao Blog
          </Link>
        </div>
      </div>

      {/* Hero image */}
      <div className="relative aspect-[21/8] w-full overflow-hidden bg-slate-100">
        <Image
          src={imageUrl}
          alt={post.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
      </div>

      {/* Article */}
      <article className="bg-white" itemScope itemType="https://schema.org/Article">
        <div className="container-site max-w-3xl py-12 lg:py-16">
          {/* Meta */}
          <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-slate-400">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" aria-hidden="true" />
              <time dateTime={post.created_at} itemProp="datePublished">
                {new Date(post.created_at).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}
              </time>
            </div>
            <div className="flex items-center gap-1.5">
              <User className="h-4 w-4" aria-hidden="true" />
              <span itemProp="author">Equipe SEMADI</span>
            </div>
          </div>

          {/* Title */}
          <h1
            className="font-display font-bold text-slate-900 text-3xl md:text-4xl lg:text-5xl leading-tight mb-8"
            itemProp="headline"
          >
            {post.title}
          </h1>

          {/* Divider */}
          <div className="h-1 w-16 rounded-full bg-blue-600 mb-10" aria-hidden="true" />

          {/* Rich text content */}
          <div
            className="prose-semadi"
            dangerouslySetInnerHTML={{ __html: post.content }}
            itemProp="articleBody"
          />

          {/* Share / back */}
          <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <Link href="/blog" className="btn-outline gap-2">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Voltar ao Blog
            </Link>
            <Link href="/doacoes" className="btn-accent gap-2">
              Apoiar a SEMADI
            </Link>
          </div>
        </div>
      </article>
    </>
  )
}
