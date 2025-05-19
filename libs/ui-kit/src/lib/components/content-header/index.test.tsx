import { render, screen } from '@testing-library/react';
import ContentHeader from './index';
import '@testing-library/jest-dom';

describe('ContentHeader', () => {
  it('Renders title and children', () => {
    render(
      <ContentHeader title="Dashboard">
        <div>Extra</div>
      </ContentHeader>
    );

    expect(
      screen.getByRole('heading', { name: /dashboard/i })
    ).toBeInTheDocument();
    expect(screen.getByText('Extra')).toBeInTheDocument();
  });
});
