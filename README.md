# OpsWeave

Modular, scalable, contract-driven event operations platform.

## Architecture

```text
opsweave/
├── apps/
│   ├── web/          # React 19 + Vite frontend
│   └── api/          # Hono backend
├── packages/
│   ├── contracts/    # Shared Zod schemas & types
│   ├── graph-core/   # Canonical graph engine & layout interfaces
│   ├── ingestion/    # Spreadsheet profiling & reconciliation
│   ├── ai/           # Contextual AI & provider abstractions
│   └── db/           # Database access & repositories
├── supabase/         # Migrations, local config, pgTAP tests
└── docs/             # Product blueprint, architecture, ADRs, test reports
```

## Quick Start

```bash
# Install dependencies
pnpm install

# Run static checks and unit tests
pnpm check

# Start development servers
pnpm dev
```
