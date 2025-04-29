import * as React from 'react';
import { Container } from '@mui/material';

const ActionBar = ({ children }: { children: React.ReactNode[] }) => {
  return (
    <Container
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {children.map((child) => child)}
    </Container>
  );
};

export default ActionBar;
