const HotelServices = {
    getHotels: async () => {
        try {
            const resp = await AxiosConfig.get(config.api.hotel + '/all');
            return resp.data;
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        }
    },

    getHotelById: async (id) => {
        try {
            const resp = await AxiosConfig.get(config.api.hotel + `/${id}`);
            return resp.data;
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        }
    },
}
export default HotelServices;