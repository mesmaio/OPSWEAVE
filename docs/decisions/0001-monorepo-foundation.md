# ADR 0001: Monorepo Foundation & Workspace Boundaries

## Status

Accepted

## Context

OpsWeave requires a clean separation of concerns across presentation, server logic, canonical graph representation, spreadsheet ingestion domain, database repositories, and AI abstractions.

## Decision

1. Use **pnpm workspaces** and **Turborepo** for monorepo orchestration.
2. Formulate 5 shared packages:
   - `@opsweave/contracts`: pure schemas and types (Zod).
   - `@opsweave/graph-core`: framework-independent graph logic.
   - `@opsweave/ingestion`: domain logic for profiling, classification, mapping, and reconciliation.
   - `@opsweave/ai`: AI provider abstractions and prompt management.
   - `@opsweave/db`: database repository interfaces and Supabase abstraction.
3. Formulate 2 application shells:
   - `apps/web`: React 19 + Vite frontend.
   - `apps/api`: Hono backend.
4. Enforce strict dependency boundaries: no package may depend on `apps/web` or leak backend credentials to the browser.
