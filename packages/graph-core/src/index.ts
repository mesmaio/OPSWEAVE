import {
  GraphModel,
  GraphNode,
  GraphEdge,
  Position,
  GraphViewScope,
  NodeKind,
  EdgeRelationship,
} from '@opsweave/contracts';

export interface LayoutEngine {
  readonly name: string;
  computeLayout(
    graph: GraphModel,
    view: 'information' | 'event',
  ): Promise<Record<string, Position>>;
}

export interface GraphValidationResult {
  valid: boolean;
  errors: string[];
}

/**
 * Validates graph edge consistency and ensures references exist.
 */
export function validateGraphStructure(graph: GraphModel): GraphValidationResult {
  const errors: string[] = [];
  const nodeIds = new Set(graph.nodes.map((n) => n.id));

  for (const edge of graph.edges) {
    if (!nodeIds.has(edge.source)) {
      errors.push(`Edge '${edge.id}' references non-existent source node '${edge.source}'`);
    }
    if (!nodeIds.has(edge.target)) {
      errors.push(`Edge '${edge.id}' references non-existent target node '${edge.target}'`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Filters nodes and edges visible in a specific view.
 */
export function getGraphForView(
  graph: GraphModel,
  view: 'information' | 'event',
): { nodes: GraphNode[]; edges: GraphEdge[] } {
  const visibleNodes = graph.nodes.filter((n) => n.viewScope === 'both' || n.viewScope === view);
  const visibleNodeIds = new Set(visibleNodes.map((n) => n.id));

  const visibleEdges = graph.edges.filter(
    (e) =>
      (e.viewScope === 'both' || e.viewScope === view) &&
      visibleNodeIds.has(e.source) &&
      visibleNodeIds.has(e.target),
  );

  return {
    nodes: visibleNodes,
    edges: visibleEdges,
  };
}

export type {
  GraphModel,
  GraphNode,
  GraphEdge,
  Position,
  GraphViewScope,
  NodeKind,
  EdgeRelationship,
};
