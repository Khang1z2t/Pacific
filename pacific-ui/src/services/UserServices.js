import AxiosConfig from '~/config/axiosConfig';
import config from '~/config';

const UserServices = {
    register : async (username, password, firstName, lastName, email) => {
        try{
            const response = await AxiosConfig.post(config.api.user + '/register', {
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
            const response = await AxiosConfig.post(config.api.user + '/login', {
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
            const response = await AxiosConfig.post(config.api.user + '/send-verify-email', {
                email,
            });
            return response.data;
        }catch (error){
            console.error('Error:', error);
            return Promise.reject(error);
        }
    },

    verifyEmail : async (email,otp) => {
        try{
            const response = await AxiosConfig.post(config.api.user + '/verify-email', {
                email,
                otp,
            });
            return response.data;
        }catch (error){
            console.error('Error:', error);
            return Promise.reject(error);
        }
    },

    resetPasword : async (newPassword,confirmPaswword) => {
        try{
            const response = await AxiosConfig.post(config.api.user + '/reset-password', {
                newPassword,
                confirmPaswword,
            });
            return response.data;
        }catch (error){
            console.error('Error:', error);
            return Promise.reject(error);
        }
    }
}

export default UserServices;
