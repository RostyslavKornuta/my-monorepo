import { Navigate, Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';
import { Sites } from './modules/sites';
import { Library } from './modules/library';

export function App() {
  return (
    <Container sx={{
      position: 'relative',
      padding: '16px 24px',
      margin: '-64px 20px 0 20px',
      height: 'calc(100vh - 120px)',
      background: '#FFFFFF',
      borderRadius: '16px',
      boxShadow: '0 2px 12px 0 #8E93A826'
    }}>
      <Routes>
        <Route path='/' element={<Navigate to='/sites' replace/>}/>

        <Route path='/sites' element={<Sites/>}/>
        <Route path='/library' element={<Library/>}/>
      </Routes>
    </Container>
  )
}

export default App;
