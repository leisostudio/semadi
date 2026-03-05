import type { Metadata } from 'next'
import { createSupabaseServer } from '@/lib/supabase'
import type { Project } from '@/types/supabase'
import ProjectCard from '@/components/ui/ProjectCard'
import SectionHeader from '@/components/ui/SectionHeader'
import { Globe } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Projetos',
  description:
    'Conheça todas as missões e projetos ativos e concluídos da SEMADI ao redor do mundo.',
}

async function getAllProjects(): Promise<Project[]> {
  try {
    const supabase = createSupabaseServer()
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data ?? []
  } catch (err) {
    console.error('[ProjetosPage] fetch error:', err)
    return []
  }
}

const FALLBACK: Project[] = [
  { id: '1', title: 'Missão Amazônica', description: 'Levando saúde, educação e o evangelho a comunidades ribeirinhas no coração da floresta Amazônica. Trabalho pioneiro com 8 etnias diferentes.', image_url: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&auto=format&fit=crop&q=60', status: 'active',    created_at: new Date().toISOString() },
  { id: '2', title: 'Projeto África do Leste', description: 'Implantação de igrejas locais e formação de líderes comunitários no Quênia, Tanzânia e Uganda, com foco em sustentabilidade.', image_url: 'https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=800&auto=format&fit=crop&q=60', status: 'active',    created_at: new Date().toISOString() },
  { id: '3', title: 'Povos da Ásia Central', description: 'Tradução de literatura cristã e rádio missionária para povos nômades do Cazaquistão, Quirguistão e Uzbequistão.', image_url: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&auto=format&fit=crop&q=60', status: 'active',    created_at: new Date().toISOString() },
  { id: '4', title: 'Escolas do Sertão', description: 'Construção e manutenção de escolas rurais no semiárido nordestino, beneficiando mais de 2.000 crianças e adolescentes.', image_url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=60', status: 'completed', created_at: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString() },
  { id: '5', title: 'Missão Oceania', description: 'Parceria com igrejas locais na Papua-Nova Guiné para a tradução da Bíblia em três línguas minoritárias.', image_url: 'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=800&auto=format&fit=crop&q=60', status: 'completed', created_at: new Date(Date.now() - 400 * 24 * 60 * 60 * 1000).toISOString() },
  { id: '6', title: 'Refugiados do Oriente Médio', description: 'Assistência humanitária e espiritual a famílias deslocadas por conflitos na Síria, Iraque e Líbano.', image_url: 'https://images.unsplash.com/photo-1469571486292-b53601010b89?w=800&auto=format&fit=crop&q=60', status: 'active',    created_at: new Date().toISOString() },
]

export default async function ProjetosPage() {
  const projects = await getAllProjects()
  const display = projects.length > 0 ? projects : FALLBACK

  const active    = display.filter((p) => p.status === 'active')
  const completed = display.filter((p) => p.status === 'completed')

  return (
    <>
      {/* Hero */}
      <div className="page-hero py-20 lg:py-28">
        <div className="page-hero-pattern" aria-hidden="true" />
        <div className="container-site relative z-10 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-blue-200">Em campo</p>
          <h1 className="font-display font-bold text-white text-5xl md:text-6xl">
            Nossos Projetos
          </h1>
          <p className="mt-5 text-lg text-blue-100 max-w-xl mx-auto">
            Cada projeto é uma história de fé, dedicação e transformação. Conheça onde estamos atuando.
          </p>
        </div>
      </div>

      {/* Stats banner */}
      <div className="bg-white border-b border-slate-100 py-6">
        <div className="container-site flex flex-wrap justify-center gap-8 sm:gap-16 text-center">
          <div>
            <p className="text-3xl font-display font-bold text-blue-600">{active.length}</p>
            <p className="text-xs text-slate-500 mt-0.5">Projetos ativos</p>
          </div>
          <div>
            <p className="text-3xl font-display font-bold text-emerald-600">{completed.length}</p>
            <p className="text-xs text-slate-500 mt-0.5">Projetos concluídos</p>
          </div>
          <div>
            <p className="text-3xl font-display font-bold text-slate-900">24+</p>
            <p className="text-xs text-slate-500 mt-0.5">Países alcançados</p>
          </div>
        </div>
      </div>

      {/* Active projects */}
      {active.length > 0 && (
        <section className="section bg-white" aria-labelledby="ativos-heading">
          <div className="container-site">
            <SectionHeader
              eyebrow="Em andamento"
              title="Missões ativas"
              subtitle="Projetos que precisam do seu apoio agora. Sua doação sustenta cada um deles."
              className="mb-10"
              id="ativos-heading"
            />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {active.map((project) => (
                <ProjectCard key={project.id} project={project} id={project.id} />
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link href="/doacoes" className="btn-accent btn-lg gap-2">
                <Globe className="h-5 w-5" aria-hidden="true" />
                Apoiar um projeto
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Completed projects */}
      {completed.length > 0 && (
        <section className="section bg-slate-50" aria-labelledby="concluidos-heading">
          <div className="container-site">
            <SectionHeader
              eyebrow="Concluídos"
              title="Missões concluídas"
              subtitle="Histórias encerradas com sucesso — uma herança de fé e impacto duradouro."
              className="mb-10"
              id="concluidos-heading"
            />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {completed.map((project) => (
                <ProjectCard key={project.id} project={project} id={project.id} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
