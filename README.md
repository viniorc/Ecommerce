# Liahna Joias e Acessorios

E-commerce boutique clean e acolhedor com area admin para gerenciar produtos e imagens.

## Stack
- Next.js (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- Prisma + SQLite (dev)
- NextAuth (Credentials)
- pnpm

## Como rodar
1. `pnpm install`
2. `pnpm prisma migrate dev`
3. `pnpm db:seed`
4. `pnpm dev`

## Estrutura de pastas
- `src/app` rotas e layouts
- `src/components` UI e componentes base
- `src/data` catalogo local (fallback)
- `src/lib` helpers, Prisma, auth
- `src/store` Zustand (carrinho)
- `src/theme` tokens e BrandKit
- `public/brand` assets da marca
- `public/products` placeholders
- `public/uploads` uploads locais (nao versionado)
- `prisma` schema, migrations e seed

## Variaveis de ambiente
Crie um arquivo `.env` baseado em `.env.example`.

## Nota
Uploads locais nao sao versionados. Em producao, usar S3/Cloudinary.
