import type { Metadata } from 'next'
import Image from 'next/image'
import { createSupabaseServer } from '@/lib/supabase'
import type { GalleryItem } from '@/types/supabase'
import SectionHeader from '@/components/ui/SectionHeader'

export const metadata: Metadata = {
  title: 'Galeria',
  description:
    'Imagens dos projetos, comunidades e missionários da SEMADI ao redor do mundo.',
}

async function getGallery(): Promise<GalleryItem[]> {
  try {
    const supabase = createSupabaseServer()
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data ?? []
  } catch (err) {
    console.error('[GaleriaPage] fetch error:', err)
    return []
  }
}

const FALLBACK: GalleryItem[] = [
  { id: '1',  image_url: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&auto=format&fit=crop&q=60', caption: 'Rio Amazonas ao pôr do sol',           created_at: new Date().toISOString() },
  { id: '2',  image_url: 'https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=800&auto=format&fit=crop&q=60', caption: 'Crianças no Quênia',                  created_at: new Date().toISOString() },
  { id: '3',  image_url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&auto=format&fit=crop&q=60', caption: 'Equipe de missionários reunida',      created_at: new Date().toISOString() },
  { id: '4',  image_url: 'https://images.unsplash.com/photo-1469571486292-b53601010b89?w=800&auto=format&fit=crop&q=60', caption: 'Distribuição de alimentos na Síria', created_at: new Date().toISOString() },
  { id: '5',  image_url: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&auto=format&fit=crop&q=60', caption: 'Bíblias recém-traduzidas',            created_at: new Date().toISOString() },
  { id: '6',  image_url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=60', caption: 'Escola do projeto Sertão',            created_at: new Date().toISOString() },
  { id: '7',  image_url: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&auto=format&fit=crop&q=60', caption: 'Estepe da Ásia Central',              created_at: new Date().toISOString() },
  { id: '8',  image_url: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=800&auto=format&fit=crop&q=60', caption: 'Floresta tropical na Amazônia',       created_at: new Date().toISOString() },
  { id: '9',  image_url: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&auto=format&fit=crop&q=60', caption: 'Atendimento médico no Quênia',        created_at: new Date().toISOString() },
  { id: '10', image_url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&auto=format&fit=crop&q=60', caption: 'Base missionária no Acre',          created_at: new Date().toISOString() },
  { id: '11', image_url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format&fit=crop&q=60', caption: 'Comunidade no Quênia',               created_at: new Date().toISOString() },
  { id: '12', image_url: 'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=800&auto=format&fit=crop&q=60', caption: 'Praia em Papua-Nova Guiné',          created_at: new Date().toISOString() },
]

export default async function GaleriaPage() {
  const items = await getGallery()
  const display = items.length > 0 ? items : FALLBACK

  return (
    <>
      {/* Hero */}
      <div className="page-hero py-20 lg:py-28">
        <div className="page-hero-pattern" aria-hidden="true" />
        <div className="container-site relative z-10 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-blue-200">Imagens</p>
          <h1 className="font-display font-bold text-white text-5xl md:text-6xl">Galeria</h1>
          <p className="mt-5 text-lg text-blue-100 max-w-xl mx-auto">
            Momentos capturados nos campos missionários ao redor do mundo.
          </p>
        </div>
      </div>

      <section className="section bg-white" aria-labelledby="galeria-heading">
        <div className="container-site">
          <SectionHeader
            eyebrow="Registro visual"
            title="Imagens do campo"
            subtitle={`${display.length} fotos dos nossos projetos e missões.`}
            className="mb-10"
            id="galeria-heading"
          />

          {/* Masonry-style grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {display.map((item, idx) => (
              <figure
                key={item.id}
                className="
                  break-inside-avoid overflow-hidden rounded-2xl
                  bg-slate-100 group relative
                  shadow-card hover:shadow-card-hover
                  transition-shadow duration-300
                "
              >
                <div className="relative w-full">
                  <Image
                    src={item.image_url}
                    alt={item.caption ?? `Foto de missão ${idx + 1}`}
                    width={600}
                    height={400}
                    className="
                      w-full h-auto object-cover
                      transition-transform duration-500
                      group-hover:scale-105
                    "
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  {/* Caption overlay */}
                  {item.caption && (
                    <figcaption
                      className="
                        absolute bottom-0 inset-x-0
                        bg-gradient-to-t from-slate-900/80 to-transparent
                        px-4 py-4 pt-10
                        text-white text-xs font-medium
                        translate-y-full group-hover:translate-y-0
                        transition-transform duration-300
                      "
                    >
                      {item.caption}
                    </figcaption>
                  )}
                </div>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
