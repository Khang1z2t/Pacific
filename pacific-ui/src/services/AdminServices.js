import AxiosConfig from '~/config/axiosConfig';
import config from '~/config';

const AdminServices = {
// ADMIN HOMEPAGE REVENUE
    getBookingRevenue: async (params) => {
        try {
            const resp = await AxiosConfig.get(config.api.bookingRevenue + '/revenue', { params });
            return resp.data;
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        }
    },

    getBookingRevenueMonthByYear: async (params) => {
        try {
            const resp = await AxiosConfig.get(config.api.bookingRevenue + '/revenue/month', { params });
            return resp.data;
        } catch (err) {
            console.error(err);
            return Promise.reject(err);
        }
    },

    getBookingRevenuesByYear: async (params) => {
        try {
            const resp = await AxiosConfig.get(config.api.bookingRevenue + '/revenue/year', { params });
            return resp.data;
        } catch (err) {
            console.error(err);
            return Promise.reject(err);
        }
    },

//     GUIDE MANAGEMENT
    getGuides: async () => {
        try {
            const resp = await AxiosConfig.get(config.api.guide + '/all');
            return resp.data;
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        }
    },
    getGuideById: async (id) => {
        try {
            const resp = await AxiosConfig.get(config.api.guide + `/${id}`);
            return resp.data;
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        }
    },


};

export default AdminServices;