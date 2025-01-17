import axios from 'axios';

const GATEWAY_URL = 'http://localhost:8888/SERVICE-CLIENT';  

const ClientService = {
    getAllClients: async () => {
        try {
            const response = await axios.get(`${GATEWAY_URL}/clients`);
            return response.data;
        } catch (error) {
            console.error("There was an error fetching the clients!", error);
            throw error;
        }
    },

    getClientById: async (id) => {
        try {
            const response = await axios.get(`${GATEWAY_URL}/client/${id}`);
            return response.data;
        } catch (error) {
            console.error("There was an error fetching the client!", error);
            throw error;
        }
    },

    createClient: async (client) => {
        try {
            const response = await axios.post(`${GATEWAY_URL}/client`, client);
            return response.data;
        } catch (error) {
            console.error("There was an error creating the client!", error);
            throw error;
        }
    }
};

export default ClientService;
