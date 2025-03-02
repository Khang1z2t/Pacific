import AxiosConfig from '~/config/axiosConfig';

const TourDetailServices = {
    getTourDetail: async (tourId) => {
        try{
            const response = await AxiosConfig.get(`/api/tours/${tourId}`);
            return response.data;
        }catch (error){
            console.error('Error:', error);
            return Promise.reject(error);
        }
    }
}

export default TourDetailServices;