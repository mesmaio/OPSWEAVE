# OPSWEAVE

## Technical Architecture & Engineering Execution Plan

**Version 1.1 | 7 November 2026 | Authoritative working reference**

---

## 1. Non-Negotiable Engineering Principles

1. Contracts before implementations.
2. Strict TypeScript throughout.
3. Modular architecture and clear dependency boundaries.
4. Business logic independent of presentation components.
5. Server-side authority for permissions, secrets, and AI context construction.
6. Database migrations must be version-controlled.
7. AI outputs are untrusted proposals, never authoritative mutations.
8. Deterministic validation before human approval.
9. All external operations must have appropriate error handling, retries, and idempotency.
10. Every phase must pass its acceptance criteria.
11. No automatic progression between phases.
12. Never introduce fabricated production data.

---

## 2. Approved Technology Stack

- **Monorepo**: pnpm workspaces + Turborepo
- **Runtime**: Node.js 22 LTS or newer compatible LTS
- **Frontend**: React 19, TypeScript, Vite, React Router 7, Tailwind CSS v4, Lucide React
- **Backend**: Hono, @hono/node-server, Zod
- **Database & Auth**: Supabase PostgreSQL, Supabase Auth, Storage, Realtime
- **Graph Visualization**: @xyflow/react, d3-force (main thread initially), ELK.js (Web Worker)
- **AI**: Vercel AI SDK (`ai`), `@ai-sdk/google` (Gemini), Zod schemas (backend only)
- **Background Workflows**: Inngest
- **Testing**: Vitest, React Testing Library, Playwright, pgTAP
- **Static Analysis**: TypeScript Strict Mode, ESLint 9, Prettier

---

## 3. Package Boundaries & Dependencies

| Package / App         | Allowed Dependencies                             | Prohibited Dependencies                           |
| --------------------- | ------------------------------------------------ | ------------------------------------------------- |
| `packages/contracts`  | `zod`                                            | UI, DB, Provider SDKs, Supabase                   |
| `packages/graph-core` | `contracts`, `d3-force` / `d3-random` as needed  | React, DOM, DB, Supabase                          |
| `packages/ingestion`  | `contracts`, `graph-core`, AI interfaces         | React, Supabase clients, Google SDK fetching      |
| `packages/ai`         | `contracts`, AI SDKs                             | React, Supabase client                            |
| `packages/db`         | `contracts`, Supabase client/types               | UI components                                     |
| `apps/api`            | `contracts`, `db`, Hono, Inngest                 | React, Vite                                       |
| `apps/web`            | `contracts`, React, Vite, Tailwind, React Router | Direct Supabase service-role, backend secret keys |

---

## 4. Layout Architecture

- **Information Flow**: d3-force on main thread (fixed ticks, asynchronous LayoutEngine interface).
- **Event Flow**: ELK.js through Web Worker (layered layout, dependencies).
- Unified `LayoutEngine` interface:

```typescript
export interface LayoutEngine {
  readonly name: string;
  computeLayout(
    graph: GraphModel,
    view: 'information' | 'event',
  ): Promise<Record<string, Position>>;
}
```

---

## 5. Security & AI Isolation

- Client passes identifiers only (`EntityChatContext`), never dictating graph neighbours.
- Server validates event and entity membership using tenant boundaries.
- Database access respects Row Level Security (RLS). Service-role keys never exposed to frontend.
- Untrusted spreadsheet input sanitized and isolated from system prompts.
