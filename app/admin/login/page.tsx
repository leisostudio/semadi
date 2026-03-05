'use client'

import { useState, type FormEvent } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Globe, Mail, Lock, Eye, EyeOff, AlertCircle, Loader2 } from 'lucide-react'
import { supabaseBrowser } from '@/lib/supabase'

type State = 'idle' | 'loading' | 'error'

export default function AdminLoginPage() {
  const router       = useRouter()
  const searchParams = useSearchParams()
  const redirectTo   = searchParams.get('redirectTo') ?? '/admin/dashboard'

  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [showPwd,  setShowPwd]  = useState(false)
  const [state,    setState]    = useState<State>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setState('loading')
    setErrorMsg('')

    try {
      const { error } = await supabaseBrowser.auth.signInWithPassword({
        email:    email.trim().toLowerCase(),
        password: password,
      })

      if (error) throw error

      router.push(redirectTo)
      router.refresh()
    } catch (err: unknown) {
      setErrorMsg(
        err instanceof Error && err.message.includes('Invalid')
          ? 'E-mail ou senha incorretos.'
          : 'Ocorreu um erro. Tente novamente.'
      )
      setState('error')
    }
  }

  return (
    /* Full-page layout — overrides the admin layout since this page
       is rendered OUTSIDE the /admin/layout.tsx (middleware redirects
       unauthenticated users here before the layout runs). */
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-blue-800 via-blue-700 to-blue-900 p-4">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-hero-pattern opacity-20 pointer-events-none" aria-hidden="true" />
      <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" aria-hidden="true" />
      <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-blue-900/40 blur-3xl" aria-hidden="true" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm">
            <Globe className="h-7 w-7 text-white" aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-display font-bold text-white">SEMADI Admin</h1>
          <p className="mt-1 text-sm text-blue-200">Acesso restrito — faça login para continuar</p>
        </div>

        {/* Form card */}
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl bg-white p-8 shadow-2xl space-y-5"
          aria-label="Formulário de login administrativo"
          noValidate
        >
          {/* Email */}
          <div>
            <label htmlFor="login-email" className="form-label">E-mail</label>
            <div className="relative">
              <Mail
                className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none"
                aria-hidden="true"
              />
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                required
                placeholder="admin@semadi.org.br"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={state === 'loading'}
                className="form-input pl-10"
                aria-required="true"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="login-password" className="form-label">Senha</label>
            <div className="relative">
              <Lock
                className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none"
                aria-hidden="true"
              />
              <input
                id="login-password"
                type={showPwd ? 'text' : 'password'}
                autoComplete="current-password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={state === 'loading'}
                className="form-input pl-10 pr-10"
                aria-required="true"
              />
              <button
                type="button"
                onClick={() => setShowPwd((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                aria-label={showPwd ? 'Ocultar senha' : 'Mostrar senha'}
              >
                {showPwd
                  ? <EyeOff className="h-4 w-4" aria-hidden="true" />
                  : <Eye    className="h-4 w-4" aria-hidden="true" />}
              </button>
            </div>
          </div>

          {/* Error */}
          {state === 'error' && (
            <div
              role="alert"
              className="flex items-center gap-2.5 rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-700"
            >
              <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
              {errorMsg}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={state === 'loading' || !email || !password}
            className="btn-primary w-full py-3 gap-2"
            aria-busy={state === 'loading'}
          >
            {state === 'loading' ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                Entrando…
              </>
            ) : (
              'Entrar no painel'
            )}
          </button>

          <p className="text-center text-xs text-slate-400">
            Acesso somente para administradores autorizados.
          </p>
        </form>
      </div>
    </div>
  )
}
