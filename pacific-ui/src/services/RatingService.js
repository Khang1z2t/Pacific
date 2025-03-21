import config from '~/config';
import axiosConfig from '~/config/axiosConfig';

const API_BASE = config.api.adminRating;

const RatingService = {
    getAllRatings: async () => {
        try {
            const { data } = await axiosConfig.get(`${API_BASE}/all`);
            return data;
        } catch (error) {
            return handleError(error);
        }
    },

    // getRatingById: async (id) => {
    //     try {
    //         const { data } = await axiosConfig.get(`${API_BASE}/rating/${id}`);
    //         return data;
    //     } catch (error) {
    //         return handleError(error);
    //     }
    // },

    createRating: async (ratingData) => {
        try {
            const { data } = await axiosConfig.post(`${API_BASE}/create`, ratingData);
            return data;
        } catch (error) {
            return handleError(error);
        }
    },

    updateRatingStatus: async (id, status) => {
        try {
            const { data } = await axiosConfig.patch(`${API_BASE}/updateStatus/${id}`, { status });
            return data;
        } catch (error) {
            return handleError(error);
        }
    },
};

    // Hàm xử lý lỗi chung để tránh trùng lặp
    const handleError = (error) => {
    console.error('API Error:', error.response ? error.response.data : error.message);
    return Promise.reject(error);
};

export default RatingService;
