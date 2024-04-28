const imageToBase64 = async (image) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = () => {
            resolve(reader.result);
        };

        reader.onerror = (error) => {
            reject(error);
        };

        reader.readAsDataURL(image);
    });
};

export default imageToBase64