import axiosConfig from '~/config/axiosConfig';
import config from '~/config';
const API_BASE = config.api.adminVoucher;

const VoucherServices = {
    getAllVouchers: async () => {
        try {
            const response = await axiosConfig.get(`${API_BASE}/all`);
            return response.data;
        } catch (error) {
            console.error('Lỗi khi lấy danh sách voucher:', error);
            return Promise.reject(error);
        }
    },

    getVoucherByCode: async (codeVoucher) => {
        try {
            const response = await axiosConfig.get(`${API_BASE}/by-code`, {
                params: { codeVoucher }  // Sử dụng query param thay vì path param
            });
            return response.data;
        } catch (error) {
            console.error(`Lỗi khi lấy voucher với code: ${codeVoucher}`, error);
            return Promise.reject(error);
        }
    },

    updateVoucher: async (id, voucherData) => {
        try {
            const response = await axiosConfig.put(`${API_BASE}/update/${id}`, voucherData);
            return response.data;
        } catch (error) {
            console.error(`Lỗi khi cập nhật voucher:`, error.response?.data || error.message);
            return Promise.reject(error);
        }
    },


    updateVoucherStatus: async (id, status) => {
        try {
            const response = await axiosConfig.patch(`${API_BASE}/updateStatus/${id}`, { status });
            return response.data;
        } catch (error) {
            console.error(`Lỗi khi cập nhật trạng thái voucher ID ${id}:`, error);
            return Promise.reject(error);
        }
    },

    addVoucher: async (voucherData) => {
        try {
            const response = await axiosConfig.post(`${API_BASE}/create`, voucherData);
            return response.data;
        } catch (error) {
            console.error('Lỗi khi thêm voucher:', error);
            return Promise.reject(error);
        }
    },

    deleteVoucher: async (id) => {
        try {
            const response = await axiosConfig.delete(`${API_BASE}/delete/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Lỗi khi xóa voucher ID ${id}:`, error);
            return Promise.reject(error);
        }
    }
};

export default VoucherServices;
