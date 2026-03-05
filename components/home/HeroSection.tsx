'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Heart, ArrowRight, Globe, Users, BookOpen } from 'lucide-react'

const stats = [
  { icon: Globe,    value: '24+',  label: 'Países alcançados'  },
  { icon: Users,    value: '150+', label: 'Comunidades servidas'},
  { icon: BookOpen, value: '40+',  label: 'Anos de missão'      },
]

export default function HeroSection() {
  return (
    <section
      className="relative min-h-[92vh] flex items-center overflow-hidden bg-gradient-to-br from-blue-800 via-blue-700 to-blue-900"
      aria-label="Hero – SEMADI Serviço Missionário"
    >
      {/* ── Background pattern ──────────────────────────────────────────── */}
      <div className="absolute inset-0 bg-hero-pattern opacity-20 pointer-events-none" aria-hidden="true" />

      {/* ── Background image with overlay ───────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <Image
          src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1600&auto=format&fit=crop&q=60"
          alt=""
          fill
          priority
          className="object-cover opacity-20 mix-blend-luminosity"
          sizes="100vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-800/60 to-transparent" />
      </div>

      {/* ── Content ─────────────────────────────────────────────────────── */}
      <div className="container-site relative z-10 py-28 lg:py-40">
        <div className="max-w-3xl">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-100 backdrop-blur-sm mb-6">
              <Globe className="h-3.5 w-3.5" aria-hidden="true" />
              Serviço Missionário Global
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            className="font-display font-bold text-white text-balance leading-[1.1] text-5xl md:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Levando{' '}
            <span className="relative inline-block">
              <span className="relative z-10 text-blue-200">Esperança</span>
              <motion.span
                className="absolute -bottom-1 left-0 h-1 w-full rounded-full bg-red-500 opacity-80"
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                aria-hidden="true"
              />
            </span>
            {' '}ao Mundo
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="mt-6 text-lg md:text-xl text-blue-100 leading-relaxed max-w-xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            A SEMADI serve povos indígenas, comunidades rurais e nações ao redor
            do globo — através de missões, educação e projetos de transformação social.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="mt-10 flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Link href="/doacoes" className="btn-accent btn-lg gap-2 shadow-accent">
              <Heart className="h-5 w-5" aria-hidden="true" />
              Faça uma Doação
            </Link>
            <Link
              href="/projetos"
              className="btn btn-lg border-2 border-white/30 text-white backdrop-blur-sm hover:bg-white/10 focus-visible:outline-white"
            >
              Nossos Projetos
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="mt-16 flex flex-wrap gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            role="list"
            aria-label="Números da SEMADI"
          >
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-3" role="listitem">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm">
                  <Icon className="h-5 w-5 text-blue-200" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-2xl font-display font-bold text-white leading-none">{value}</p>
                  <p className="text-xs text-blue-200 mt-0.5">{label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Scroll indicator ────────────────────────────────────────────── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        aria-hidden="true"
      >
        <span className="text-[10px] uppercase tracking-widest text-blue-200 font-medium">Scroll</span>
        <motion.div
          className="h-8 w-5 rounded-full border-2 border-white/30 flex items-start justify-center pt-1.5"
          animate={{ y: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <div className="h-1.5 w-1.5 rounded-full bg-white/60" />
        </motion.div>
      </motion.div>
    </section>
  )
}
