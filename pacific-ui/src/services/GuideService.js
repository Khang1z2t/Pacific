import config from '~/config';
import axiosConfig from '~/config/axiosConfig';

const API_BASE = config.api.adminGuide;

const GuideService = {
    getAllGuides: async () => {
        try {
            const { data } = await axiosConfig.get(`${API_BASE}/all`);
            return data;
        } catch (error) {
            return handleError(error);
        }
    },

    createGuide: async (guideData) => {
        try {
            const { data } = await axiosConfig.post(`${API_BASE}/create`, guideData);
            return data;
        } catch (error) {
            return handleError(error);
        }
    },

    // getTourGuideById: async (id) => {
    //     try {
    //         const { data } = await axiosConfig.get(`${API_BASE}/guideTour/${id}`);
    //         return data;
    //     } catch (error) {
    //         return handleError(error);
    //     }
    // },

    updateGuide: async (id, userData) => {
        try {
            const { data } = await axiosConfig.put(`${API_BASE}/update/${id}`, userData);
            return data;
        } catch (error) {
            return handleError(error);
        }
    },

    updateGuideStatus: async (id, status) => {
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

export default GuideService;
