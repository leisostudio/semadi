import type { Metadata } from 'next'
import { createSupabaseServer } from '@/lib/supabase'
import type { ContactMessage } from '@/types/supabase'
import { MessageSquare } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import MessageRow from '@/components/admin/MessageRow'

export const metadata: Metadata = { title: 'Mensagens | Admin SEMADI' }

async function getMessages(): Promise<ContactMessage[]> {
  try {
    const supabase = createSupabaseServer()
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw error
    return data ?? []
  } catch (err) {
    console.error('[AdminMensagens] fetch error:', err)
    return []
  }
}

export default async function AdminMensagensPage() {
  const messages = await getMessages()
  const unread = messages.filter((m) => !m.read_status).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-display font-bold text-slate-900">Mensagens de contato</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            {messages.length} mensagens
            {unread > 0 && (
              <span className="ml-2 inline-flex items-center rounded-full bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5">
                {unread} não lidas
              </span>
            )}
          </p>
        </div>
      </div>

      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl bg-white border border-slate-100 shadow-card py-20 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 mb-4">
            <MessageSquare className="h-7 w-7 text-slate-400" aria-hidden="true" />
          </div>
          <h3 className="text-sm font-semibold text-slate-700 mb-1">Nenhuma mensagem</h3>
          <p className="text-xs text-slate-400">As mensagens do formulário de contato aparecerão aqui.</p>
        </div>
      ) : (
        <div className="rounded-2xl bg-white border border-slate-100 shadow-card overflow-hidden">
          <ul className="divide-y divide-slate-50" role="list" aria-label="Mensagens de contato">
            {messages.map((message) => (
              <MessageRow key={message.id} message={message} />
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
