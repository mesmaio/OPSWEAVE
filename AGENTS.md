# AGENTS.md — OpsWeave Engineering Mandate & Protocols

This document establishes non-negotiable rules for all AI agents (Antigravity, Claude Code, and subagents) contributing to OpsWeave.

## Core Directives

1. **Gated, Incremental Execution**: Work ONLY on the currently approved phase. Never start the next phase automatically.
2. **Contracts Before Implementation**: Define Zod schemas and TypeScript types in `@opsweave/contracts` before writing feature code.
3. **Strict TypeScript & Boundary Enforcement**:
   - `packages/contracts`: Pure Zod schemas and types. No DB, UI, or AI SDK imports.
   - `packages/graph-core`: Framework-independent graph algorithms and validators. No React, DOM, or DB imports.
   - `packages/ingestion`: Pure ingestion domain logic. No React or direct Supabase clients.
   - `packages/ai`: Model abstraction and prompts. No React or DB imports.
   - `packages/db`: Database repositories and Supabase types. No UI components.
   - `apps/web`: Frontend presentation. Never import service-role keys or backend secrets.
   - `apps/api`: Backend server. Owns auth, permissions, Inngest jobs, and AI context resolution.
4. **Server Authority**: Permissions, secrets, RLS policies, and contextual AI neighbour resolution are strictly server-side.
5. **AI Proposals vs Commits**: AI outputs are untrusted proposals. Deterministic code validates; human approves; transactional code commits.
6. **No Fabricated Production Data**: Do not seed fake operational metrics, hypothetical events, or mock users into production UI.
7. **Testing & Acceptance**: Every phase must pass its automated checks (build, lint, typecheck, unit, e2e) and end with `docs/testing/PX-acceptance-report.md` before stopping.
