# OpsWeave Gated Implementation Plan

## Phase Overview

- **P0 — Repository Foundation** [CURRENT]
  - Monorepo tooling, packages, dependency boundaries, test harness, CI, AGENTS.md.
- **P1 — Public Frontend & Authentication Experience** [NOT STARTED]
  - Public landing, login/signup UI, empty workspace, event creation, setup selection.
- **P2 — Backend Foundation & Event Lifecycle** [NOT STARTED]
  - Hono API, Supabase local, RLS migrations, user auth, event persistence.
- **P3 — Graph Core & Visualisation** [NOT STARTED]
  - Information Flow (d3-force), Event Flow (ELK.js), canonical graph model, persistence.
- **P4 — Google Sheets Integration** [NOT STARTED]
  - Google OAuth, spreadsheet connector, raw staging, batch ingestion UI.
- **P5 — Ingestion Engine** [NOT STARTED]
  - Inngest orchestration, sheet profiler, classifier, mapper, entity resolver, change proposals.
- **P6 — Contextual AI Copilot** [NOT STARTED]
  - Server-resolved context, node/edge contextual chat, structured outputs, prompt security.
- **P7 — Live Operations & GO Mode** [NOT STARTED]
  - Baseline locking, append-only execution events, live activity and issue monitor.

## Governance & Approval Gates

Every phase must pass automated verification and explicit manual acceptance criteria before requesting human approval. Progression to subsequent phases occurs only upon explicit human instruction.
