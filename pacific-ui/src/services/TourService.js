import axiosConfig from '~/config/axiosConfig';
import config from '~/config';

const TourService = {
    getAllTours : async (params) => {
        try{
            const response = await axiosConfig.get(config.api.tours + '/all', {params});
            return response.data;
        }catch (error){
            console.error('Error:', error);
            return Promise.reject(error);
        }
    },
    getById : async (id) => {
        try{
            const response = await axiosConfig.get(config.api.tours + `/${id}`);
            return response.data;
        }catch (error){
            console.error('Error:', error);
            return Promise.reject(error);
        }
    },

    updateTour: async (id, userData) => {
        try {
            const response = await axiosConfig.put(config.api.tours + `/update/${id}`, userData);
            return response.data;
        } catch (error) {
            console.error('Lỗi khi cập nhật tour:', error);
            return Promise.reject(error);
        }
    },


    updateTourStatus: async (id, status) => {
        try {
            const response = await axiosConfig.patch(config.api.tours + `/updateStatus/${id}`, { status });
            return response.data;
        } catch (error) {
            console.error('Lỗi khi cập nhật trạng thái tour:', error);
            return Promise.reject(error);
        }
    },

    addTour: async ( userData) => {
        try {
            const response = await axiosConfig.post(config.api.tours + `/add`, userData);
            return response.data;
        } catch (error) {
            console.error('Lỗi khi thêm tour:', error);
            return Promise.reject(error);
        }
    },
}
export default TourService;