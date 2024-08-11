import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import App from '../App';

describe('App Component', () => {
  test('renders the App component', () => {
    render(<App />);
    const title = window.document.title;
    expect(title).toBe('Point Game');
  });
});