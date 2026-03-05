import type { Metadata, Viewport } from 'next'
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

// ─── Fonts ────────────────────────────────────────────────────────────────────

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plus-jakarta',
  weight: ['400', '500', '600', '700', '800'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains',
  weight: ['400', '500'],
})

// ─── Metadata ─────────────────────────────────────────────────────────────────

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://semadi.org.br'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: 'SEMADI — Serviço Missionário',
    template: '%s | SEMADI',
  },
  description:
    'SEMADI é um serviço missionário dedicado a levar esperança, fé e transformação para povos indígenas e comunidades em todo o mundo.',
  keywords: [
    'missões',
    'missionário',
    'semadi',
    'evangelização',
    'povos indígenas',
    'doação',
    'projetos sociais',
  ],
  authors: [{ name: 'SEMADI' }],
  creator: 'SEMADI',
  publisher: 'SEMADI',

  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: siteUrl,
    siteName: 'SEMADI',
    title: 'SEMADI — Serviço Missionário',
    description:
      'Levando esperança, fé e transformação para povos indígenas e comunidades em todo o mundo.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SEMADI — Serviço Missionário',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'SEMADI — Serviço Missionário',
    description: 'Levando esperança, fé e transformação ao mundo.',
    images: ['/og-image.png'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  alternates: {
    canonical: siteUrl,
  },

  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon-32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180' }],
  },

  manifest: '/manifest.json',
}

export const viewport: Viewport = {
  themeColor: '#007BFF',
  width: 'device-width',
  initialScale: 1,
}

// ─── Layout ───────────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${plusJakarta.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-svh flex-col antialiased">

        {/* Skip to main content – accessibility */}
        <a
          href="#main-content"
          className="
            sr-only focus:not-sr-only
            fixed left-4 top-4 z-[9999]
            bg-blue-600 text-white
            px-4 py-2 rounded-lg text-sm font-medium
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          "
        >
          Pular para o conteúdo principal
        </a>

        {/* ── Public navigation ──────────────────────────────────────────── */}
        <Navbar />

        {/* ── Page content ───────────────────────────────────────────────── */}
        <main
          id="main-content"
          className="flex-1 pt-[var(--navbar-height)]"
          tabIndex={-1}
        >
          {children}
        </main>

        {/* ── Footer ─────────────────────────────────────────────────────── */}
        <Footer />

      </body>
    </html>
  )
}
