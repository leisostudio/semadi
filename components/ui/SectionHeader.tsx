import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  subtitle?: string
  centered?: boolean
  light?: boolean
  className?: string
  id?: string
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  centered = false,
  light = false,
  className,
  id,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'max-w-2xl',
        centered && 'mx-auto text-center',
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            'mb-3 text-xs font-bold uppercase tracking-widest',
            light ? 'text-blue-200' : 'text-blue-600'
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className={cn(
          'section-title',
          light && 'text-white'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'section-subtitle',
            centered && 'mx-auto',
            light ? 'text-blue-100' : 'text-slate-500'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
