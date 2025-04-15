import axiosConfig from '~/config/axiosConfig';

const AiServices = {
    askAi: async (query) => {
        try{
            const response = await axiosConfig.post('/api/ai-query', { query });
            return response.data;
        }catch (err){
            console.error(err);
            return Promise.reject(err);
        }
    },
}

export default AiServices;