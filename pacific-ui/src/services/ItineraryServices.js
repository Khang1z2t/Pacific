import config from '~/config';
import axiosConfig from '~/config/axiosConfig';

const ItineraryServices = {
    getByTourId : async (tourId) => {
        try{
            const response = await axiosConfig.get(config.api.itinerary + `/getAllByTour/${tourId}`);
            return response.data;
        }catch (error){
            console.error('Error:', error);
            return Promise.reject(error);
        }
    },
    AddItinerary : async (tourId, body) => {
        try{
            const response = await axiosConfig.post(config.api.itinerary + `/add?tourId=${tourId}`, body);
            return response.data;
        }catch (error){
            console.error('Error:', error);
            return Promise.reject(error);
        }
    },
}
export default ItineraryServices;
