import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  Container
} from '@mui/material';
import ClientService from '../services/ClientService';

const AddClient = () => {
  const [nom, setNom] = useState('');
  const [age, setAge] = useState('');
  const [message, setMessage] = useState({ type: '', content: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newClient = { nom, age: parseFloat(age) };
    try {
      await ClientService.createClient(newClient);
      setMessage({ type: 'success', content: 'Client ajouté avec succès' });
      setNom('');
      setAge('');
    } catch (error) {
      setMessage({ type: 'error', content: 'Erreur lors de l\'ajout du client' });
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Ajouter un client
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
            margin="normal"
          />
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

export default AddClient;
