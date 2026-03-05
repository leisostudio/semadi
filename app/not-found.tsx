import Link from 'next/link'
import { Globe, ArrowLeft, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center text-center px-6 py-20">
      {/* Icon */}
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-50">
        <Globe className="h-10 w-10 text-blue-400" aria-hidden="true" />
      </div>

      {/* Status */}
      <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-3">
        Erro 404
      </p>

      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-4">
        Página não encontrada
      </h1>

      <p className="text-slate-500 max-w-md mx-auto leading-relaxed mb-10">
        A página que você está procurando não existe ou foi movida. Que tal
        começar pelo início?
      </p>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/" className="btn-primary gap-2">
          <Home className="h-4 w-4" aria-hidden="true" />
          Ir para o início
        </Link>
        <Link href="/contato" className="btn-outline gap-2">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Fale conosco
        </Link>
      </div>
    </div>
  )
}
