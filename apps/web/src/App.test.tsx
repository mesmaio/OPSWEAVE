import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { App } from './App.js';

describe('App Component', () => {
  it('renders OpsWeave heading and foundation badge', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 1, name: /OpsWeave/i })).toBeInTheDocument();
    expect(screen.getByText(/P0 Foundation/i)).toBeInTheDocument();
  });
});

