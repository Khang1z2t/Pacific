import config from '~/config';
import axiosConfig from '~/config/axiosConfig';

const UserService = {
    register : async (username, password, firstName, lastName, email) => {
        try{
            const response = await axiosConfig.post(config.api.user + '/register', {
                username,
                password,
                firstName,
                lastName,
                email,
            });
            return response.data;
        }catch (error){
            console.error('Error:', error);
            return Promise.reject(error);
        }
    },

    login: async (username, password) => {
        try{
            const response = await axiosConfig.post(config.api.user + '/login', {
                username,
                password,
            });
            return response.data;
        }catch (error){
            console.error('Error:', error);
            return Promise.reject(error);
        }
    },

    sendVerifyEmail : async (email) => {
        try{
            const response = await axiosConfig.post(config.api.user + `/send-reset-password-mail?email=${email}`, {} , {
                timeout : 5000,
            })
            return response.data;
        }catch (error){
            console.error('Error:', error);
            return Promise.reject(error);
        }
    },

    verifyEmail : async (email,otp) => {
        try{
            const response = await axiosConfig.post(config.api.user + '/verify-reset-password', {
                email,
                otp,
            });
            return response.data;
        }catch (error){
            console.error('Error:', error);
            return Promise.reject(error);
        }
    },

    resetPassword : async (email,newPassword,confirmPaswword) => {
        try{
            const response = await axiosConfig.post(config.api.user + '/reset-password', {
                email,
                newPassword,
                confirmPaswword,
            });
            return response.data;
        }catch (error){
            console.error('Error:', error);
            return Promise.reject(error);
        }
    },

    getAllUsers : async () => {
        try{
            const response = await axiosConfig.get(config.api.adminUser + '/all');
            return response.data;
        }catch (error){
            console.error('Error:', error);
            return Promise.reject(error);
        }
    },


    updateUser: async (id, userData) => {
        try {
            const response = await axiosConfig.put(config.api.adminUser + `/update/${id}`, userData);
            return response.data;
        } catch (error) {
            console.error('Lỗi khi cập nhật user:', error);
            return Promise.reject(error);
        }
    },


    // Cập nhật trạng thái (active/inactive)
    updateUserStatus: async (id, status) => {
        try {
            const response = await axiosConfig.patch(config.api.adminUser + `/updateStatus/${id}`, { status });
            return response.data;
        } catch (error) {
            console.error('Error updating user status:', error);
            return Promise.reject(error);
        }
    },
}

export default UserService;
