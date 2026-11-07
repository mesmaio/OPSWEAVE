import { z } from 'zod';

// ==========================================
// Event Contracts
// ==========================================

export const EventModeSchema = z.enum(['plan', 'go']);
export type EventMode = z.infer<typeof EventModeSchema>;

export const EventSchema = z.object({
  id: z.string().uuid(),
  workspaceId: z.string().uuid(),
  name: z.string().min(1, 'Event name is required'),
  description: z.string().optional(),
  startDate: z.string(),
  endDate: z.string(),
  venue: z.string().optional(),
  timezone: z.string().default('UTC'),
  mode: EventModeSchema.default('plan'),
  baselineLocked: z.boolean().default(false),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type Event = z.infer<typeof EventSchema>;

export const EventCreateSchema = z
  .object({
    name: z.string().min(1, 'Event name is required'),
    description: z.string().optional(),
    startDate: z.string().min(1, 'Start date is required'),
    endDate: z.string().min(1, 'End date is required'),
    venue: z.string().optional(),
    timezone: z.string().min(1, 'Timezone is required'),
  })
  .refine(
    (data) => {
      const start = new Date(data.startDate).getTime();
      const end = new Date(data.endDate).getTime();
      return !isNaN(start) && !isNaN(end) && start <= end;
    },
    {
      message: 'End date must be after or equal to start date',
      path: ['endDate'],
    },
  );
export type EventCreateInput = z.infer<typeof EventCreateSchema>;

// ==========================================
// Graph Model Contracts
// ==========================================

export const NodeKindSchema = z.enum([
  'event',
  'section',
  'task',
  'person',
  'location',
  'data_source',
  'milestone',
  'issue',
]);
export type NodeKind = z.infer<typeof NodeKindSchema>;

export const EdgeRelationshipSchema = z.enum([
  'contains',
  'owns',
  'depends_on',
  'precedes',
  'references',
  'supports',
]);
export type EdgeRelationship = z.infer<typeof EdgeRelationshipSchema>;

export const GraphViewScopeSchema = z.enum(['information', 'event', 'both']);
export type GraphViewScope = z.infer<typeof GraphViewScopeSchema>;

export const PositionSchema = z.object({
  x: z.number(),
  y: z.number(),
});
export type Position = z.infer<typeof PositionSchema>;

export const GraphNodeSchema = z.object({
  id: z.string(),
  entityId: z.string().uuid(),
  kind: NodeKindSchema,
  label: z.string().min(1),
  viewScope: GraphViewScopeSchema.default('both'),
  data: z.record(z.unknown()).default({}),
});
export type GraphNode = z.infer<typeof GraphNodeSchema>;

export const GraphEdgeSchema = z.object({
  id: z.string(),
  source: z.string(),
  target: z.string(),
  relationship: EdgeRelationshipSchema,
  viewScope: GraphViewScopeSchema.default('both'),
  data: z.record(z.unknown()).default({}),
});
export type GraphEdge = z.infer<typeof GraphEdgeSchema>;

export const GraphModelSchema = z.object({
  eventId: z.string().uuid(),
  version: z.number().int().nonnegative().default(1),
  nodes: z.array(GraphNodeSchema),
  edges: z.array(GraphEdgeSchema),
  positions: z.record(z.record(PositionSchema)).default({}), // viewType -> { nodeId: { x, y } }
});
export type GraphModel = z.infer<typeof GraphModelSchema>;

// ==========================================
// AI Context Contracts
// ==========================================

export const EntityChatContextSchema = z.object({
  eventId: z.string().uuid(),
  entityId: z.string(),
  entityType: z.string(),
  entityName: z.string(),
  relationshipId: z.string().optional(),
  graphView: z.enum(['information', 'event']).optional(),
});
export type EntityChatContext = z.infer<typeof EntityChatContextSchema>;

// ==========================================
// Ingestion / ChangeSet Contracts
// ==========================================

export const ChangeOperationSchema = z.enum([
  'create_node',
  'update_node',
  'create_edge',
  'update_edge',
  'delete_edge',
]);
export type ChangeOperation = z.infer<typeof ChangeOperationSchema>;

export const ChangeItemSchema = z.object({
  id: z.string().uuid(),
  operation: ChangeOperationSchema,
  targetType: z.enum(['node', 'edge']),
  payload: z.record(z.unknown()),
  confidence: z.number().min(0).max(1).optional(),
  rationale: z.string().optional(),
  approved: z.boolean().default(false),
  rejected: z.boolean().default(false),
});
export type ChangeItem = z.infer<typeof ChangeItemSchema>;

export const ChangeSetProposalSchema = z.object({
  id: z.string().uuid(),
  eventId: z.string().uuid(),
  sourceId: z.string().optional(),
  changes: z.array(ChangeItemSchema),
  createdAt: z.string(),
  status: z.enum(['pending_review', 'partially_approved', 'approved', 'rejected', 'committed']),
});
export type ChangeSetProposal = z.infer<typeof ChangeSetProposalSchema>;

// ==========================================
// API Response Wrapper
// ==========================================

export const ApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    data: dataSchema.optional(),
    error: z
      .object({
        code: z.string(),
        message: z.string(),
        details: z.unknown().optional(),
      })
      .optional(),
  });
