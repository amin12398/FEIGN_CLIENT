import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
} from '@mui/material';
import {
  PersonAdd,
  DirectionsCar,
  People,
} from '@mui/icons-material';

const drawerWidth = 240;

const Menu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: 'Ajouter un client', icon: <PersonAdd />, path: '/add-client' },
    { text: 'Ajouter une voiture', icon: <DirectionsCar />, path: '/add-voiture' },
    { text: 'Liste des clients', icon: <People />, path: '/clients' },
    {text: 'Liste des voitures', icon: <DirectionsCar />, path: '/voitures'}
  ];

  return (
    <>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Gestion client voiture
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {menuItems.map((item) => (
              <ListItem
                button
                key={item.text}
                onClick={() => navigate(item.path)}
                selected={location.pathname === item.path}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Menu;
