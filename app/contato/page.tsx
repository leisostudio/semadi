'use client'

import { useState, type FormEvent } from 'react'
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { supabaseBrowser } from '@/lib/supabase'
import type { ContactMessageInsert } from '@/types/supabase'

type FormState = 'idle' | 'loading' | 'success' | 'error'

const initialForm = { name: '', email: '', message: '' }

export default function ContatoPage() {
  const [form, setForm] = useState(initialForm)
  const [state, setState] = useState<FormState>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setState('loading')
    setErrorMsg('')

    try {
      const payload: ContactMessageInsert = {
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        message: form.message.trim(),
        read_status: false,
      }

      const { error } = await supabaseBrowser
        .from('contact_messages')
        .insert(payload)

      if (error) throw error

      setState('success')
      setForm(initialForm)
    } catch (err: unknown) {
      console.error('[Contato] submit error:', err)
      setErrorMsg(
        err instanceof Error
          ? err.message
          : 'Ocorreu um erro. Tente novamente mais tarde.'
      )
      setState('error')
    }
  }

  return (
    <>
      {/* Hero */}
      <div className="page-hero py-20 lg:py-28">
        <div className="page-hero-pattern" aria-hidden="true" />
        <div className="container-site relative z-10 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-blue-200">Fale conosco</p>
          <h1 className="font-display font-bold text-white text-5xl md:text-6xl">Contato</h1>
          <p className="mt-5 text-lg text-blue-100 max-w-xl mx-auto">
            Tem perguntas, quer ser voluntário ou parceiro? Estamos prontos para ouvir você.
          </p>
        </div>
      </div>

      <section className="section bg-white">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">

            {/* ── Contact info ──────────────────────────────────────────── */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-display font-bold text-slate-900 mb-2">
                  Como nos encontrar
                </h2>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Nossa equipe está disponível de segunda a sexta, das 9h às 18h
                  (horário de Brasília).
                </p>
              </div>

              <ul className="space-y-5" role="list">
                {[
                  { icon: Mail,   label: 'E-mail', value: 'contato@semadi.org.br', href: 'mailto:contato@semadi.org.br' },
                  { icon: Phone,  label: 'Telefone', value: '+55 (11) 9999-9999', href: 'tel:+551199999999' },
                  { icon: MapPin, label: 'Endereço', value: 'São Paulo, SP — Brasil', href: undefined },
                ].map(({ icon: Icon, label, value, href }) => (
                  <li key={label} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-0.5">{label}</p>
                      {href ? (
                        <a href={href} className="text-sm font-medium text-slate-800 hover:text-blue-600 transition-colors">
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium text-slate-800">{value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              {/* Volunteer CTA */}
              <div
                id="voluntario"
                className="rounded-2xl bg-blue-50 border border-blue-100 p-6"
              >
                <h3 className="font-display font-bold text-blue-900 mb-2">
                  Quer ser voluntário?
                </h3>
                <p className="text-sm text-blue-700 leading-relaxed mb-4">
                  A SEMADI está sempre em busca de pessoas comprometidas e talentosas.
                  Envie sua mensagem contando sua área de atuação e disponibilidade.
                </p>
                <p className="text-xs text-blue-500">
                  Use o formulário ao lado e mencione "voluntário" na sua mensagem.
                </p>
              </div>
            </div>

            {/* ── Contact Form ──────────────────────────────────────────── */}
            <div className="lg:col-span-3">
              {state === 'success' ? (
                <div className="flex flex-col items-center justify-center text-center py-16 px-6 rounded-3xl bg-emerald-50 border border-emerald-100 h-full min-h-[400px]">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 mb-5">
                    <CheckCircle className="h-8 w-8 text-emerald-600" aria-hidden="true" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-slate-900 mb-3">
                    Mensagem enviada!
                  </h2>
                  <p className="text-slate-500 text-sm max-w-sm leading-relaxed mb-6">
                    Obrigado pelo contato. Nossa equipe responderá em até 2 dias úteis.
                  </p>
                  <button
                    type="button"
                    onClick={() => setState('idle')}
                    className="btn-outline"
                  >
                    Enviar outra mensagem
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="card p-8 lg:p-10 space-y-6"
                  aria-label="Formulário de contato"
                  noValidate
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="form-label">
                        Nome completo <span className="text-red-500" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        placeholder="Seu nome"
                        value={form.name}
                        onChange={handleChange}
                        className="form-input"
                        disabled={state === 'loading'}
                        aria-required="true"
                      />
                    </div>
                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="form-label">
                        E-mail <span className="text-red-500" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="seu@email.com"
                        value={form.email}
                        onChange={handleChange}
                        className="form-input"
                        disabled={state === 'loading'}
                        aria-required="true"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="form-label">
                      Mensagem <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      placeholder="Escreva sua mensagem..."
                      value={form.message}
                      onChange={handleChange}
                      className="form-textarea"
                      disabled={state === 'loading'}
                      aria-required="true"
                    />
                  </div>

                  {/* Error */}
                  {state === 'error' && (
                    <div
                      role="alert"
                      className="flex items-center gap-2.5 rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-700"
                    >
                      <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                      {errorMsg || 'Ocorreu um erro. Tente novamente.'}
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={state === 'loading' || !form.name || !form.email || !form.message}
                    className="btn-primary w-full gap-2 py-3"
                    aria-busy={state === 'loading'}
                  >
                    {state === 'loading' ? (
                      <>
                        <span
                          className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin"
                          aria-hidden="true"
                        />
                        Enviando…
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" aria-hidden="true" />
                        Enviar mensagem
                      </>
                    )}
                  </button>

                  <p className="text-xs text-slate-400 text-center">
                    Suas informações são mantidas em sigilo e nunca compartilhadas.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
