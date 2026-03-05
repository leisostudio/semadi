'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Mail,
  MailOpen,
  ChevronDown,
  ChevronUp,
  Trash2,
  Check,
  Loader2,
  AlertTriangle,
  User,
  Clock,
} from 'lucide-react'
import { supabaseBrowser } from '@/lib/supabase'
import type { ContactMessage } from '@/types/supabase'
import { formatDate } from '@/lib/utils'

interface Props { message: ContactMessage }

export default function MessageRow({ message }: Props) {
  const router  = useRouter()
  const [expanded,    setExpanded]    = useState(false)
  const [read,        setRead]        = useState(message.read_status)
  const [loadingRead, setLoadingRead] = useState(false)
  const [showDelete,  setShowDelete]  = useState(false)
  const [loadingDel,  setLoadingDel]  = useState(false)
  const [error,       setError]       = useState('')

  const handleMarkRead = async () => {
    if (read) return
    setLoadingRead(true)
    try {
      const { error } = await supabaseBrowser
        .from('contact_messages')
        .update({ read_status: true })
        .eq('id', message.id)
      if (error) throw error
      setRead(true)
    } catch { /* silent */ }
    finally { setLoadingRead(false) }
  }

  const handleExpand = () => {
    setExpanded((v) => !v)
    // Auto-mark as read when opening
    if (!read) handleMarkRead()
  }

  const handleDelete = async () => {
    setLoadingDel(true)
    setError('')
    try {
      const { error } = await supabaseBrowser
        .from('contact_messages')
        .delete()
        .eq('id', message.id)
      if (error) throw error
      setShowDelete(false)
      router.refresh()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro ao excluir.')
      setLoadingDel(false)
    }
  }

  return (
    <li
      className={`transition-colors duration-150 ${read ? '' : 'bg-blue-50/40'}`}
      role="listitem"
    >
      {/* Row summary */}
      <div className="flex items-start gap-4 px-6 py-4">
        {/* Icon */}
        <div
          className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors ${
            read ? 'bg-slate-100 text-slate-400' : 'bg-blue-100 text-blue-600'
          }`}
        >
          {read
            ? <MailOpen className="h-4 w-4" aria-hidden="true" />
            : <Mail     className="h-4 w-4" aria-hidden="true" />}
        </div>

        {/* Main info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <p className={`text-sm font-semibold ${read ? 'text-slate-700' : 'text-slate-900'}`}>
              {message.name}
            </p>
            {!read && (
              <span className="inline-block h-2 w-2 rounded-full bg-blue-500 shrink-0" aria-label="Não lida" />
            )}
            <p className="text-xs text-slate-400">{message.email}</p>
          </div>
          <p className={`mt-0.5 text-sm line-clamp-${expanded ? 'none' : '1'} ${read ? 'text-slate-500' : 'text-slate-700'}`}>
            {message.message}
          </p>
          {/* Date */}
          <p className="mt-1 text-xs text-slate-300 flex items-center gap-1">
            <Clock className="h-3 w-3" aria-hidden="true" />
            {formatDate(message.created_at, { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Mark as read */}
          {!read && (
            <button
              type="button"
              onClick={handleMarkRead}
              disabled={loadingRead}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600 transition-all duration-150"
              aria-label="Marcar como lida"
            >
              {loadingRead
                ? <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                : <Check   className="h-3.5 w-3.5" aria-hidden="true" />}
            </button>
          )}
          {/* Delete */}
          <button
            type="button"
            onClick={() => setShowDelete(true)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:border-red-200 hover:bg-red-50 hover:text-red-600 transition-all duration-150"
            aria-label={`Excluir mensagem de ${message.name}`}
          >
            <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
          {/* Expand toggle */}
          <button
            type="button"
            onClick={handleExpand}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 transition-all duration-150"
            aria-label={expanded ? 'Recolher mensagem' : 'Expandir mensagem'}
            aria-expanded={expanded}
          >
            {expanded
              ? <ChevronUp   className="h-3.5 w-3.5" aria-hidden="true" />
              : <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Expanded view */}
      {expanded && (
        <div className="px-6 pb-5 ml-[3.25rem]">
          <div className="rounded-xl bg-white border border-slate-200 p-5 shadow-card space-y-3">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <User  className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="font-medium text-slate-700">{message.name}</span>
              <span>·</span>
              <a
                href={`mailto:${message.email}`}
                className="text-blue-600 hover:underline font-medium"
              >
                {message.email}
              </a>
            </div>
            <div className="h-px bg-slate-100" aria-hidden="true" />
            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
              {message.message}
            </p>
            <div className="pt-1">
              <a
                href={`mailto:${message.email}?subject=Re: Mensagem SEMADI`}
                className="btn-primary btn-sm gap-1.5"
              >
                <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                Responder por e-mail
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation modal */}
      {showDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="del-msg-title"
        >
          <div className="w-full max-w-sm rounded-2xl bg-white shadow-2xl p-6 space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 mx-auto">
              <AlertTriangle className="h-6 w-6 text-red-500" aria-hidden="true" />
            </div>
            <div className="text-center">
              <h3 id="del-msg-title" className="text-base font-display font-bold text-slate-900 mb-1">Excluir mensagem?</h3>
              <p className="text-sm text-slate-500">
                A mensagem de <span className="font-semibold text-slate-700">{message.name}</span> será removida permanentemente.
              </p>
            </div>
            {error && <p className="text-xs text-red-600 text-center">{error}</p>}
            <div className="flex gap-3 pt-1">
              <button type="button" onClick={() => setShowDelete(false)} disabled={loadingDel} className="btn-ghost flex-1">Cancelar</button>
              <button type="button" onClick={handleDelete} disabled={loadingDel} className="btn flex-1 bg-red-600 text-white hover:bg-red-700 gap-2" aria-busy={loadingDel}>
                {loadingDel
                  ? <><Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />Excluindo…</>
                  : 'Excluir'}
              </button>
            </div>
          </div>
        </div>
      )}
    </li>
  )
}
