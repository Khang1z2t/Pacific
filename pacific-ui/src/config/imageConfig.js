const imageConfig = {
    getImage: (imageId) => {
            return `http://localhost:8080/api/image/${imageId}`;
    },
    getAvatar: (imageId) => {
        return `https://lh3.googleusercontent.com/a/${imageId}`;
    },
};

export default imageConfig;