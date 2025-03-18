const TransportServices = {
    getTransports : async () => {
        try {
            const resp = await AxiosConfig.get(config.api.transport + '/all');
            return resp.data;
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        }
    },
    getTransportById : async (id) => {
        try {
            const resp = await AxiosConfig.get(config.api.transport + `/${id}`);
            return resp.data;
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        }
    },
}
export  default TransportServices;