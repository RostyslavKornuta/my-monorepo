import { render, screen } from '@testing-library/react';
import Image from './index';
import '@testing-library/jest-dom';

describe('Image component', () => {
  it('Renders with default width and height', () => {
    render(<Image path="/test.png" />);
    const img = screen.getByRole('img') as HTMLImageElement;

    expect(img).toBeInTheDocument();
    expect(img.src).toContain('/test.png');
    expect(img).toHaveStyle('width: 100%');
    expect(img).toHaveStyle('height: 100%');
  });

  it('Applies custom width and height', () => {
    render(<Image path="/test.png" width="200px" height="300px" />);
    const img = screen.getByRole('img');

    expect(img).toHaveStyle('width: 200px');
    expect(img).toHaveStyle('height: 300px');
  });

  it('Has objectFit and borderRadius style', () => {
    render(<Image path="/test.png" />);
    const img = screen.getByRole('img');

    expect(img).toHaveStyle('object-fit: cover');
    expect(img).toHaveStyle('border-radius: inherit');
  });
});
