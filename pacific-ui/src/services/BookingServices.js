import config from '~/config';
import axiosConfig from '~/config/axiosConfig';

const BookingServices = {
    checkOut : async (params) => {
        try{
            const response = await axiosConfig.get(config.api.booking + `/checkout`, {params});
            return response.data;
        }catch (error){
            console.error('Error:', error);
            return Promise.reject(error);
        }
    },
    returnCheckout : async () => {
        try{
            const response = await axiosConfig.get(config.api.booking + `/vnpay-payment-return`);
            return response.data;
        }catch (error){
            console.error('Error:', error);
            return Promise.reject(error);
        }
    },

//     NGHIEP VU BOOK TOUR
    getInfoMonth: async (id) => {
        try{
            const resp = await axiosConfig.get(config.api.tourDetail + `/month/${id}`)
            return resp.data;
        }catch (error){
            console.error('Error:', error);
            return Promise.reject(error);
        }
    },

    getInfoDay : async (params) => {
        try{
            const resp = await axiosConfig.get(config.api.tourDetail + '/day', {params});
            return resp.data;
        }catch (error){
            console.error('Error:', error);
            return Promise.reject(error);
        }
    },

}

export default BookingServices;