import type { Metadata } from 'next'
import Link from 'next/link'
import { Heart, Copy, QrCode, Banknote, Building, CheckCircle, Globe, Users } from 'lucide-react'
import CopyButton from '@/components/ui/CopyButton'

export const metadata: Metadata = {
  title: 'Doações',
  description:
    'Faça uma doação para a SEMADI e ajude a levar esperança a povos ao redor do mundo. PIX, transferência bancária e cartão de crédito.',
}

const bankDetails = {
  bank: 'Banco do Brasil',
  agency: '1234-5',
  account: '00000-0',
  cnpj: '00.000.000/0001-00',
  name: 'SEMADI – Serviço Missionário',
  pix: 'doacoes@semadi.org.br',
}

const impactTiers = [
  { amount: 'R$ 30',   icon: Heart,  description: 'Alimenta uma família missionária por uma semana' },
  { amount: 'R$ 60',   icon: Users,  description: 'Fornece materiais escolares para 5 crianças' },
  { amount: 'R$ 100',  icon: Globe,  description: 'Patrocina material didático para 10 crianças' },
  { amount: 'R$ 200',  icon: Globe,  description: 'Cobre despesas médicas básicas de uma comunidade por um mês' },
  { amount: 'R$ 300',  icon: Banknote, description: 'Financia um mês de rádio missionária regional' },
  { amount: 'R$ 1.000',icon: Building, description: 'Patrocina o envio de um missionário por um mês' },
]

export default function DoacoesPage() {
  return (
    <>
      {/* Hero */}
      <div className="page-hero py-20 lg:py-28">
        <div className="page-hero-pattern" aria-hidden="true" />
        <div className="absolute -top-20 right-0 h-96 w-96 rounded-full bg-red-500/10 blur-3xl" aria-hidden="true" />
        <div className="container-site relative z-10 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-blue-200">Doe e transforme</p>
          <h1 className="font-display font-bold text-white text-5xl md:text-6xl">Faça sua Doação</h1>
          <p className="mt-5 text-lg text-blue-100 max-w-xl mx-auto">
            100% das doações vão diretamente para os projetos missionários. Transparência total, impacto real.
          </p>
        </div>
      </div>

      {/* Impact tiers */}
      <section className="section bg-white" aria-labelledby="impacto-heading">
        <div className="container-site">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-3">O que sua doação faz</p>
            <h2 id="impacto-heading" className="section-title">Cada real tem um destino</h2>
            <p className="section-subtitle mx-auto">
              Veja como diferentes valores se traduzem em impacto concreto no campo.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {impactTiers.map(({ amount, icon: Icon, description }) => (
              <div key={amount} className="card p-6 flex gap-4 items-start hover:border-blue-200 transition-colors duration-200">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xl font-display font-bold text-slate-900">{amount}</p>
                  <p className="text-sm text-slate-500 mt-1 leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PIX */}
      <section className="section bg-slate-50" id="pix" aria-labelledby="pix-heading">
        <div className="container-site max-w-4xl">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-3">Rápido e seguro</p>
            <h2 id="pix-heading" className="section-title">Doe via PIX</h2>
            <p className="section-subtitle mx-auto">A forma mais rápida de fazer sua doação chegar ao destino.</p>
          </div>

          <div className="card p-8 lg:p-10 flex flex-col md:flex-row gap-8 items-center">
            {/* QR code placeholder */}
            <div className="flex flex-col items-center gap-3 shrink-0">
              <div
                className="flex h-40 w-40 items-center justify-center rounded-2xl bg-slate-100 border-2 border-dashed border-slate-300"
                aria-label="QR Code PIX"
              >
                <QrCode className="h-16 w-16 text-slate-400" aria-hidden="true" />
              </div>
              <p className="text-xs text-slate-400">Escaneie para doar</p>
            </div>

            {/* Key details */}
            <div className="flex-1 space-y-4">
              <h3 className="font-display font-bold text-slate-900 text-xl">Chave PIX</h3>
              <div className="flex items-center gap-3">
                <code className="flex-1 rounded-xl bg-slate-100 px-4 py-3 text-sm font-mono text-slate-800 border border-slate-200">
                  {bankDetails.pix}
                </code>
                <CopyButton text={bankDetails.pix} label="Copiar chave PIX" />
              </div>
              <div className="space-y-2 text-sm text-slate-600">
                <p><span className="font-semibold text-slate-800">Beneficiário:</span> {bankDetails.name}</p>
                <p><span className="font-semibold text-slate-800">CNPJ:</span> {bankDetails.cnpj}</p>
              </div>
              <div className="flex items-start gap-2 rounded-xl bg-emerald-50 border border-emerald-100 px-4 py-3 text-xs text-emerald-700">
                <CheckCircle className="h-4 w-4 shrink-0 mt-0.5" aria-hidden="true" />
                Após o pagamento, envie o comprovante para {bankDetails.pix} para receber o recibo.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bank transfer */}
      <section className="section bg-white" id="transferencia" aria-labelledby="ted-heading">
        <div className="container-site max-w-4xl">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-3">Transferência</p>
            <h2 id="ted-heading" className="section-title">TED / DOC</h2>
          </div>
          <div className="card p-8 lg:p-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { label: 'Banco',     value: bankDetails.bank    },
                { label: 'Agência',   value: bankDetails.agency  },
                { label: 'Conta',     value: bankDetails.account },
                { label: 'CNPJ',      value: bankDetails.cnpj    },
                { label: 'Favorecido',value: bankDetails.name, wide: true },
              ].map(({ label, value, wide }) => (
                <div
                  key={label}
                  className={`flex items-center justify-between gap-4 rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 ${wide ? 'sm:col-span-2' : ''}`}
                >
                  <div>
                    <p className="text-xs text-slate-400 mb-0.5">{label}</p>
                    <p className="text-sm font-semibold text-slate-800 font-mono">{value}</p>
                  </div>
                  <CopyButton text={value} label={`Copiar ${label}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recurring donation */}
      <section
        id="recorrente"
        className="section bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 relative overflow-hidden"
        aria-labelledby="recorrente-heading"
      >
        <div className="absolute inset-0 bg-hero-pattern opacity-20 pointer-events-none" aria-hidden="true" />
        <div className="container-site relative z-10 text-center max-w-2xl mx-auto">
          <Heart className="mx-auto h-12 w-12 text-red-400 mb-6" aria-hidden="true" />
          <h2 id="recorrente-heading" className="section-title text-white mb-4">
            Torne-se um parceiro mensalista
          </h2>
          <p className="text-blue-100 leading-relaxed mb-8">
            Doações recorrentes permitem que a SEMADI planeje projetos de longo prazo
            e sustente missionários em campo com estabilidade. Com apenas R$ 30/mês
            você é um parceiro permanente da missão.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contato" className="btn btn-lg border-2 border-white/30 text-white hover:bg-white/10 focus-visible:outline-white">
              Quero ser mensalista
            </Link>
            <Link href="/contato" className="btn-accent btn-lg gap-2">
              <Heart className="h-5 w-5" aria-hidden="true" />
              Falar com nossa equipe
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
