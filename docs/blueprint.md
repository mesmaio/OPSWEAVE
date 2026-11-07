# OPSWEAVE

## Product Requirements & Experience Blueprint

### Event operations workspace, graph experience, ingestion journey and contextual intelligence

**Version 1.1 | 7 November 2026 | Authoritative working reference**

---

## Document Purpose and Authority

This is the product reference for OpsWeave. It consolidates the product decisions and user experience discussed to date. The companion _Technical Architecture & Engineering Execution Plan_ defines implementation technologies, repository boundaries, security, testing and agent execution.

- **DECIDED**: explicitly agreed.
- **RECOMMENDED**: current recommendation.
- **DEFERRED**: intentionally out of immediate scope.
- **OPEN**: future decision.

---

## 1. Product Vision

OpsWeave is an event operations management platform that turns fragmented event information into a connected, inspectable operational workspace. It helps organisers understand:

- What exists
- Who owns it
- Where information comes from
- How it relates to other work
- What is changing
- What requires attention

### 1.1 Core Product Principles

1. **One canonical event model** underpins the product.
2. **Information Flow and Event Flow** are distinct views over shared event entities and relationships.
3. An event can begin with only a central event node; structure grows progressively as users add information.
4. Google Sheets ingestion is a dedicated analysis and graph-proposal pipeline, not a simple file attachment.
5. Every meaningful graph element has contextual AI access through shared chat infrastructure.
6. AI-generated changes are proposals; deterministic validation and authorised human approval precede commits.
7. Live operations preserve planned baselines and append actual execution events.

---

## 2. Product Systems

| System               | Purpose                                                                                |
| -------------------- | -------------------------------------------------------------------------------------- |
| **Application**      | Public landing, authentication, signed-in home, event creation and onboarding.         |
| **Graph experience** | Information Flow and Event Flow canvas, nodes, edges, inspectors and layouts.          |
| **Ingestion Engine** | Connects and analyses spreadsheets, reconciles information and proposes graph changes. |
| **Contextual AI**    | Shared AI chat scoped to an event, element or relationship.                            |
| **Live Operations**  | GO mode, live monitoring, issues, activity and planned-versus-actual execution.        |

---

## 3. Application Journey and Routes

1. Public landing page (`/`).
2. Login or sign up (`/login`, `/signup`).
3. Signed-in home (`/app`), initially empty for a new user.
4. Create an event (`/app/new`).
5. Choose setup method (`/app/e/:eventId/setup`): import existing information, AI-assisted draft, or manual setup.
6. Connect/import sources (`/app/e/:eventId/import`).
7. Review generated structure (`/app/e/:eventId/review`).
8. Enter event workspace (`/app/e/:eventId`).
9. Use GO mode (`/app/e/:eventId/go`) when implemented.

### 3.1 First-Time Home Behaviour

- New workspaces show an honest empty state and a clear Create event action.
- No hypothetical events, fake invitations, fabricated users, seeded operational metrics or sample content in production UI.
- Only user-created or genuinely connected event data appears.
- Test fixtures may exist only in isolated test environments.

---

## 4. Two Graph Views, One Canonical Model

The graph is not a conventional top-down flowchart.

- **Information Flow**: multidirectional spatial map anchored by the central Event node. Sections (Registration, Sponsorship, Logistics, Marketing, Budget, Volunteers, Operations) branch outward.
- **Event Flow**: execution/dependency representation (milestones, sequence, dependencies).
- Both views reference the same canonical entities and share graph identity.

---

## 5. Dedicated Ingestion Engine & Progressive Reconciliation

1. **Sheet Profiler**: Inspects tabs, headers, types, anomalies.
2. **Domain Classifier**: Discovers operational areas without forcing ambiguous data.
3. **Schema Mapper**: Maps columns to canonical entities with confidence and fallback.
4. **Entity Resolver**: Reconciles against current approved graph state.
5. **Graph Architect**: Generates proposed changes.
6. **Deterministic Validation**: Strict graph and schema checks.
7. **Proposal & Approval**: Authorised human review (approve all, partial approve, reject).
8. **Transactional Commit**: Graph versioning and lineage tracking.

---

## 6. Contextual AI Copilot

Shared chat infrastructure with server-side context resolution:

```typescript
interface EntityChatContext {
  eventId: string;
  entityId: string;
  entityType: string;
  entityName: string;
  relationshipId?: string;
  graphView?: 'information' | 'event';
}
```

Client sends identifiers only; server resolves authorised neighbours and data.

---

## 7. Live Operations & GO Mode

- Baseline locking on GO mode activation.
- Append-only status events.
- Actual vs planned monitoring without overwriting historical execution records.
