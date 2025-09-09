import { render, screen } from '@testing-library/react';
import EmptyPlacesList from './empty-places-list';
import { describe, expect, it } from 'vitest';
import { CITIES } from '../../const';

describe('Component: EmptyPlacesList', () => {
  it('should render "No places to stay available"', () => {
    render(<EmptyPlacesList city={CITIES[0]} />);

    const title = screen.getByText(/No places to stay available/i);
    const description = screen.getByText(/We could not find any property available/i);

    expect(title).toBeTruthy();
    expect(description).toBeTruthy();
  });

  it('should render with the correct container classes', () => {
    render(<EmptyPlacesList city={CITIES[0]} />);

    const container = screen.getByText(/No places to stay available/i).closest('div');

    expect(container?.className).toContain('cities__status-wrapper');
  });
});
