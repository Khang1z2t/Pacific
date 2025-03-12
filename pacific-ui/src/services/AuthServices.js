import AxiosConfig from "~/config/axiosConfig";
import config from "~/config";

const AuthService = {
    authToken: async (token) => {
        try {
            const response = await AxiosConfig.get(`${config.api.auth}/authenticate-token`, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            return response.dataa
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