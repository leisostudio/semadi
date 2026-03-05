'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Save, Loader2, ArrowLeft, AlertCircle, CheckCircle, RefreshCw } from 'lucide-react'
import Link from 'next/link'
import { supabaseBrowser } from '@/lib/supabase'
import type { BlogPost, BlogPostInsert, BlogPostUpdate } from '@/types/supabase'
import { slugify } from '@/lib/utils'
import RichTextEditor from '@/components/admin/RichTextEditor'

interface Props { post?: BlogPost }

type FormState = 'idle' | 'loading' | 'success' | 'error'

export default function BlogPostForm({ post }: Props) {
  const router = useRouter()
  const isEdit = !!post

  const [title,    setTitle]    = useState(post?.title     ?? '')
  const [slug,     setSlug]     = useState(post?.slug      ?? '')
  const [imageUrl, setImageUrl] = useState(post?.image_url ?? '')
  const [content,  setContent]  = useState(post?.content   ?? '')
  const [slugManual, setSlugManual] = useState(isEdit)

  const [formState, setFormState] = useState<FormState>('idle')
  const [errorMsg,  setErrorMsg]  = useState('')

  const handleTitleChange = (val: string) => {
    setTitle(val)
    if (!slugManual) setSlug(slugify(val))
  }

  const handleSlugChange = (val: string) => {
    setSlugManual(true)
    setSlug(slugify(val))
  }

  const regenerateSlug = () => {
    setSlug(slugify(title))
    setSlugManual(false)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!content.replace(/<[^>]*>/g, '').trim()) {
      setErrorMsg('O conteúdo do post não pode estar vazio.')
      setFormState('error')
      return
    }
    setFormState('loading')
    setErrorMsg('')

    try {
      if (isEdit) {
        const payload: BlogPostUpdate = {
          title:     title.trim(),
          slug:      slug.trim(),
          image_url: imageUrl.trim() || null,
          content,
        }
        const { error } = await supabaseBrowser.from('blog_posts').update(payload).eq('id', post.id)
        if (error) throw error
      } else {
        const payload: BlogPostInsert = {
          title:     title.trim(),
          slug:      slug.trim(),
          image_url: imageUrl.trim() || null,
          content,
          author_id: null,
        }
        const { error } = await supabaseBrowser.from('blog_posts').insert(payload)
        if (error) throw error
      }

      setFormState('success')
      setTimeout(() => {
        router.push('/admin/blog')
        router.refresh()
      }, 800)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Erro ao salvar.'
      // Friendly duplicate slug message
      setErrorMsg(msg.includes('duplicate') || msg.includes('unique')
        ? 'Esse slug já está em uso. Escolha um slug diferente.'
        : msg)
      setFormState('error')
    }
  }

  const isLoading = formState === 'loading'
  const isSuccess = formState === 'success'
  const disabled  = isLoading || isSuccess

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Back */}
      <Link
        href="/admin/blog"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Voltar para o blog
      </Link>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* Main card */}
        <div className="rounded-2xl bg-white border border-slate-100 shadow-card p-6 lg:p-8 space-y-5">
          <h2 className="text-lg font-display font-bold text-slate-900">
            {isEdit ? 'Editar post' : 'Novo post'}
          </h2>

          {/* Title */}
          <div>
            <label htmlFor="post-title" className="form-label">
              Título <span className="text-red-500" aria-hidden="true">*</span>
            </label>
            <input
              id="post-title"
              type="text"
              required
              placeholder="Título do artigo"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              disabled={disabled}
              className="form-input text-base font-semibold"
              aria-required="true"
            />
          </div>

          {/* Slug */}
          <div>
            <label htmlFor="post-slug" className="form-label">
              Slug (URL) <span className="text-red-500" aria-hidden="true">*</span>
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-mono pointer-events-none">
                  /blog/
                </span>
                <input
                  id="post-slug"
                  type="text"
                  required
                  placeholder="meu-artigo-aqui"
                  value={slug}
                  onChange={(e) => handleSlugChange(e.target.value)}
                  disabled={disabled}
                  className="form-input pl-14 font-mono text-sm"
                  aria-required="true"
                  aria-describedby="slug-hint"
                />
              </div>
              <button
                type="button"
                onClick={regenerateSlug}
                disabled={disabled || !title}
                className="btn-ghost btn-sm gap-1.5 shrink-0 border border-slate-200"
                title="Gerar slug a partir do título"
              >
                <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
                Gerar
              </button>
            </div>
            <p id="slug-hint" className="mt-1 text-xs text-slate-400">
              Identificador único na URL. Apenas letras minúsculas, números e hifens.
            </p>
          </div>

          {/* Image URL */}
          <div>
            <label htmlFor="post-img" className="form-label">URL da imagem de capa</label>
            <input
              id="post-img"
              type="url"
              placeholder="https://images.unsplash.com/…"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              disabled={disabled}
              className="form-input"
            />
            {imageUrl && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={imageUrl}
                alt="Pré-visualização da capa"
                className="mt-3 h-40 w-full rounded-xl object-cover border border-slate-200"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
              />
            )}
          </div>
        </div>

        {/* Content card */}
        <div className="rounded-2xl bg-white border border-slate-100 shadow-card p-6 lg:p-8 space-y-3">
          <label className="form-label text-base">
            Conteúdo <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <RichTextEditor
            value={content}
            onChange={setContent}
            disabled={disabled}
          />
          <p className="text-xs text-slate-400">
            Use a barra de ferramentas para formatar o texto. Suporta imagens via URL.
          </p>
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
            Post salvo com sucesso! Redirecionando…
          </div>
        )}

        {/* Submit */}
        <div className="flex gap-3">
          <Link href="/admin/blog" className="btn-ghost flex-none">Cancelar</Link>
          <button
            type="submit"
            disabled={disabled || !title || !slug || !content.replace(/<[^>]*>/g, '').trim()}
            className="btn-primary flex-1 gap-2"
            aria-busy={isLoading}
          >
            {isLoading
              ? <><Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />Salvando…</>
              : <><Save    className="h-4 w-4" aria-hidden="true" />{isEdit ? 'Salvar alterações' : 'Publicar post'}</>
            }
          </button>
        </div>
      </form>
    </div>
  )
}
