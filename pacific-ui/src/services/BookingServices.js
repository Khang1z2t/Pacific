import config from '~/config';
import axiosConfig from '~/config/axiosConfig';

const BookingServices = {
    checkOut : async (amount, orderInfo) => {
        try{
            const response = await axiosConfig.get(config.api.booking + `/checkout?amount=${amount}&orderInfo=${orderInfo}`);
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
}

export default BookingServices;