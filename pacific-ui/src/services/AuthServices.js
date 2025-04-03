import config from '~/config';
import axiosConfig from '~/config/axiosConfig';

const AuthService = {

    register: async (username, password, firstName, lastName, email) => {
        try {
            const response = await axiosConfig.post(config.api.auth + '/register', {
                username,
                password,
                firstName,
                lastName,
                email,
            });
            return response.data;
        } catch (error) {
            console.error('Error:', error);
            return Promise.reject(error);
        }
    },

    login: async (identifier, password) => {
        try {
            const response = await axiosConfig.post(config.api.auth + '/login', {
                identifier,
                password,
            });
            localStorage.setItem('accessToken', response.data.data.accessToken);
            return response.data;
        } catch (error) {
            console.error('Error:', error);
            return Promise.reject(error);
        }
    },

    sendVerifyEmailPass: async (email) => {
        try {
            const response = await axiosConfig.post(config.api.auth + `/send-reset-password-mail?email=${email}`, {}, {
                timeout: 60000,
            });
            return response.data;
        } catch (error) {
            console.error('Error:', error);
            return Promise.reject(error);
        }
    },

    verifyEmailPass: async (email, otp) => {
        try {
            const response = await axiosConfig.post(config.api.auth + '/verify-reset-password', {
                email,
                otp,
            });
            return response.data;
        } catch (error) {
            console.error('Error:', error);
            return Promise.reject(error);
        }
    },

    resetPassword: async (body) => {
        try {
            const response = await axiosConfig.post(config.api.auth + '/reset-password', body);
            return response.data;
        } catch (error) {
            console.error('Error:', error);
            return Promise.reject(error);
        }
    },

    authToken: async (token) => {
        try {
            if (!token) {
                return Promise.resolve(null);
            } else {
                const response = await axiosConfig.get(`${config.api.auth}/authenticate-token`, {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    },
                });
                return response.data;
            }
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    },

    loginGoogle: async () => {
        return new Promise(async (resolve, reject) => {
            try {
                // Gọi API để lấy URL đăng nhập Google
                const response = await axiosConfig.get(config.api.auth + '/oauth2/google');
                const googleAuthUrl = response.data.data;

                if (!googleAuthUrl) {
                    return reject(new Error('Không thể lấy URL đăng nhập Google'));
                }

                // Mở popup để người dùng đăng nhập
                const width = 600;
                const height = 600;
                const left = (window.screen.width - width) / 2;
                const top = (window.screen.height - height) / 2;

                const popup = window.open(
                    googleAuthUrl,
                    'Google Login',
                    `width=${width},height=${height},top=${top},left=${left}`,
                );

                if (!popup) {
                    return reject(new Error('Không thể mở popup. Vui lòng cho phép popup trong trình duyệt.'));
                }

                // Xử lý message từ popup
                const handleMessage = (event) => {
                    // Kiểm tra origin để đảm bảo an toàn
                    const allowedOrigins = [window.location.origin, 'https://pacific-vn.vercel.app'];
                    if (!allowedOrigins.includes(event.origin)) {
                        return;
                    }

                    if (event.data.error) {
                        reject(new Error(event.data.error));
                    }

                    if (event.data.accessToken) {
                        // Lưu token vào localStorage
                        localStorage.setItem('accessToken', event.data.accessToken);
                        localStorage.setItem('refreshToken', event.data.refreshToken);
                        resolve({ accessToken: event.data.accessToken, refreshToken: event.data.refreshToken });
                    }

                    window.removeEventListener('message', handleMessage);
                };

                window.addEventListener('message', handleMessage);

                // Timeout nếu người dùng không thao tác trong 120 giây
                const timeout = setTimeout(() => {
                    if (!popup.closed) {
                        popup.close();
                    }
                    reject(new Error('Quá thời gian đăng nhập. Vui lòng thử lại.'));
                }, 120000);
            } catch (error) {
                reject(error);
            }
        });
    },

    updateUsername: async (params) => {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await axiosConfig.post(config.api.auth + '/update-username', {}, {
                params,
                headers: {
                    'Authorization': 'Bearer ' + token,
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error:', error);
            return Promise.reject(error);
        }
    },

    sendMailVerify: async (email) => {
        try {
            const response = await axiosConfig.post(config.api.auth + `/send-verify-mail?email=${email}`);
            return response.data;
        } catch (error) {
            console.error('Error:', error);
            return Promise.reject(error);
        }
    },

    verifyEmail: async (body) => {
        try {
            const response = await axiosConfig.post(config.api.auth + '/verify-email', body);
            return response.data;
        } catch (error) {
            console.error('Error:', error);
            return Promise.reject(error);
        }
    },
};

export default AuthService;