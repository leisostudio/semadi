'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Target, Eye, Heart } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'

const pillars = [
  {
    icon: Target,
    title: 'Nossa Missão',
    description:
      'Proclamar o evangelho e servir comunidades vulneráveis ao redor do mundo, com amor prático e comprometimento duradouro.',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: Eye,
    title: 'Nossa Visão',
    description:
      'Um mundo onde cada povo, tribo e nação tenha acesso à esperança transformadora — seja espiritual, social ou educacional.',
    color: 'bg-red-50 text-red-600',
  },
  {
    icon: Heart,
    title: 'Nossos Valores',
    description:
      'Integridade, compaixão, excelência e respeito cultural norteiam cada ação da SEMADI em campo e fora dele.',
    color: 'bg-emerald-50 text-emerald-600',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const itemVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

export default function MissionSection() {
  return (
    <section className="section bg-white" aria-labelledby="mission-heading">
      <div className="container-site">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20 items-center">

          {/* ── Left: Image stack ─────────────────────────────────────────── */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            {/* Main image */}
            <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden shadow-brand-xl">
              <Image
                src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=900&auto=format&fit=crop&q=60"
                alt="Missionários servindo uma comunidade indígena"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            {/* Floating accent card */}
            <div
              className="
                absolute -bottom-6 -right-6
                bg-white rounded-2xl shadow-card p-5
                border border-slate-100
                hidden sm:flex items-center gap-4
                max-w-[220px]
              "
              aria-hidden="true"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-500">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-display font-bold text-slate-900 leading-none">+5.000</p>
                <p className="text-xs text-slate-500 mt-0.5">vidas transformadas</p>
              </div>
            </div>
            {/* Decorative blob */}
            <div
              className="absolute -top-6 -left-6 -z-10 h-40 w-40 rounded-full bg-blue-100 blur-3xl opacity-60"
              aria-hidden="true"
            />
          </motion.div>

          {/* ── Right: Text content ───────────────────────────────────────── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div variants={itemVariants}>
              <SectionHeader
                eyebrow="Quem somos"
                title="Missão que transforma gerações"
                subtitle="Há mais de 40 anos, a SEMADI atua nas fronteiras geográficas e espirituais do mundo. Conheça os pilares que nos guiam."
                id="mission-heading"
              />
            </motion.div>

            {/* Pillars */}
            <div className="mt-10 space-y-5">
              {pillars.map(({ icon: Icon, title, description, color }) => (
                <motion.div
                  key={title}
                  variants={itemVariants}
                  className="flex gap-4 p-5 rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-card transition-all duration-300"
                >
                  <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${color}`}>
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-base font-display font-bold text-slate-900 mb-1">{title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div variants={itemVariants} className="mt-8">
              <Link href="/sobre" className="btn-outline gap-2">
                Conheça nossa história
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
