
import { render, screen } from '@testing-library/react';
import FavoriteEmpty from './favorite-empty';
import { describe, expect, it } from 'vitest';

describe('Component: FavoriteEmpty', () => {
  it('should render "Nothing yet saved."', () => {
    render(<FavoriteEmpty />);

    const title = screen.getByText(/Nothing yet saved./i);
    expect(title).toBeTruthy();
  });

  it('should render description text', () => {
    render(<FavoriteEmpty />);

    const description = screen.getByText(
      /Save properties to narrow down search or plan your future trips./i
    );
    expect(description).toBeTruthy();
  });

  it('should render with correct container classes', () => {
    render(<FavoriteEmpty />);

    const main = screen.getByRole('main');
    expect(main.className).toContain('page__main--favorites-empty');
  });
});
