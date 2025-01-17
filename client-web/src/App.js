import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import { theme } from './theme/theme';
import AddClient from './components/AddClient';
import AddVoiture from './components/AddVoiture';
import ClientList from './components/ClientList';
import VoitureListByClient from './components/VoitureListByClient';
import Menu from './components/Menus';
import VoitureList from './components/VoitureList';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex' }}>
          <Menu />
          <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
            <Routes>
              <Route path="/add-client" element={<AddClient />} />
              <Route path="/add-voiture" element={<AddVoiture />} />
              <Route path="/clients" element={<ClientList />} />
              <Route path="/client/:clientId" element={<VoitureListByClient />} />
              <Route path="/voitures" element={<VoitureList />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
