import AxiosConfig from '~/config/axiosConfig';
import config from '~/config';

const CategoryService = {
    getCategories: async () => {
        try {
            const resp = await AxiosConfig.get(config.api.category + '/all');
            return resp.data;
        } catch (err) {
            console.error(err);
            return Promise.reject(err);
        }
    },

};

export default CategoryService;