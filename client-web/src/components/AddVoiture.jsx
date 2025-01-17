import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  Container,
  MenuItem,
  FormControl,
  InputLabel,
  Select
} from '@mui/material';
import VoitureService from '../services/VoitureService';
import ClientService from '../services/ClientService';

const AddVoiture = () => {
  const [marque, setMarque] = useState('');
  const [matricule, setMatricule] = useState('');
  const [model, setModel] = useState('');
  const [clientId, setClientId] = useState('');
  const [clients, setClients] = useState([]);
  const [message, setMessage] = useState({ type: '', content: '' });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newVoiture = { marque, matricule, model, idclient: parseInt(clientId) };
    try {
      await VoitureService.createCar(clientId, newVoiture);
      setMessage({ type: 'success', content: 'Voiture ajoutée avec succès' });
      setMarque('');
      setMatricule('');
      setModel('');
      setClientId('');
    } catch (error) {
      setMessage({ type: 'error', content: 'Erreur lors de l\'ajout de la voiture' });
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Ajouter une voiture
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Marque"
            value={marque}
            onChange={(e) => setMarque(e.target.value)}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Matricule"
            value={matricule}
            onChange={(e) => setMatricule(e.target.value)}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Modèle"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            required
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Client</InputLabel>
            <Select
              value={clientId}
              label="Client"
              onChange={(e) => setClientId(e.target.value)}
              required
            >
              {clients.map(client => (
                <MenuItem key={client.id} value={client.id}>
                  {client.nom}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button 
            variant="contained" 
            type="submit" 
            sx={{ mt: 3 }}
            fullWidth
          >
            Ajouter
          </Button>
        </Box>
        {message.content && (
          <Alert severity={message.type} sx={{ mt: 2 }}>
            {message.content}
          </Alert>
        )}
      </Paper>
    </Container>
  );
};

export default AddVoiture;
