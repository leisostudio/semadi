import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { createSupabaseServer } from '@/lib/supabase'
import type { Project } from '@/types/supabase'
import ProjectCard from '@/components/ui/ProjectCard'
import SectionHeader from '@/components/ui/SectionHeader'

async function getFeaturedProjects(): Promise<Project[]> {
  try {
    const supabase = createSupabaseServer()
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(3)

    if (error) throw error
    return data ?? []
  } catch (err) {
    console.error('[FeaturedProjects] fetch error:', err)
    return []
  }
}

// Fallback data for when the DB has no rows yet
const FALLBACK_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Missão Amazônica',
    description:
      'Levando saúde, educação e o evangelho a comunidades ribeirinhas no coração da floresta Amazônica.',
    image_url:
      'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&auto=format&fit=crop&q=60',
    status: 'active',
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Projeto África do Leste',
    description:
      'Implantação de igrejas locais e formação de líderes comunitários no Quênia e Tanzânia.',
    image_url:
      'https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=800&auto=format&fit=crop&q=60',
    status: 'active',
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Povos da Ásia Central',
    description:
      'Tradução de literatura cristã e rádio missionária para povos nômades do Cazaquistão.',
    image_url:
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&auto=format&fit=crop&q=60',
    status: 'active',
    created_at: new Date().toISOString(),
  },
]

export default async function FeaturedProjects() {
  const projects = await getFeaturedProjects()
  const displayProjects = projects.length > 0 ? projects : FALLBACK_PROJECTS

  return (
    <section
      className="section bg-slate-50"
      aria-labelledby="featured-projects-heading"
    >
      <div className="container-site">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <SectionHeader
            eyebrow="Em campo"
            title="Projetos em destaque"
            subtitle="Conheça as missões ativas onde sua doação faz diferença hoje."
            id="featured-projects-heading"
          />
          <Link
            href="/projetos"
            className="shrink-0 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-150"
            aria-label="Ver todos os projetos de missão"
          >
            Ver todos
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
