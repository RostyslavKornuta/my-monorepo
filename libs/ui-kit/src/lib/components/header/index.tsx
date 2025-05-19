import { NavLink } from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material';

export interface NavItem {
  title: string;
  path: string;
}

const Header = ({
  navigationItems,
  logo,
}: {
  navigationItems: NavItem[];
  logo: string;
}) => {
  return (
    <Container
      sx={{
        position: 'relative',
        padding: '16px 20px',
        height: '136px',
        background: '#111727',
      }}
    >
      <Container
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '48px',
        }}
      >
        <NavLink to={navigationItems.length ? navigationItems[0].path : '/'}>
          <Box
            component="img"
            src={logo}
            alt="logo"
            sx={{
              width: '103px',
              height: '36px',
              objectFit: 'contain',
            }}
          />
        </NavLink>
        <Container
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          {navigationItems.map((item) => (
            <Typography
              key={item.path}
              component={NavLink}
              className={(isActive) => isActive && 'active'}
              to={item.path}
              sx={{
                padding: '8px 16px',
                fontSize: '14px',
                lineHeight: '20px',
                color: '#F1F2F4',
                borderRadius: '8px',
                '&.active, &:hover': {
                  background: '#2B334A',
                },
              }}
            >
              {item.title}
            </Typography>
          ))}
        </Container>
      </Container>
      <Box
        component="img"
        src="public/header_bg.svg"
        alt="header background"
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          objectFit: 'contain',
          pointerEvents: 'none',
        }}
      />
    </Container>
  );
};

export default Header;
