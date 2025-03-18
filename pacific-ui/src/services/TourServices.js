import axiosConfig from '~/config/axiosConfig';
import config from '~/config';
import AxiosConfig from '~/config/axiosConfig';
import qs from 'qs';

const TourServices = {
    getAllTour: async (params) => {
        try {
            const response = await axiosConfig.get(config.api.tours + '/all', { params });
            return response.data;
        } catch (error) {
            console.error('Error:', error);
            return Promise.reject(error);
        }
    },
    getById: async (id) => {
        try {
            const response = await axiosConfig.get(config.api.tours + `/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error:', error);
            return Promise.reject(error);
        }
    },
    AddTour: async (params) => {
        try {
            const resp = await AxiosConfig.post(config.api.tours + '/add', params , {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            return resp.data;
        } catch (error) {
            console.error('Error:', error);
            return Promise.reject(error);
        }
    },

};
export default TourServices;