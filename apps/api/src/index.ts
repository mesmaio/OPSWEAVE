import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { healthRoute } from './routes/health.js';
import { env } from './lib/env.js';

export const app = new Hono();

app.route('/', healthRoute);

if (process.env.NODE_ENV !== 'test') {
  serve(
    {
      fetch: app.fetch,
      port: env.PORT,
    },
    (info) => {
      console.log(`OpsWeave API server listening on http://localhost:${info.port}`);
    },
  );
}

export default app;

