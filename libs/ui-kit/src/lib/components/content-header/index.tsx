import { Container, Typography } from '@mui/material';
import * as React from 'react';

const ContentHeader = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <Container
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Typography
        sx={{
          fontSize: '24px',
          fontWeight: 700,
          lineHeight: '32px',
        }}
      >
        {title}
      </Typography>
      {children}
    </Container>
  );
};

export default ContentHeader;
