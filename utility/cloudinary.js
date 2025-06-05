import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({ 
  cloud_name:process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_SECRET_KEY
});

const uploadImageOnCLoudinary = async (imagePath) => {

    try {
      // Upload the image
      const result = await cloudinary.uploader.upload(imagePath);
      return result.url
    } catch (error) {
      console.error(error);
    }
};

export default uploadImageOnCLoudinary;