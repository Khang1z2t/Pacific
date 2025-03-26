import axiosConfig from '~/config/axiosConfig';
import config from '~/config';

const handleError = (error, context) => {
    const errorMessage = error.response?.data || error.message || "Unknown error";
    console.error(`[TransportServices] Error in ${context}:`, errorMessage);
    return Promise.reject(errorMessage);
};

const TransportServices = {
    getTransports: async () => {
        try {
            const response = await axiosConfig.get(`${config.api.transport}/all`);
            return response.data;
        } catch (error) {
            return handleError(error, "getTransports");
        }
    },

    getTransportById: async (id) => {
        if (!id) return handleError({ message: "Transport ID is required" }, "getTransportById");

        try {
            const response = await axiosConfig.get(`${config.api.transport}/${id}`);
            return response.data;
        } catch (error) {
            return handleError(error, `getTransportById - ID: ${id}`);
        }
    },

    addTransport: async (params) => {
        if (!params || Object.keys(params).length === 0) {
            return handleError({ message: "Transport data is required" }, "addTransport");
        }

        try {
            console.log("🚀 Sending transport data:", params);
            const response = await axiosConfig.post(`${config.api.transport}/add`, params, {
                headers: { "Content-Type": "application/json" },
            });
            console.log("✅ Transport added successfully:", response.data);
            return response.data;
        } catch (error) {
            return handleError(error, "addTransport");
        }
    },

    updateTransport: async (id, data) => {
        if (!id || !data || Object.keys(data).length === 0) {
            return handleError({ message: "Transport ID and valid data are required" }, "updateTransport");
        }

        try {
            console.log("🚀 Updating transport:", data);
            const response = await axiosConfig.put(`${config.api.transport}/${id}`, data, {
                headers: { "Content-Type": "application/json" },
            });
            console.log("✅ Transport updated successfully:", response.data);
            return response.data;
        } catch (error) {
            return handleError(error, `updateTransport - ID: ${id}`);
        }
    },

    deleteTransport: async (id) => {
        if (!id) return handleError({ message: "Transport ID is required" }, "deleteTransport");

        try {
            const response = await axiosConfig.patch(`${config.api.transport}/${id}/delete`);
            return response.data ?? false;
        } catch (error) {
            return handleError(error, `deleteTransport - ID: ${id}`);
        }
    },

    updateTransportStatus: async (id, status) => {
        if (!id || status === undefined || status === null || status === "") {
            return handleError({ message: "Transport ID and valid status are required" }, "updateTransportStatus");
        }

        try {
            console.log(`🚀 Updating transport status (ID: ${id}):`, status);
            const response = await axiosConfig.patch(`${config.api.transport}/${id}/updateStatus`,
                { status: String(status) },
                { headers: { "Content-Type": "application/json" } }
            );
            console.log("✅ Transport status updated successfully:", response.data);
            return response.data;
        } catch (error) {
            return handleError(error, `updateTransportStatus - ID: ${id}`);
        }
    },
};

export default TransportServices;
