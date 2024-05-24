const url = `https://api.cloudinary.com/v1_1/dtvkn1a9g/image/upload`

const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "mern_product");

    try {
        const dataResponse = await fetch(url, {
            method: "post",
            body: formData
        });

        if (!dataResponse.ok) {
            throw new Error('Failed to upload image');
        }

        return dataResponse.json();
    } catch (error) {
        console.error('Error uploading image:', error);
        return { error: 'Failed to upload image' };
    }
};

export default uploadImage