'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2, AlertTriangle, Loader2 } from 'lucide-react'
import { supabaseBrowser } from '@/lib/supabase'

interface Props { id: string; title: string }

export default function DeleteBlogPostButton({ id, title }: Props) {
  const router = useRouter()
  const [open,    setOpen]    = useState(false)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')

  const handleDelete = async () => {
    setLoading(true)
    setError('')
    try {
      const { error } = await supabaseBrowser.from('blog_posts').delete().eq('id', id)
      if (error) throw error
      setOpen(false)
      router.refresh()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro ao excluir.')
      setLoading(false)
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:border-red-200 hover:bg-red-50 hover:text-red-600 transition-all duration-150"
        aria-label={`Excluir post: ${title}`}
      >
        <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="del-post-title">
          <div className="w-full max-w-sm rounded-2xl bg-white shadow-2xl p-6 space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 mx-auto">
              <AlertTriangle className="h-6 w-6 text-red-500" aria-hidden="true" />
            </div>
            <div className="text-center">
              <h3 id="del-post-title" className="text-base font-display font-bold text-slate-900 mb-1">Excluir post?</h3>
              <p className="text-sm text-slate-500">
                <span className="font-semibold text-slate-700">"{title}"</span> será removido permanentemente.
              </p>
            </div>
            {error && <p className="text-xs text-red-600 text-center">{error}</p>}
            <div className="flex gap-3 pt-1">
              <button type="button" onClick={() => setOpen(false)} disabled={loading} className="btn-ghost flex-1">Cancelar</button>
              <button type="button" onClick={handleDelete} disabled={loading} className="btn flex-1 bg-red-600 text-white hover:bg-red-700 gap-2" aria-busy={loading}>
                {loading ? <><Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />Excluindo…</> : 'Excluir'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
