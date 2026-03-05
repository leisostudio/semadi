# 🚀 Guia de Deploy — SEMADI na Vercel

Este guia cobre **todas as formas** de fazer o deploy do projeto SEMADI na Vercel,
do mais simples (arrastar e soltar) ao mais profissional (CI/CD automático via GitHub).

---

## 📋 Pré-requisitos

Antes de qualquer deploy, você precisa ter o **Supabase configurado**:

1. Acesse [supabase.com](https://supabase.com) e crie um projeto gratuito
2. Vá em **SQL Editor** e execute o conteúdo do arquivo `supabase/schema.sql`
3. Vá em **Authentication → Users** e crie um usuário administrador
4. Anote as três chaves em **Settings → API**:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` → `SUPABASE_SERVICE_ROLE_KEY`

---

## 🟢 Opção 1 — Deploy pelo site da Vercel (mais fácil)

### Passo 1 — Suba o código no GitHub

```bash
# Na pasta do projeto
git init
git add .
git commit -m "feat: projeto SEMADI inicial"

# Crie um repositório em github.com e conecte
git remote add origin https://github.com/SEU_USUARIO/semadi.git
git push -u origin main
```

### Passo 2 — Importe na Vercel

1. Acesse [vercel.com/new](https://vercel.com/new)
2. Clique em **"Import Git Repository"**
3. Selecione o repositório `semadi`
4. A Vercel detectará automaticamente que é **Next.js** ✅

### Passo 3 — Configure as variáveis de ambiente

Na tela de configuração, adicione todas as variáveis antes de clicar em Deploy:

| Variável | Valor | Ambiente |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxx.supabase.co` | All |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJ...` | All |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJ...` | Production, Preview |
| `NEXT_PUBLIC_SITE_URL` | `https://semadi.vercel.app` | Production |

### Passo 4 — Deploy! 🎉

Clique em **"Deploy"**. Em ~2 minutos seu site estará no ar.

---

## 🔵 Opção 2 — Deploy via Vercel CLI (terminal)

```bash
# 1. Instale a CLI da Vercel
npm install -g vercel

# 2. Faça login
vercel login

# 3. Na pasta do projeto, execute
vercel

# Responda as perguntas:
#   Set up and deploy? → Y
#   Which scope? → sua conta
#   Link to existing project? → N
#   Project name? → semadi
#   In which directory is your code? → ./
#   Override settings? → N

# 4. Adicione as variáveis de ambiente
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
vercel env add SUPABASE_SERVICE_ROLE_KEY production
vercel env add NEXT_PUBLIC_SITE_URL production

# 5. Faça o deploy de produção
vercel --prod
```

---

## ⚙️ Opção 3 — CI/CD automático com GitHub Actions

O arquivo `.github/workflows/deploy.yml` já está pronto. Basta configurar os secrets:

### Passo 1 — Obtenha as credenciais da Vercel

```bash
# No terminal, na pasta do projeto (após `vercel login`)
vercel link

# Isso cria o arquivo .vercel/project.json com:
# {
#   "orgId": "team_...",
#   "projectId": "prj_..."
# }
```

Gere um token em: **Vercel Dashboard → Account Settings → Tokens → Create**

### Passo 2 — Adicione os secrets no GitHub

Vá em **GitHub → Seu Repositório → Settings → Secrets and variables → Actions**:

| Secret | Onde obter |
|---|---|
| `VERCEL_TOKEN` | Vercel → Account Settings → Tokens |
| `VERCEL_ORG_ID` | `.vercel/project.json` → campo `orgId` |
| `VERCEL_PROJECT_ID` | `.vercel/project.json` → campo `projectId` |

### Passo 3 — Funcionamento automático

A partir de agora:
- **Push em `main`** → deploy automático em **produção** 🟢
- **Push em `develop`** → deploy em **preview** 🔵
- **Pull Request** → deploy de preview + comentário automático com a URL 💬

---

## 🌐 Configurar domínio customizado (semadi.org.br)

1. Acesse o **Vercel Dashboard → seu projeto → Settings → Domains**
2. Clique em **"Add"** e digite `semadi.org.br`
3. A Vercel mostrará os registros DNS para configurar:

```
# No seu registrador de domínio (ex: Registro.br, GoDaddy, Namecheap)

# Tipo A (para o domínio raiz)
Nome: @
Valor: 76.76.21.21

# Tipo CNAME (para www)
Nome: www
Valor: cname.vercel-dns.com
```

4. Aguarde a propagação DNS (até 48h, geralmente menos de 1h)
5. A Vercel emite o certificado SSL automaticamente ✅

Após configurar o domínio, atualize a variável no dashboard:
```
NEXT_PUBLIC_SITE_URL = https://semadi.org.br
```

---

## 🔒 Configuração de segurança do Supabase para produção

No Supabase Dashboard, configure as **URL permitidas**:

1. **Authentication → URL Configuration**:
   - Site URL: `https://semadi.vercel.app` (ou seu domínio)
   - Redirect URLs: `https://semadi.vercel.app/**`

2. **Authentication → Email Templates** — personalize os e-mails de login

---

## 📊 Monitoramento pós-deploy

| O que verificar | Onde |
|---|---|
| Logs de funções | Vercel Dashboard → Functions |
| Erros em tempo real | Vercel Dashboard → Observability |
| Performance | Vercel Dashboard → Analytics |
| Banco de dados | Supabase Dashboard → Table Editor |

---

## 🐛 Problemas comuns

### ❌ Build falha: "Cannot find module '@/...'"
Verifique se o `tsconfig.json` tem `"paths": { "@/*": ["./*"] }` ✅ (já configurado)

### ❌ "Error: Missing environment variable"
Certifique-se de que **todas** as variáveis listadas acima estão no Vercel Dashboard.
As variáveis do `.env.local` **não** são enviadas para a Vercel.

### ❌ Admin redireciona para login em loop
- Confirme que `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` estão corretos
- Verifique se o usuário foi criado em **Supabase → Authentication → Users**

### ❌ Imagens do Supabase Storage não carregam
Adicione o domínio do seu bucket ao `next.config.js`:
```js
// já configurado em next.config.js:
{ hostname: '*.supabase.co', pathname: '/storage/v1/object/public/**' }
```

---

## ✅ Checklist de deploy

- [ ] Schema SQL executado no Supabase
- [ ] Usuário admin criado no Supabase Auth
- [ ] Variáveis de ambiente configuradas na Vercel
- [ ] Build local funcionando (`npm run build`)
- [ ] Deploy realizado com sucesso
- [ ] Domínio customizado configurado (opcional)
- [ ] URL atualizada em `NEXT_PUBLIC_SITE_URL`
- [ ] URL atualizada em Supabase → Auth → URL Configuration
- [ ] Testado: home, blog, contato, galeria, /admin/login
