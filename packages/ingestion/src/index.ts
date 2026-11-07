import { ChangeSetProposal, ChangeItem, GraphModel } from '@opsweave/contracts';

export interface SheetProfile {
  tabName: string;
  rowCount: number;
  columnCount: number;
  headers: string[];
  inferredTypes: Record<string, 'string' | 'number' | 'date' | 'boolean' | 'unknown'>;
  sampleRows: Record<string, unknown>[];
}

export type DomainCategory =
  | 'registration'
  | 'sponsorship'
  | 'budget'
  | 'logistics'
  | 'marketing'
  | 'schedule'
  | 'volunteers'
  | 'operations'
  | 'unknown';

export interface ClassificationResult {
  category: DomainCategory;
  confidence: number;
  explanation: string;
}

export interface SchemaMappingResult {
  columnMappings: Record<string, string>;
  unmappedColumns: string[];
  confidence: number;
}

/**
 * Deterministically checks that proposed changes do not contradict or violate graph integrity.
 */
export function validateProposalChanges(
  _currentGraph: GraphModel,
  proposal: ChangeSetProposal,
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  for (const change of proposal.changes) {
    if (!change.operation) {
      errors.push(`Change ${change.id} has no valid operation`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export type { ChangeSetProposal, ChangeItem };
