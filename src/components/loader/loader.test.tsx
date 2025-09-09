import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Loader from './loader';

describe('Loader component', () => {
  it('Should return loader component', () => {
    render(<Loader />);
    const loaderElement = screen.getByRole('status');
    expect(loaderElement).toBeInTheDocument();
  });

  it('Should return loader with class "lds-roller"', () => {
    render(<Loader />);
    const loaderElement = screen.getByRole('status');
    expect(loaderElement).toHaveClass('lds-roller');
  });

  it('Should return div with class "spinner"', () => {
    render(<Loader />);
    const spinner = screen.getByTestId('spinner');
    expect(spinner).toHaveClass('spinner');
  });
});
