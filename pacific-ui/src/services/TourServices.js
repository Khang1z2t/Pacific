import axiosConfig from '~/config/axiosConfig';
import config from '~/config';

const TourServices = {
    getAllTour : async () => {
        try{
            const response = await axiosConfig.get(config.api.tours + '/all');
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
}
export default TourServices;