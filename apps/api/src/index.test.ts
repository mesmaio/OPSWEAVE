import { describe, it, expect } from 'vitest';
import { app } from '../src/index.js';

describe('API Health', () => {
  it('GET /health returns 200 and status ok', async () => {
    const res = await app.request('/health');
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.status).toBe('ok');
    expect(body.service).toBe('opsweave-api');
    expect(body.timestamp).toBeDefined();
  });
});

