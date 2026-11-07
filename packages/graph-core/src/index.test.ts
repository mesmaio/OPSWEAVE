import { describe, it, expect } from 'vitest';
import { validateGraphStructure, getGraphForView } from '../src/index.js';
import type { GraphModel } from '@opsweave/contracts';

describe('Graph Core', () => {
  const sampleGraph: GraphModel = {
    eventId: '11111111-1111-4111-a111-111111111111',
    version: 1,
    nodes: [
      {
        id: 'event-1',
        entityId: '11111111-1111-4111-a111-111111111111',
        kind: 'event',
        label: 'Summit 2026',
        viewScope: 'both',
        data: {},
      },
      {
        id: 'section-1',
        entityId: '22222222-2222-4222-a222-222222222222',
        kind: 'section',
        label: 'Logistics',
        viewScope: 'information',
        data: {},
      },
    ],
    edges: [
      {
        id: 'e-1',
        source: 'event-1',
        target: 'section-1',
        relationship: 'contains',
        viewScope: 'information',
        data: {},
      },
    ],
    positions: {},
  };

  it('validates a structurally consistent graph', () => {
    const result = validateGraphStructure(sampleGraph);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('detects dangling edge references', () => {
    const brokenGraph: GraphModel = {
      ...sampleGraph,
      edges: [
        {
          id: 'e-broken',
          source: 'event-1',
          target: 'non-existent-node',
          relationship: 'contains',
          viewScope: 'both',
          data: {},
        },
      ],
    };
    const result = validateGraphStructure(brokenGraph);
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toContain('non-existent target node');
  });

  it('filters graph elements by view scope', () => {
    const infoView = getGraphForView(sampleGraph, 'information');
    expect(infoView.nodes).toHaveLength(2);
    expect(infoView.edges).toHaveLength(1);

    const eventView = getGraphForView(sampleGraph, 'event');
    // section-1 is only information scope, so it should not appear in event view
    expect(eventView.nodes).toHaveLength(1);
    expect(eventView.edges).toHaveLength(0);
  });
});
