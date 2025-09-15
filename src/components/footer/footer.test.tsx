import { render, screen } from '@testing-library/react';
import Footer from './footer';
import { describe, expect, it } from 'vitest';

describe('Component: Footer', () => {
  it('should render footer element', () => {
    render(<Footer />);

    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeTruthy();
  });

  it('should render logo image with correct alt text', () => {
    render(<Footer />);

    const logo = screen.getByAltText(/6 cities logo/i);
    expect(logo).toBeTruthy();
    expect((logo as HTMLImageElement).src).toContain('img/logo.svg');
  });

  it('should render link with correct href', () => {
    render(<Footer />);

    const link = screen.getByRole('link');
    expect(link).toBeTruthy();
    expect((link as HTMLAnchorElement).getAttribute('href')).toBe('main.html');
  });
});
