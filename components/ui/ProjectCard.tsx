import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Clock } from 'lucide-react'
import type { Project } from '@/types/supabase'
import { cn } from '@/lib/utils'

interface ProjectCardProps {
  project: Project
  className?: string
}

const statusConfig = {
  active: {
    label: 'Em andamento',
    icon: Clock,
    className: 'badge-blue',
  },
  completed: {
    label: 'Concluído',
    icon: CheckCircle2,
    className: 'badge-green',
  },
}

export default function ProjectCard({ project, className }: ProjectCardProps) {
  const status = statusConfig[project.status]
  const StatusIcon = status.icon
  const imageUrl =
    project.image_url ??
    `https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&auto=format&fit=crop&q=60`

  return (
    <article
      className={cn(
        'card group flex flex-col overflow-hidden',
        className
      )}
    >
      {/* Image */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
        <Image
          src={imageUrl}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Status badge overlay */}
        <div className="absolute top-3 left-3">
          <span className={cn('badge gap-1', status.className)}>
            <StatusIcon className="h-3 w-3" aria-hidden="true" />
            {status.label}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-display font-bold text-slate-900 mb-2 line-clamp-2">
          {project.title}
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed flex-1 line-clamp-3">
          {project.description}
        </p>

        {/* Footer */}
        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
          <time
            dateTime={project.created_at}
            className="text-xs text-slate-400"
          >
            {new Date(project.created_at).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })}
          </time>
          <Link
            href={`/projetos#${project.id}`}
            className="
              inline-flex items-center gap-1 text-xs font-semibold text-blue-600
              hover:text-blue-700 transition-colors duration-150
            "
            aria-label={`Ver detalhes: ${project.title}`}
          >
            Ver detalhes
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  )
}
