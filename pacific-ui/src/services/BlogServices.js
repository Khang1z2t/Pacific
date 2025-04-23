import axiosConfig from '~/config/axiosConfig';
import config from '~/config';

const BlogServices = {
    getAllBlogs: async () => {
        try {
            const response = await axiosConfig.get(config.api.blog + '/all');
            return response.data;
        } catch (error) {
            console.error('Error fetching blogs:', error);
            return Promise.reject(error);
        }
    },
    createBlog: async (body) => {
        const token = localStorage.getItem('accessToken');
        try {
            const response = await axiosConfig.post(config.api.blog + '/create', body, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + token,
                },
            });
        } catch (error) {
            console.error('Error creating blog:', error);
            return Promise.reject(error);
        }
    },
    getBlogCategories: async () => {
        try {
            const response = await axiosConfig.get(config.api.blog + '/category/all');
            return response.data;
        } catch (error) {
            console.error('Error fetching blog categories:', error);
            return Promise.reject(error);
        }
    },

    getBySlug: async (slug) => {
        try {
            const response = await axiosConfig.get(config.api.blog + `/slug?slug=` + slug);
            return response.data;
        } catch (error) {
            console.error('Error fetching blog by slug:', error);
            return Promise.reject(error);
        }
    },
};

export default BlogServices;