import config from '~/config';
import axiosConfig from '~/config/axiosConfig';

const API_BASE = config.api.adminSupport;

const SupportService = {
    getAllSupports: async () => {
        try {
            const { data } = await axiosConfig.get(`${API_BASE}/all`);
            return data;
        } catch (error) {
            console.error('Lỗi khi lấy danh sách khách hàng cần hỗ trợ:', error);
            return Promise.reject(error);
        }
    },

    updateSupportStatus: async (id, status) => {
        try {
            const { data } = await axiosConfig.patch(`${API_BASE}/updateStatus/${id}`, { status });
            return data;
        } catch (error) {
            console.error(`Lỗi khi cập nhật trạng thái support ID ${id}:`, error);
            return Promise.reject(error);
        }
    },

    sendMail: async (email, subject, message) => {
        try {
            const payload = { email, subject, message };
            const { data } = await axiosConfig.post(`${API_BASE}/send-mail`, payload, {
                headers: { "Content-Type": "application/json" },
            });
            return data;
        } catch (error) {
            console.error("Lỗi khi gửi mail:", error.response?.data || error.message);
            return Promise.reject(error);
        }
    }

};

export default SupportService;
