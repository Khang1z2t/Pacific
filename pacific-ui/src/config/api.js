import axiosConfig from '~/config/axiosConfig';


const getAllTour = async () => {
    try{
        const response = await axiosConfig.get('/api/tours/all');
        return response.data;
    }catch (error){
        console.error('Error:', error);
        return Promise.reject(error);
    }
};
const getById = async (id) => {
    try{
        const response = await axiosConfig.get(`/api/tours/${id}`);
        return response.data;
    }catch (error){
        console.error('Error:', error);
        return Promise.reject(error);
    }
}
export { getAllTour, getById };
