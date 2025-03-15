const imageConfig = {
    getImage: (imageId) => {
        return `https://lh3.googleusercontent.com/d/${imageId}`;
    },
    getAvatar: (imageId) => {
        return `https://lh3.googleusercontent.com/a/${imageId}` || `https://lh3.googleusercontent.com/d/${imageId}`;
    }
};

export default imageConfig;