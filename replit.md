# MEUPROCESSO

## Overview

MEUPROCESSO is a Brazilian lawtech platform that makes judicial proceedings understandable for everyday people. It translates complex legal jargon ("juridiquês") into plain language using AI-translated text alongside the original court documents.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend**: React + Vite + Tailwind CSS
- **Routing**: wouter
- **UI Components**: shadcn/ui (Radix primitives)
- **Icons**: lucide-react
- **Date formatting**: date-fns with ptBR locale

## Architecture

This is a **frontend-only** application with mock data. The Java Spring Boot backend (described in attached PDF) is external and not running in this workspace. Application data is initialized from `artifacts/meu-processo/src/lib/mockData.ts` and then managed through `artifacts/meu-processo/src/context/DataContext.tsx`, with localStorage persistence for demo CRUD operations.

## Demo Access

- **Administrador**: use the normal login form with email `admin@sistema.com` and password `admin123`
- **Advogado**: use the quick demo button "Perfil Advogado"
- **Cliente**: use the quick demo button "Perfil Cliente"

## Admin Capabilities

The administrator dashboard supports mocked CRUD-style workflows aligned with the attached Spring Boot backend scope:

- Cadastro/listagem/exclusão de usuários
- Cadastro de clientes and advogados with CPF, cargo, OAB, WhatsApp, email, and password fields
- Cadastro/listagem/exclusão de processos linked to a cliente and advogado
- Cadastro de movimentações for a process, with original court text and AI-translated plain language text
- Role-aware process visibility: admin sees all, lawyer sees assigned processes, client sees own processes

## Color Palette

- **Primaria** (#1C2E4A): Dark blue - navbars, headers, prominent text
- **Secundaria** (#D4AF37): Gold - primary buttons, icons, AI translation highlights
- **Fundo** (#FDF5E6): Beige/off-white - main page background
- **Borda** (#E0E0E0): Gray - card dividers, borders
- **Branco** (#FFFFFF): White - card and modal backgrounds

Custom Tailwind classes: `bg-primaria`, `bg-secundaria`, `bg-fundo`, `bg-borda`, `bg-branco` and their text/border variants.

## Pages

1. **Login** (`/`) - Mock authentication with admin credentials and demo buttons for Advogado/Cliente roles
2. **Dashboard** (`/dashboard`) - Role-aware dashboard; admin sees system overview, management forms, users, and all processes
3. **Process Details** (`/processo/:id`) - Core screen with timeline showing original legal text vs AI-translated plain language

## Key Files

- `artifacts/meu-processo/src/lib/mockData.ts` - Initial mock data and TypeScript types
- `artifacts/meu-processo/src/context/AuthContext.tsx` - Authentication context
- `artifacts/meu-processo/src/context/DataContext.tsx` - Demo CRUD data context with localStorage persistence
- `artifacts/meu-processo/src/pages/` - Page components
- `artifacts/meu-processo/src/components/` - Shared components (Navbar, ProtectedRoute)
- `artifacts/meu-processo/src/index.css` - Theme configuration with brand colors

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm --filter @workspace/meu-processo run dev` — run frontend locally
