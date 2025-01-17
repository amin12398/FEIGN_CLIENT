import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Alert,
  Container
} from '@mui/material';
import VoitureService from '../services/VoitureService';
import ClientService from '../services/ClientService';

const VoitureListByClient = () => {
  const { clientId } = useParams();
  const [voitures, setVoitures] = useState([]);
  const [client, setClient] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [voituresData, clientData] = await Promise.all([
          VoitureService.getCarsByClientId(clientId),
          ClientService.getClientById(clientId)
        ]);
        setVoitures(voituresData);
        setClient(clientData);
      } catch (error) {
        setError('Erreur lors du chargement des données');
        console.error(error);
      }
    };
    fetchData();
  }, [clientId]);

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        {client && (
          <Typography variant="h4" gutterBottom>
            Voitures de {client.nom}
          </Typography>
        )}
        
        {error ? (
          <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>
        ) : (
          <TableContainer component={Paper} sx={{ mt: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Marque</TableCell>
                  <TableCell>Matricule</TableCell>
                  <TableCell>Modèle</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {voitures.map(voiture => (
                  <TableRow key={voiture.id}>
                    <TableCell>{voiture.marque}</TableCell>
                    <TableCell>{voiture.matricule}</TableCell>
                    <TableCell>{voiture.model}</TableCell>
                  </TableRow>
                ))}
                {voitures.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      Aucune voiture trouvée pour ce client
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Container>
  );
};

export default VoitureListByClient;
