import { render, screen } from '@testing-library/react';
import ActionBar from './index';
import { Button, Typography } from '@mui/material';
import '@testing-library/jest-dom';

describe('ActionBar', () => {
  it('Renders all children elements', () => {
    render(
      <ActionBar>
        <Button>Click me</Button>
        <Typography>Some text</Typography>
      </ActionBar>
    );

    expect(
      screen.getByRole('button', { name: /click me/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/some text/i)).toBeInTheDocument();
  });
});
