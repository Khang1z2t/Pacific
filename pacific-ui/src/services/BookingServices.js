import config from '~/config';
import axiosConfig from '~/config/axiosConfig';

const BookingService = {
    checkOut: async (amount, orderInfo) => {
        try {
            const response = await axiosConfig.get(`${config.api.booking}/checkout`, {
                params: { amount, orderInfo },
            });
            return response.data;
        } catch (error) {
            console.error('Error during checkout:', error);
            return Promise.reject(error);
        }
    },

    returnCheckout: async () => {
        try {
            const response = await axiosConfig.get(`${config.api.booking}/vnpay-payment-return`);
            return response.data;
        } catch (error) {
            console.error('Error during payment return:', error);
            return Promise.reject(error);
        }
    },

    getBookingById: async (id) => {
        try {
            const response = await axiosConfig.get(`${config.api.booking}/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching booking with ID ${id}:`, error);
            return Promise.reject(error);
        }
    },

    getBookings: async () => {
        try {
            const response = await axiosConfig.get(`${config.api.booking}/all`);
            return response.data;
        } catch (error) {
            console.error('Error fetching all bookings:', error);
            return Promise.reject(error);
        }
    },
};

export default BookingService;
