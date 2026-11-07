import { Event, EventCreateInput, GraphModel } from '@opsweave/contracts';

export interface EventRepository {
  findById(id: string): Promise<Event | null>;
  findByWorkspace(workspaceId: string): Promise<Event[]>;
  create(input: EventCreateInput & { workspaceId: string }): Promise<Event>;
  update(id: string, updates: Partial<Event>): Promise<Event>;
  delete(id: string): Promise<void>;
}

export interface GraphRepository {
  findByEventId(eventId: string): Promise<GraphModel | null>;
  saveGraph(graph: GraphModel): Promise<void>;
}

export interface DatabaseConfig {
  supabaseUrl: string;
  supabaseAnonKey: string;
  supabaseServiceRoleKey?: string;
}

export function validateDatabaseConfig(config: DatabaseConfig): boolean {
  if (!config.supabaseUrl || !config.supabaseAnonKey) {
    throw new Error('Supabase URL and Anon Key are required');
  }
  return true;
}

