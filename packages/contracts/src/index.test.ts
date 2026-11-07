import { describe, it, expect } from 'vitest';
import { EventCreateSchema, EntityChatContextSchema, GraphNodeSchema } from '../src/index.js';

describe('Contracts', () => {
  it('validates correct event creation input', () => {
    const valid = {
      name: 'Hackathon 2026',
      description: 'Annual flagship event',
      startDate: '2026-12-01T09:00:00Z',
      endDate: '2026-12-02T18:00:00Z',
      timezone: 'Asia/Kolkata',
    };
    expect(() => EventCreateSchema.parse(valid)).not.toThrow();
  });

  it('rejects event creation when end date precedes start date', () => {
    const invalid = {
      name: 'Hackathon 2026',
      startDate: '2026-12-02T09:00:00Z',
      endDate: '2026-12-01T18:00:00Z',
      timezone: 'Asia/Kolkata',
    };
    expect(() => EventCreateSchema.parse(invalid)).toThrow();
  });

  it('validates entity chat context schema', () => {
    const context = {
      eventId: '11111111-1111-4111-a111-111111111111',
      entityId: 'section-registration',
      entityType: 'section',
      entityName: 'Registration & Ticketing',
      graphView: 'information' as const,
    };
    expect(EntityChatContextSchema.parse(context)).toEqual(context);
  });

  it('validates graph node schema', () => {
    const node = {
      id: 'node-1',
      entityId: '22222222-2222-4222-a222-222222222222',
      kind: 'section' as const,
      label: 'Logistics',
      viewScope: 'both' as const,
      data: {},
    };
    expect(GraphNodeSchema.parse(node)).toEqual(node);
  });
});
