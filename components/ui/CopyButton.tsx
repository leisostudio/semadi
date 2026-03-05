'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

interface CopyButtonProps {
  text: string
  label?: string
}

export default function CopyButton({ text, label = 'Copiar' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API not available
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? 'Copiado!' : label}
      className={`
        flex h-9 w-9 shrink-0 items-center justify-center rounded-lg
        border transition-all duration-200
        ${copied
          ? 'border-emerald-200 bg-emerald-50 text-emerald-600'
          : 'border-slate-200 bg-white text-slate-500 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600'}
      `}
    >
      {copied
        ? <Check  className="h-4 w-4" aria-hidden="true" />
        : <Copy   className="h-4 w-4" aria-hidden="true" />
      }
    </button>
  )
}
