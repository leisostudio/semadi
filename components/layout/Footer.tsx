import Link from 'next/link'
import { Globe, Heart, Mail, Phone, MapPin, Facebook, Instagram, Youtube } from 'lucide-react'

const footerNav = {
  institucional: [
    { href: '/sobre',    label: 'Sobre Nós'     },
    { href: '/projetos', label: 'Nossos Projetos'},
    { href: '/galeria',  label: 'Galeria'        },
    { href: '/blog',     label: 'Blog & Notícias'},
  ],
  apoio: [
    { href: '/doacoes',          label: 'Como Doar'          },
    { href: '/doacoes#parceiros',label: 'Seja Parceiro'      },
    { href: '/contato',          label: 'Fale Conosco'       },
    { href: '/contato#voluntario',label: 'Seja Voluntário'   },
  ],
}

const socialLinks = [
  {
    href: 'https://facebook.com',
    label: 'Facebook da SEMADI',
    icon: Facebook,
  },
  {
    href: 'https://instagram.com',
    label: 'Instagram da SEMADI',
    icon: Instagram,
  },
  {
    href: 'https://youtube.com',
    label: 'Canal do YouTube da SEMADI',
    icon: Youtube,
  },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="bg-slate-900 text-slate-300"
      role="contentinfo"
      aria-label="Rodapé do site"
    >
      {/* ── Main footer content ───────────────────────────────────────────── */}
      <div className="container-site py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* ── Brand column ─────────────────────────────────────────────── */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 group mb-5"
              aria-label="SEMADI – Início"
            >
              <span className="
                flex h-10 w-10 items-center justify-center rounded-xl
                bg-gradient-to-br from-blue-500 to-blue-600
                group-hover:from-blue-400 group-hover:to-blue-500
                transition-all duration-300
              ">
                <Globe className="h-5 w-5 text-white" strokeWidth={2} aria-hidden="true" />
              </span>
              <span className="font-display font-bold text-xl text-white tracking-tight">
                SEMADI
              </span>
            </Link>

            <p className="text-sm leading-relaxed text-slate-400 max-w-xs">
              Serviço Missionário dedicado a levar esperança, fé e transformação
              para povos indígenas e comunidades em todo o mundo.
            </p>

            {/* Contact details */}
            <ul className="mt-6 space-y-3 text-sm" role="list">
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-blue-400 shrink-0" aria-hidden="true" />
                <a
                  href="mailto:contato@semadi.org.br"
                  className="text-slate-400 hover:text-white transition-colors duration-150"
                >
                  contato@semadi.org.br
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-blue-400 shrink-0" aria-hidden="true" />
                <a
                  href="tel:+551199999999"
                  className="text-slate-400 hover:text-white transition-colors duration-150"
                >
                  +55 (11) 9999-9999
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" aria-hidden="true" />
                <address className="not-italic text-slate-400">
                  São Paulo, SP — Brasil
                </address>
              </li>
            </ul>

            {/* Social links */}
            <div className="mt-6 flex items-center gap-3" role="list" aria-label="Redes sociais">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="
                    flex h-9 w-9 items-center justify-center rounded-lg
                    bg-slate-800 text-slate-400
                    hover:bg-blue-600 hover:text-white
                    transition-all duration-200
                  "
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* ── Institutional links ───────────────────────────────────────── */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-200 mb-4">
              Institucional
            </h3>
            <ul className="space-y-2.5" role="list">
              {footerNav.institucional.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-slate-400 hover:text-white transition-colors duration-150"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Support links ─────────────────────────────────────────────── */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-200 mb-4">
              Apoio
            </h3>
            <ul className="space-y-2.5" role="list">
              {footerNav.apoio.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-slate-400 hover:text-white transition-colors duration-150"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Donation CTA */}
            <div className="mt-8">
              <p className="text-xs text-slate-500 mb-3">
                Sua doação transforma vidas.
              </p>
              <Link href="/doacoes" className="btn-accent btn-sm gap-1.5">
                <Heart className="h-3.5 w-3.5" aria-hidden="true" />
                Doe Agora
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ────────────────────────────────────────────────────── */}
      <div className="border-t border-slate-800">
        <div className="container-site py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>
            © {year} SEMADI — Serviço Missionário. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacidade" className="hover:text-slate-300 transition-colors duration-150">
              Privacidade
            </Link>
            <Link href="/termos" className="hover:text-slate-300 transition-colors duration-150">
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
