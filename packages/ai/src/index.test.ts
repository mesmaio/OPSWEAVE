import { describe, it, expect } from 'vitest';
import { formatCopilotSystemPrompt, ResolvedCopilotContext } from '../src/index.js';

describe('AI Package', () => {
  it('formats copilot system prompt with resolved context', () => {
    const resolved: ResolvedCopilotContext = {
      context: {
        eventId: '11111111-1111-4111-a111-111111111111',
        entityId: 'sec-reg',
        entityType: 'section',
        entityName: 'Registration',
        graphView: 'information',
      },
      entityDetails: { budgetAllocated: 5000 },
      permittedNeighbours: [
        {
          id: 'task-1',
          name: 'Badge Printing',
          type: 'task',
          relationship: 'contains',
        },
      ],
      relevantSources: [
        {
          sourceId: 'sheet-1',
          title: 'Registrations_v1.xlsx',
          snippet: '500 attendees registered',
        },
      ],
    };

    const prompt = formatCopilotSystemPrompt(resolved);
    expect(prompt).toContain('Event Scope: 11111111-1111-4111-a111-111111111111');
    expect(prompt).toContain('Registration (section)');
  });
});

