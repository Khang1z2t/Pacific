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

    getBookingCount: async (params) => {
        try {
            const resp = await AxiosConfig.get(config.api.bookingRevenue + '/bookingCount', { params });
            return resp.data;
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        }
    },

    getBookingStatusStats: async () => {
        try {
            const resp = await AxiosConfig.get(config.api.bookingRevenue + '/booking-status-stats');
            return resp.data;
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        }
    },

    getRevenueStats: async (params) => {
        try {
            const resp = await AxiosConfig.get(config.api.bookingRevenue + '/stats', {params});
            return resp.data;
        } catch (err) {
            console.error(err);
            return Promise.reject(err);
        }
    },

    getReviewStats: async (params) => {
        try {
            const resp = await AxiosConfig.get(config.api.bookingRevenue + '/review-stats', { params });
            return resp.data;
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        }
    },

    getDetailReviewStats: async (params) => {
        try {
            const resp = await AxiosConfig.get(config.api.bookingRevenue + '/review-detail-stats', { params });
            return resp.data;
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        }
    },

    getTopBookedTours: async (params) => {
        try {
            const resp = await AxiosConfig.get(config.api.bookingRevenue + '/top-booked', { params });
            return resp.data;
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        }
    },

    getBookingYearlyStats: async () => {
        try {
            const resp = await AxiosConfig.get(config.api.bookingRevenue + '/revenue-booking/yearly');
            return resp.data;
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        }
    }
};

export default AdminServices;