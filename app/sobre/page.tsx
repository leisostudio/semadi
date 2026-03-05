import type { Metadata } from 'next'
import Image from 'next/image'
import { Target, Eye, Heart, Star, Users, Globe, BookOpen } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'

export const metadata: Metadata = {
  title: 'Sobre Nós',
  description:
    'Conheça a história, visão, valores e a equipe por trás da SEMADI — Serviço Missionário.',
}

const values = [
  { icon: Star,     title: 'Integridade',        description: 'Transparência e honestidade em cada ação, relatório e relacionamento.' },
  { icon: Heart,    title: 'Compaixão',           description: 'Amor prático que enxerga e serve o ser humano inteiro: corpo, mente e espírito.' },
  { icon: Globe,    title: 'Respeito Cultural',   description: 'Cada povo tem sua dignidade. Servimos sem impor — aprendemos antes de ensinar.' },
  { icon: BookOpen, title: 'Excelência',          description: 'Fazer bem feito glorifica a Deus e honra quem servimos. Nunca nos contentamos com o mínimo.' },
  { icon: Users,    title: 'Parceria',            description: 'Trabalhamos em rede, somando igrejas, agências e voluntários em torno de um mesmo chamado.' },
  { icon: Target,   title: 'Foco no Iratingível', description: 'Priorizamos os povos e regiões que ainda não tiveram acesso ao evangelho e a serviços básicos.' },
]

const team = [
  {
    name: 'Rev. Samuel Alves',
    role: 'Diretor Geral',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&face',
    bio: 'Mais de 25 anos em campo na Amazônia e no continente africano.',
  },
  {
    name: 'Dra. Lúcia Ferreira',
    role: 'Diretora de Projetos',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60&face',
    bio: 'PhD em Desenvolvimento Social, coordena os projetos de impacto comunitário.',
  },
  {
    name: 'Pr. Marcos Santos',
    role: 'Diretor de Mobilização',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60&face',
    bio: 'Responsável pelo recrutamento e preparo de novos missionários.',
  },
  {
    name: 'Ana Clara Lima',
    role: 'Coordenadora de Comunicação',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60&face',
    bio: 'Jornalista dedicada a contar as histórias que nascem do campo missionário.',
  },
]

const timeline = [
  { year: '1983', event: 'Fundação da SEMADI por um grupo de 12 famílias comprometidas com a missão transcultural.' },
  { year: '1990', event: 'Primeiros missionários enviados ao continente africano — início das missões no Quênia.' },
  { year: '2001', event: 'Expansão para a Ásia Central; abertura de escritório regional no Cazaquistão.' },
  { year: '2010', event: 'Lançamento do Programa Amazônia, com foco em povos indígenas brasileiros.' },
  { year: '2018', event: 'Parceria com 50 igrejas locais para fortalecer a missão integral no Brasil e exterior.' },
  { year: '2024', event: 'Inauguração da nova base operacional no Acre e lançamento da plataforma digital de doações.' },
]

export default function SobrePage() {
  return (
    <>
      {/* ── Page Hero ─────────────────────────────────────────────────────── */}
      <div className="page-hero py-20 lg:py-28">
        <div className="page-hero-pattern" aria-hidden="true" />
        <div className="container-site relative z-10 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-blue-200">
            Nossa história
          </p>
          <h1 className="font-display font-bold text-white text-5xl md:text-6xl">
            Sobre a SEMADI
          </h1>
          <p className="mt-5 text-lg text-blue-100 max-w-xl mx-auto leading-relaxed">
            Quatro décadas de fé, dedicação e serviço aos povos mais vulneráveis do planeta.
          </p>
        </div>
      </div>

      {/* ── History & Story ──────────────────────────────────────────────── */}
      <section className="section bg-white" aria-labelledby="historia-heading">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeader
                eyebrow="Nossa origem"
                title="Uma missão nascida da fé"
                subtitle="Em 1983, um pequeno grupo de famílias com uma visão grande fundou a SEMADI. Desde então, levamos esperança aos confins da terra."
                id="historia-heading"
              />
              <div className="mt-6 space-y-4 text-slate-600 leading-relaxed text-sm">
                <p>
                  A SEMADI — Serviço Missionário Dedicado à Integração — nasceu do sonho de levar
                  o evangelho e o amor prático a povos que nunca haviam ouvido uma mensagem de
                  esperança. O que começou como um projeto familiar cresceu e se tornou uma das
                  maiores agências missionárias independentes do Brasil.
                </p>
                <p>
                  Hoje, com presença em mais de 24 países e centenas de comunidades servidas, a
                  SEMADI continua fiel ao seu chamado original: ir onde outros não foram, servir
                  quem foi esquecido e plantar sementes de transformação duradoura.
                </p>
              </div>
            </div>
            <div className="relative aspect-square max-w-md mx-auto lg:mx-0 w-full">
              <Image
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=700&auto=format&fit=crop&q=60"
                alt="Equipe missionária reunida"
                fill
                className="object-cover rounded-3xl shadow-brand-xl"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Mission / Vision ─────────────────────────────────────────────── */}
      <section className="section bg-slate-50" aria-label="Missão e visão">
        <div className="container-site">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Target, title: 'Missão', color: 'bg-blue-600', text: 'Proclamar o evangelho e servir comunidades vulneráveis com amor prático, comprometimento duradouro e respeito cultural.' },
              { icon: Eye,    title: 'Visão',  color: 'bg-red-600',  text: 'Um mundo onde cada povo, tribo e nação tenha acesso à esperança transformadora — espiritual, social e educacional.' },
              { icon: Heart,  title: 'Propósito', color: 'bg-emerald-600', text: 'Ser instrumento de paz, justiça e amor em regiões de conflito, pobreza extrema e isolamento cultural.' },
            ].map(({ icon: Icon, title, color, text }) => (
              <div key={title} className="card p-8 text-center">
                <div className={`mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${color}`}>
                  <Icon className="h-7 w-7 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-display font-bold text-slate-900 mb-3">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ───────────────────────────────────────────────────────── */}
      <section className="section bg-white" aria-labelledby="valores-heading">
        <div className="container-site">
          <SectionHeader
            eyebrow="O que nos guia"
            title="Nossos valores"
            subtitle="Princípios que moldam cada decisão, relacionamento e projeto da SEMADI."
            centered
            className="mb-12"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex gap-4 p-5 rounded-2xl border border-slate-100 hover:border-blue-100 hover:shadow-card transition-all duration-300">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1 text-sm">{title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ─────────────────────────────────────────────────────── */}
      <section className="section bg-slate-50" aria-labelledby="timeline-heading">
        <div className="container-site max-w-3xl">
          <SectionHeader
            eyebrow="Cronologia"
            title="Marcos da nossa jornada"
            centered
            className="mb-12"
            id="timeline-heading"
          />
          <ol className="relative border-l-2 border-blue-200 space-y-8 pl-8" role="list">
            {timeline.map(({ year, event }) => (
              <li key={year} className="relative" role="listitem">
                <div
                  className="absolute -left-[2.65rem] flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 border-4 border-white shadow-brand-sm"
                  aria-hidden="true"
                >
                  <div className="h-2 w-2 rounded-full bg-white" />
                </div>
                <time className="text-xs font-bold text-blue-600 uppercase tracking-wider" dateTime={year}>
                  {year}
                </time>
                <p className="mt-1 text-sm text-slate-600 leading-relaxed">{event}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Team ─────────────────────────────────────────────────────────── */}
      <section className="section bg-white" aria-labelledby="equipe-heading">
        <div className="container-site">
          <SectionHeader
            eyebrow="Liderança"
            title="Nossa equipe"
            subtitle="Pessoas comprometidas com a missão, movidas pela fé e pela compaixão."
            centered
            className="mb-12"
            id="equipe-heading"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map(({ name, role, image, bio }) => (
              <article key={name} className="card p-6 text-center group">
                <div className="relative mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full ring-4 ring-blue-50 group-hover:ring-blue-200 transition-all duration-300">
                  <Image
                    src={image}
                    alt={`Foto de ${name}`}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
                <h3 className="font-display font-bold text-slate-900 text-base">{name}</h3>
                <p className="text-xs font-semibold text-blue-600 mt-0.5 mb-2">{role}</p>
                <p className="text-xs text-slate-500 leading-relaxed">{bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
