import { describe, it, expect } from 'vitest';
import { validateProposalChanges } from '../src/index.js';
import type { ChangeSetProposal, GraphModel } from '@opsweave/contracts';

describe('Ingestion Core', () => {
  const dummyGraph: GraphModel = {
    eventId: '11111111-1111-4111-a111-111111111111',
    version: 1,
    nodes: [],
    edges: [],
    positions: {},
  };

  it('validates proposal changes with correct structure', () => {
    const proposal: ChangeSetProposal = {
      id: '22222222-2222-4222-a222-222222222222',
      eventId: '11111111-1111-4111-a111-111111111111',
      changes: [
        {
          id: '33333333-3333-4333-a333-333333333333',
          operation: 'create_node',
          targetType: 'node',
          payload: { label: 'Sponsorship' },
          confidence: 0.95,
          approved: false,
          rejected: false,
        },
      ],
      createdAt: '2026-11-07T12:00:00Z',
      status: 'pending_review',
    };

    const res = validateProposalChanges(dummyGraph, proposal);
    expect(res.valid).toBe(true);
    expect(res.errors).toHaveLength(0);
  });
});
