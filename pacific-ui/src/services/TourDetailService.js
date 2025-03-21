import AxiosConfig from '~/config/axiosConfig';
import config from '~/config';

const baseURL = config.api['tour-details'];

const TourDetailService = {
    getAllTourDetails: async () => {
        try {
            const response = await AxiosConfig.get(`${baseURL}/all`);
            return response.data;
        } catch (error) {
            console.error('Lỗi khi lấy danh sách tour chi tiết:', error);
            return Promise.reject(error);
        }
    },

    getTourDetailById: async (id) => {
        try {
            const response = await AxiosConfig.get(`${baseURL}/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Lỗi khi lấy tour chi tiết với ID ${id}:`, error);
            return Promise.reject(error);
        }
    },

    getTourDetailByTourId: async (tourId) => {
        try {
            const response = await AxiosConfig.get(`${baseURL}/tour/${tourId}`);
            return response.data;
        } catch (error) {
            console.error(`Lỗi khi lấy tour chi tiết với tourId ${tourId}:`, error);
            return Promise.reject(error);
        }
    },

    addTourDetail: async (tourDetailData) => {
        try {
            const response = await AxiosConfig.post(`${baseURL}/add`, tourDetailData);
            return response.data;
        } catch (error) {
            console.error('Lỗi khi thêm tour chi tiết:', error);
            return Promise.reject(error);
        }
    },

    updateTourDetail: async (id, userData) => {
        try {
            const response = await AxiosConfig.put(`${baseURL}/update/${id}`, userData);
            return response.data;
        } catch (error) {
            console.error('Lỗi khi cập nhật chi tiết tour:', error);
            return Promise.reject(error);
        }
    },

    updateTourDetailStatus: async (id, status) => {
        try {
            const response = await AxiosConfig.patch(`${baseURL}/updateStatus/${id}`, { status });
            return response.data;
        } catch (error) {
            console.error('Lỗi khi cập nhật trạng thái chi tiết tour:', error);
            return Promise.reject(error);
        }
    },
};

export default TourDetailService;
