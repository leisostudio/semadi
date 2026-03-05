# SEMADI — Serviço Missionário

Site institucional e painel administrativo completo construído com **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS** e **Supabase**.

---

## 🚀 Stack

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 14+ (App Router) |
| Linguagem | TypeScript |
| Estilização | Tailwind CSS |
| Ícones | Lucide React |
| Animações | Framer Motion |
| Backend / Auth / DB | Supabase (PostgreSQL) |
| Editor Rich Text | React Quill |

---

## 📁 Estrutura de rotas

```
app/
├── page.tsx                    → Home
├── sobre/page.tsx              → Sobre nós
├── projetos/page.tsx           → Projetos missionários
├── blog/
│   ├── page.tsx                → Listagem do blog
│   └── [slug]/page.tsx         → Post individual
├── contato/page.tsx            → Formulário de contato
├── doacoes/page.tsx            → Doações (PIX + TED)
├── galeria/page.tsx            → Galeria de imagens
└── admin/
    ├── login/page.tsx          → Login (Supabase Auth)
    ├── dashboard/page.tsx      → Dashboard com estatísticas
    ├── projetos/
    │   ├── page.tsx            → CRUD listagem
    │   ├── novo/page.tsx       → Criar projeto
    │   └── [id]/editar/page.tsx→ Editar projeto
    ├── blog/
    │   ├── page.tsx            → CRUD listagem
    │   ├── novo/page.tsx       → Criar post (editor rich text)
    │   └── [id]/editar/page.tsx→ Editar post
    └── mensagens/page.tsx      → Mensagens de contato
```

---

## ⚙️ Setup

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

Copie o arquivo de exemplo e preencha com suas credenciais Supabase:

```bash
cp .env.local.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=https://SEU_PROJETO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_anon_key
SUPABASE_SERVICE_ROLE_KEY=sua_service_role_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Criar o schema no Supabase

Acesse o **SQL Editor** no dashboard do Supabase e execute o conteúdo de:

```
supabase/schema.sql
```

Isso cria as tabelas `projects`, `blog_posts`, `contact_messages` e `gallery` com Row Level Security configurado.

### 4. Criar usuário administrador

No Supabase → **Authentication → Users → Invite user**, crie um usuário com e-mail e senha para acessar o painel `/admin`.

### 5. Rodar em desenvolvimento

```bash
npm run dev
```

Acesse `http://localhost:3000`

---

## 🔐 Segurança

- O middleware (`middleware.ts`) protege todas as rotas `/admin/*` verificando a sessão do Supabase.
- Row Level Security (RLS) no banco de dados garante que apenas usuários autenticados possam escrever dados.
- A chave `SUPABASE_SERVICE_ROLE_KEY` **nunca é exposta ao browser**.

---

## 🏗️ Build para produção

```bash
npm run build
npm run start
```

---

## 📦 Dependências principais

```json
"@supabase/ssr": "^0.5.1",
"@supabase/supabase-js": "^2.45.4",
"framer-motion": "^11.x",
"lucide-react": "^0.469.0",
"react-quill": "^2.0.0",
"@tailwindcss/typography": "^0.5.x"
```
# semadi
