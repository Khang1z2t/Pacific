import AxiosConfig from '~/config/axiosConfig';
import config from '~/config';

const HotelServices = {

    getHotels: async () => {
        try {
            const resp = await AxiosConfig.get(config.api.hotel + '/all');
            return resp.data;
        } catch (err) {
            console.error(err);
            return Promise.reject(err);
        }
    },

    getHotelById: async (id) => {
        try {
            const resp = await AxiosConfig.get(`${config.api.hotel}/${id}`);
            return resp.data;
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        }
    },

    createHotel: async (hotelData) => {
        try {
            const resp = await AxiosConfig.post(config.api.hotel, hotelData);
            return resp.data;
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        }
    },

    updateHotel: async (id, hotelData) => {
        try {
            const resp = await AxiosConfig.put(`${config.api.hotel}/${id}`, hotelData);
            return resp.data;
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        }
    },

    deleteHotel: async (id) => {
        try {
            const resp = await AxiosConfig.delete(`${config.api.hotel}/${id}`);
            return resp.data;
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        }
    },
};

export default HotelServices;
