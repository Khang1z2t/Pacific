import config from '~/config/index';
import axiosConfig from '~/config/axiosConfig';

const imageConfig = {
    // getImage: (imageId) => {
    //         return `http://localhost:8080/api/image/${imageId}`;
    // },
    getImage: (imageId) => {
        return `https://khangyuno.id.vn/api/image/${imageId}`;
    },
    getAvatar: (imageId) => {
        return `https://lh3.googleusercontent.com/a/${imageId}`;
    },
};

export default imageConfig;