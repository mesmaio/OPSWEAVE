import React from 'react';

export function App() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col items-center justify-center p-6">
      <header className="max-w-xl text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-400">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          OpsWeave Engine v0.1.0 • P0 Foundation
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-white">OpsWeave</h1>
        <p className="text-neutral-400 text-sm leading-relaxed">
          Contract-driven event operations management platform. Modular monorepo foundation
          established.
        </p>
      </header>
    </div>
  );
}

export default App;
