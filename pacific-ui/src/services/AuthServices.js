import AxiosConfig from "~/config/axiosConfig";
import config from "~/config";

const AuthService = {
    loginGoogle: async () => {
        try {
            const response = await AxiosConfig.get(config.api.auth + '/oauth2/google');
            // window.open(response.data.data, "Google Login", `width=${width},height=${height},top=${top},left=${left}`);
            window.location.href = response.data.data

        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    }
}

export default AuthService