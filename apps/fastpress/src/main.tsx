import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './app';
import { Header, NavItem, theme } from '@my-monorepo/ui-kit';
import { store } from './services/store';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const navigationItems: NavItem[] = [
  {
    title: 'Sites',
    path: '/sites'
  },
  {
    title: 'Library',
    path: '/library'
  }
]

root.render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Header navigationItems={navigationItems} logo='/public/logo.svg'/>
          <App/>
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
