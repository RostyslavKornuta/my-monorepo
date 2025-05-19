import { render, screen } from '@testing-library/react';
import Header, { NavItem } from './index';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

describe('Header component', () => {
  const navigationItems = [
    { title: 'Home', to: '/' },
    { title: 'About', to: '/about' },
  ];
  const logoPath = '/logo.png';

  it('Renders logo and nav items', () => {
    render(
      <MemoryRouter>
        <Header navigationItems={navigationItems} logo={logoPath} />
      </MemoryRouter>
    );

    const logo = screen.getByAltText('logo') as HTMLImageElement;
    expect(logo).toBeInTheDocument();
    expect(logo.src.endsWith('logo.png')).toBe(true);

    const headerBackground = screen.getByAltText(
      'header background'
    ) as HTMLImageElement;
    expect(headerBackground).toBeInTheDocument();
    expect(headerBackground.src.endsWith('header_bg.svg')).toBe(true);

    navigationItems.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
    });
  });
});
