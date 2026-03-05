import type { Metadata } from 'next'
import { Suspense } from 'react'
import HeroSection      from '@/components/home/HeroSection'
import MissionSection   from '@/components/home/MissionSection'
import FeaturedProjects from '@/components/home/FeaturedProjects'
import DonationCTA      from '@/components/home/DonationCTA'
import LatestBlog       from '@/components/home/LatestBlog'

export const metadata: Metadata = {
  title: 'SEMADI — Serviço Missionário',
  description:
    'A SEMADI leva esperança, fé e transformação para povos indígenas e comunidades em todo o mundo há mais de 40 anos.',
}

// Skeleton loaders for async sections
function ProjectsSkeleton() {
  return (
    <section className="section bg-slate-50" aria-hidden="true">
      <div className="container-site">
        <div className="skeleton h-8 w-64 mb-4" />
        <div className="skeleton h-4 w-80 mb-12" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-2xl overflow-hidden">
              <div className="skeleton aspect-video w-full" />
              <div className="p-6 space-y-3">
                <div className="skeleton h-5 w-3/4" />
                <div className="skeleton h-4 w-full" />
                <div className="skeleton h-4 w-5/6" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function BlogSkeleton() {
  return (
    <section className="section bg-white" aria-hidden="true">
      <div className="container-site">
        <div className="skeleton h-8 w-56 mb-4" />
        <div className="skeleton h-4 w-96 mb-12" />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="skeleton aspect-video w-full rounded-2xl" />
          </div>
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="skeleton flex-1 rounded-2xl min-h-[160px]" />
            <div className="skeleton flex-1 rounded-2xl min-h-[160px]" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <HeroSection />

      {/* ── Mission, Vision & Values ─────────────────────────────────────── */}
      <MissionSection />

      {/* ── Featured Projects (async, from Supabase) ─────────────────────── */}
      <Suspense fallback={<ProjectsSkeleton />}>
        <FeaturedProjects />
      </Suspense>

      {/* ── Donation CTA ─────────────────────────────────────────────────── */}
      <DonationCTA />

      {/* ── Latest Blog Posts (async, from Supabase) ─────────────────────── */}
      <Suspense fallback={<BlogSkeleton />}>
        <LatestBlog />
      </Suspense>
    </>
  )
}
