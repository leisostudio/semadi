'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Save, Loader2, ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { supabaseBrowser } from '@/lib/supabase'
import type { Project, ProjectInsert, ProjectUpdate } from '@/types/supabase'

interface Props {
  project?: Project   // if provided → edit mode
}

type FormState = 'idle' | 'loading' | 'success' | 'error'

export default function ProjectForm({ project }: Props) {
  const router    = useRouter()
  const isEdit    = !!project

  const [title,       setTitle]       = useState(project?.title       ?? '')
  const [description, setDescription] = useState(project?.description ?? '')
  const [imageUrl,    setImageUrl]    = useState(project?.image_url   ?? '')
  const [status,      setStatus]      = useState<'active' | 'completed'>(project?.status ?? 'active')
  const [formState,   setFormState]   = useState<FormState>('idle')
  const [errorMsg,    setErrorMsg]    = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setFormState('loading')
    setErrorMsg('')

    try {
      if (isEdit) {
        const payload: ProjectUpdate = {
          title:       title.trim(),
          description: description.trim(),
          image_url:   imageUrl.trim() || null,
          status,
        }
        const { error } = await supabaseBrowser
          .from('projects')
          .update(payload)
          .eq('id', project.id)
        if (error) throw error
      } else {
        const payload: ProjectInsert = {
          title:       title.trim(),
          description: description.trim(),
          image_url:   imageUrl.trim() || null,
          status,
        }
        const { error } = await supabaseBrowser
          .from('projects')
          .insert(payload)
        if (error) throw error
      }

      setFormState('success')
      setTimeout(() => {
        router.push('/admin/projetos')
        router.refresh()
      }, 800)
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Erro ao salvar. Tente novamente.')
      setFormState('error')
    }
  }

  const isLoading  = formState === 'loading'
  const isSuccess  = formState === 'success'

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Back */}
      <Link
        href="/admin/projetos"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Voltar para projetos
      </Link>

      {/* Card */}
      <div className="rounded-2xl bg-white border border-slate-100 shadow-card p-6 lg:p-8">
        <h2 className="text-lg font-display font-bold text-slate-900 mb-6">
          {isEdit ? 'Editar projeto' : 'Novo projeto'}
        </h2>

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {/* Title */}
          <div>
            <label htmlFor="proj-title" className="form-label">
              Título <span className="text-red-500" aria-hidden="true">*</span>
            </label>
            <input
              id="proj-title"
              type="text"
              required
              placeholder="Nome do projeto"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isLoading || isSuccess}
              className="form-input"
              aria-required="true"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="proj-desc" className="form-label">
              Descrição <span className="text-red-500" aria-hidden="true">*</span>
            </label>
            <textarea
              id="proj-desc"
              required
              rows={4}
              placeholder="Descreva o projeto, seu impacto e localização…"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isLoading || isSuccess}
              className="form-textarea"
              aria-required="true"
            />
          </div>

          {/* Image URL */}
          <div>
            <label htmlFor="proj-img" className="form-label">URL da imagem</label>
            <input
              id="proj-img"
              type="url"
              placeholder="https://images.unsplash.com/…"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              disabled={isLoading || isSuccess}
              className="form-input"
            />
            <p className="mt-1 text-xs text-slate-400">
              Deixe em branco para usar imagem padrão. Use URLs do Supabase Storage ou Unsplash.
            </p>
            {/* Preview */}
            {imageUrl && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={imageUrl}
                alt="Pré-visualização"
                className="mt-3 h-40 w-full rounded-xl object-cover border border-slate-200"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
              />
            )}
          </div>

          {/* Status */}
          <div>
            <p className="form-label" id="proj-status-label">Status</p>
            <div className="flex gap-4" role="radiogroup" aria-labelledby="proj-status-label">
              {(['active', 'completed'] as const).map((s) => (
                <label
                  key={s}
                  className={`
                    flex flex-1 cursor-pointer items-center gap-3 rounded-xl border-2 p-4 transition-all duration-150
                    ${status === s
                      ? s === 'active'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-emerald-500 bg-emerald-50'
                      : 'border-slate-200 hover:border-slate-300'}
                  `}
                >
                  <input
                    type="radio"
                    name="status"
                    value={s}
                    checked={status === s}
                    onChange={() => setStatus(s)}
                    disabled={isLoading || isSuccess}
                    className="sr-only"
                  />
                  <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center shrink-0 ${status === s ? (s === 'active' ? 'border-blue-500' : 'border-emerald-500') : 'border-slate-300'}`}>
                    {status === s && (
                      <div className={`h-2 w-2 rounded-full ${s === 'active' ? 'bg-blue-500' : 'bg-emerald-500'}`} />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {s === 'active' ? 'Ativo' : 'Concluído'}
                    </p>
                    <p className="text-xs text-slate-400">
                      {s === 'active' ? 'Missão em andamento' : 'Missão finalizada'}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Feedback */}
          {formState === 'error' && (
            <div role="alert" className="flex items-center gap-2.5 rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-700">
              <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
              {errorMsg}
            </div>
          )}
          {formState === 'success' && (
            <div role="status" className="flex items-center gap-2.5 rounded-xl bg-emerald-50 border border-emerald-100 px-4 py-3 text-sm text-emerald-700">
              <CheckCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
              Projeto salvo com sucesso! Redirecionando…
            </div>
          )}

          {/* Submit */}
          <div className="flex gap-3 pt-2">
            <Link href="/admin/projetos" className="btn-ghost flex-none">
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={isLoading || isSuccess || !title || !description}
              className="btn-primary flex-1 gap-2"
              aria-busy={isLoading}
            >
              {isLoading ? (
                <><Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Salvando…</>
              ) : (
                <><Save className="h-4 w-4" aria-hidden="true" /> {isEdit ? 'Salvar alterações' : 'Criar projeto'}</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
