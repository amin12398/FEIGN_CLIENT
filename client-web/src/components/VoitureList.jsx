import React, { useState, useEffect } from 'react';
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
  Container,
  Alert,
  IconButton,
  Tooltip,
  TextField,
  InputAdornment
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import VoitureService from '../services/VoitureService';

const VoitureList = () => {
  const [voitures, setVoitures] = useState([]);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredVoitures, setFilteredVoitures] = useState([]);

  useEffect(() => {
    fetchVoitures();
  }, []);

  useEffect(() => {
    filterVoitures();
  }, [searchTerm, voitures]);

  const fetchVoitures = async () => {
    try {
      const data = await VoitureService.getAllCars();
      setVoitures(data);
      setFilteredVoitures(data);
    } catch (error) {
      setError('Erreur lors du chargement des voitures');
      console.error(error);
    }
  };

  const filterVoitures = () => {
    const filtered = voitures.filter(voiture => 
      voiture.marque.toLowerCase().includes(searchTerm.toLowerCase()) ||
      voiture.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      voiture.matricule.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredVoitures(filtered);
  };


  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Liste des Voitures
        </Typography>

        <TextField
          fullWidth
          variant="outlined"
          placeholder="Rechercher une voiture..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 3 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        {error ? (
          <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Marque</TableCell>
                  <TableCell>Modèle</TableCell>
                  <TableCell>Matricule</TableCell>
                  <TableCell>Propriétaire</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredVoitures.map(voiture => (
                  <TableRow key={voiture.id}>
                    <TableCell>{voiture.marque}</TableCell>
                    <TableCell>{voiture.model}</TableCell>
                    <TableCell>{voiture.matricule}</TableCell>
                    <TableCell>{voiture.idclient || 'Non assigné'}</TableCell>
                    
                  </TableRow>
                ))}
                {filteredVoitures.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      Aucune voiture trouvée
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

export default VoitureList; 