import { describe, it, expect } from 'vitest';
import { validateDatabaseConfig } from '../src/index.js';

describe('DB Package', () => {
  it('validates database config successfully', () => {
    const config = {
      supabaseUrl: 'https://test.supabase.co',
      supabaseAnonKey: 'anon-key-123',
    };
    expect(validateDatabaseConfig(config)).toBe(true);
  });

  it('throws error when database config is missing required keys', () => {
    const config = {
      supabaseUrl: '',
      supabaseAnonKey: '',
    };
    expect(() => validateDatabaseConfig(config)).toThrow();
  });
});
