import axiosConfig from '~/config/axiosConfig';
import api from '~/config/api';

const TransportServices = {
    getTransports: async () => {
        try {
            const resp = await axiosConfig.get(api.transport);
            return resp.data;
        } catch (error) {
            console.error('Error fetching transports:', error);
            throw error;
        }
    },

    getTransportById: async (id) => {
        try {
            const resp = await axiosConfig.get(`${api.transport}/${id}`);
            return resp.data;
        } catch (error) {
            console.error(`Error fetching transport with ID ${id}:`, error);
            throw error;
        }
    },

    addTransport: async (data) => {
        try {
            const payload = {
                name: data.name,
                cost: data.cost,
                typeTransport: data.typeTransport,
                imageURL: data.imageURL,
                active: data.active
            };
            const resp = await axiosConfig.post(api.transport, payload);
            return resp.data;
        } catch (error) {
            console.error('Error adding transport:', error);
            throw error;
        }
    },

    updateTransport: async (id, data) => {
        try {
            const payload = {
                name: data.name,
                cost: data.cost,
                typeTransport: data.typeTransport,
                imageURL: data.imageURL,
                active: data.active
            };
            const resp = await axiosConfig.put(`${api.transport}/${id}`, payload);
            return resp.data;
        } catch (error) {
            console.error(`Error updating transport with ID ${id}:`, error);
            throw error;
        }
    },

    deleteTransport: async (id) => {
        try {
            const resp = await axiosConfig.delete(`${api.transport}/${id}`);
            return resp.data;
        } catch (error) {
            console.error(`Error deleting transport with ID ${id}:`, error);
            throw error;
        }
    },

    toggleActive: async (id, isActive) => {
        try {
            const resp = await axiosConfig.patch(`${api.transport}/${id}`, { active: isActive });
            return resp.data;
        } catch (error) {
            console.error(`Error toggling active state for transport with ID ${id}:`, error);
            throw error;
        }
    },
};

export default TransportServices;
