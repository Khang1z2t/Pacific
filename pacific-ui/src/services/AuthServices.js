import AxiosConfig from "~/config/axiosConfig";
import config from "~/config";

const AuthService = {

    register : async (username, password, firstName, lastName, email) => {
        try{
            const response = await AxiosConfig.post(config.api.auth + '/register', {
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
            const response = await AxiosConfig.post(config.api.auth + '/login', {
                username,
                password,
            });
            localStorage.setItem('accessToken', response.data.data.access_token);
            return response.data;
        }catch (error){
            console.error('Error:', error);
            return Promise.reject(error);
        }
    },

    sendVerifyEmail : async (email) => {
        try{
            const response = await AxiosConfig.post(config.api.auth + `/send-reset-password-mail?email=${email}`, {} , {
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
            const response = await AxiosConfig.post(config.api.auth + '/verify-reset-password', {
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
            const response = await AxiosConfig.post(config.api.auth + '/reset-password', {
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

    authToken: async (token) => {
        try {
            if(!token){
                return null;
            }else{
                const response = await AxiosConfig.get(`${config.api.auth}/authenticate-token`, {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                });
                return response.data;
            }
        } catch (error) {
            console.log(error)
            return Promise.reject(error);
        }
    },

    loginGoogle: async () => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await AxiosConfig.get(config.api.auth + "/oauth2/google");

                const width = 600;
                const height = 600;
                const left = (window.screen.width - width) / 2;
                const top = (window.screen.height - height) / 2;

                const popup = window.open(
                    response.data.data,
                    "Google Login",
                    `width=${width},height=${height},top=${top},left=${left}`
                );

                if (!popup) {
                    return;
                }

                const handleMessage = (event) => {
                    if (event.origin !== window.location.origin) return;

                    if (event.data.error) {
                        reject(event.data.error);
                    }

                    if (event.data.accessToken) {
                        localStorage.setItem("accessToken", event.data.accessToken);
                        localStorage.setItem("refreshToken", event.data.refreshToken);
                        resolve();
                    }

                    window.removeEventListener("message", handleMessage);
                };

                window.addEventListener("message", handleMessage);

            } catch (error) {
                reject(error);
            }
        });
    }
}

export default AuthService