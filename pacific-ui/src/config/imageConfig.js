import config from '~/config/index';

const imageConfig = {
    getImage: (imageId) => {
        return `http://localhost:8080/api/image/${imageId}`;
    },
    getAvatar: (imageId) => {
        if (!imageId) {
            return config.webConfig.defaultUser; // Ảnh mặc định nếu không có imageId
        }
        // Giả định: Drive ID dài hơn 20 ký tự, Google ID ngắn hơn
        const isDriveId = imageId.length > 20 || imageId.includes('-'); // Điều chỉnh điều kiện dựa trên thực tế
        return isDriveId
            ? `https://lh3.googleusercontent.com/d/${imageId}`
            : `https://lh3.googleusercontent.com/a/${imageId}`;
    },
};

export default imageConfig;