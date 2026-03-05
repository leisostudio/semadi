'use client'

/**
 * RichTextEditor.tsx
 *
 * Wraps react-quill with dynamic import to avoid SSR errors.
 * The editor is only loaded on the client.
 *
 * Usage:
 *   <RichTextEditor value={html} onChange={setHtml} />
 */

import dynamic from 'next/dynamic'
import { useMemo } from 'react'

// Dynamically import react-quill (no SSR)
const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill')
    await import('react-quill/dist/quill.snow.css')
    return RQ
  },
  {
    ssr: false,
    loading: () => (
      <div className="skeleton h-48 w-full rounded-xl" aria-label="Carregando editor…" />
    ),
  }
)

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, false] }],
  ['bold', 'italic', 'underline', 'strike'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['blockquote', 'code-block'],
  ['link', 'image'],
  [{ align: [] }],
  ['clean'],
]

interface Props {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = 'Escreva o conteúdo do artigo aqui…',
  disabled = false,
}: Props) {
  const modules = useMemo(
    () => ({
      toolbar: TOOLBAR_OPTIONS,
      clipboard: { matchVisual: false },
    }),
    []
  )

  const formats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'blockquote', 'code-block',
    'link', 'image', 'align',
  ]

  return (
    <div className={`quill-wrapper ${disabled ? 'pointer-events-none opacity-60' : ''}`}>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        readOnly={disabled}
      />
      <style jsx global>{`
        .quill-wrapper .ql-container {
          font-family: var(--font-inter), system-ui, sans-serif;
          font-size: 0.9375rem;
          min-height: 240px;
          border-bottom-left-radius: 0.5rem;
          border-bottom-right-radius: 0.5rem;
          border-color: #e2e8f0;
        }
        .quill-wrapper .ql-toolbar {
          border-top-left-radius: 0.5rem;
          border-top-right-radius: 0.5rem;
          border-color: #e2e8f0;
          background: #f8fafc;
        }
        .quill-wrapper .ql-container:focus-within {
          outline: 2px solid #3b82f6;
          outline-offset: 0;
          border-color: #3b82f6;
        }
        .quill-wrapper .ql-editor {
          min-height: 240px;
          line-height: 1.75;
          color: #0f172a;
        }
        .quill-wrapper .ql-editor.ql-blank::before {
          color: #94a3b8;
          font-style: normal;
        }
      `}</style>
    </div>
  )
}
