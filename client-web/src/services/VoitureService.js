import axios from 'axios';

const GATEWAY_URL = 'http://localhost:8888/SERVICE-VOITURE';  

const VoitureService = {
    getAllCars: async () => {
        try {
            const response = await axios.get(`${GATEWAY_URL}/voitures`);
            return response.data;
        } catch (error) {
            console.error("There was an error fetching the cars!", error);
            throw error;
        }
    },

    getCarsByClientId: async (clientId) => {
        try {
            const response = await axios.get(`${GATEWAY_URL}/voitures/client/${clientId}`);
            return response.data;
        } catch (error) {
            console.error("There was an error fetching the cars for this client!", error);
            throw error;
        }
    },

    createCar: async (clientId, car) => {
        try {
            const response = await axios.post(`${GATEWAY_URL}/voitures/${clientId}`, car);
            return response.data;
        } catch (error) {
            console.error("There was an error creating the car!", error);
            throw error;
        }
    },

    updateCar: async (carId, updatedCar) => {
        try {
            const response = await axios.put(`${GATEWAY_URL}/voitures/${carId}`, updatedCar);
            return response.data;
        } catch (error) {
            console.error("There was an error updating the car!", error);
            throw error;
        }
    }
};

export default VoitureService;
