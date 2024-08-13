import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App'; // Adjust the import path as necessary

describe('App Component', () => {
  it('renders correctly and matches snapshot', () => {
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  });
});
