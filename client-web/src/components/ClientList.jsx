import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
  Box,
} from '@mui/material';
import { Visibility } from '@mui/icons-material';
import ClientService from '../services/ClientService';

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await ClientService.getAllClients();
        setClients(data);
      } catch (error) {
        console.error('Erreur lors du chargement des clients', error);
      }
    };
    fetchClients();
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Liste des clients
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell>Age</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell>{client.nom}</TableCell>
                <TableCell>{client.age} ans</TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    startIcon={<Visibility />}
                    onClick={() => navigate(`/client/${client.id}`)}
                  >
                    Voir les voitures
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ClientList;
