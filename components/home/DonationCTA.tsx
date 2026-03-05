'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Heart, Banknote, Users, Globe } from 'lucide-react'

const tiers = [
  {
    amount: 'R$ 30',
    impact: 'Alimenta uma família por uma semana em missão',
    icon: Heart,
    highlight: false,
  },
  {
    amount: 'R$ 100',
    impact: 'Patrocina material didático para 10 crianças',
    icon: Users,
    highlight: true,
  },
  {
    amount: 'R$ 300',
    impact: 'Financia um mês de rádio missionária regional',
    icon: Globe,
    highlight: false,
  },
]

export default function DonationCTA() {
  return (
    <section
      className="section relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800"
      aria-labelledby="donation-cta-heading"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-hero-pattern opacity-20 pointer-events-none" aria-hidden="true" />
      <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-blue-900/40 blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="container-site relative z-10">
        {/* Heading */}
        <motion.div
          className="text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-blue-200">
            Faça a diferença
          </p>
          <h2
            id="donation-cta-heading"
            className="section-title text-white"
          >
            Sua doação transforma vidas reais
          </h2>
          <p className="section-subtitle text-blue-100 mx-auto">
            Cada real dado com fé e amor chega onde mais é necessário.
            Veja o impacto concreto de cada nível de doação.
          </p>
        </motion.div>

        {/* Tier cards */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3 max-w-4xl mx-auto">
          {tiers.map(({ amount, impact, icon: Icon, highlight }, i) => (
            <motion.div
              key={amount}
              className={`
                relative rounded-2xl p-6 text-center
                border transition-all duration-300
                ${highlight
                  ? 'bg-white border-white shadow-2xl scale-105'
                  : 'bg-white/10 border-white/20 hover:bg-white/15 backdrop-blur-sm'}
              `}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              {highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="badge-red text-[10px] px-3 py-1 shadow-sm">
                    Mais popular
                  </span>
                </div>
              )}
              <div
                className={`
                  mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl
                  ${highlight ? 'bg-red-50 text-red-600' : 'bg-white/10 text-white'}
                `}
              >
                <Icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <p
                className={`text-3xl font-display font-bold mb-2 ${
                  highlight ? 'text-slate-900' : 'text-white'
                }`}
              >
                {amount}
              </p>
              <p
                className={`text-sm leading-relaxed ${
                  highlight ? 'text-slate-500' : 'text-blue-100'
                }`}
              >
                {impact}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA buttons */}
        <motion.div
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link href="/doacoes" className="btn-accent btn-lg gap-2 shadow-accent">
            <Heart className="h-5 w-5" aria-hidden="true" />
            Quero Doar Agora
          </Link>
          <Link
            href="/doacoes#recorrente"
            className="btn btn-lg border-2 border-white/30 text-white hover:bg-white/10 focus-visible:outline-white gap-2"
          >
            <Banknote className="h-5 w-5" aria-hidden="true" />
            Doação Recorrente
          </Link>
        </motion.div>

        <p className="mt-6 text-center text-xs text-blue-200">
          100% das doações vão direto para os projetos. SEMADI é uma organização sem fins lucrativos.
        </p>
      </div>
    </section>
  )
}
