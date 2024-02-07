import { openUploadWidget } from 'cloudinary-react';

const cloudinaryConfig = {
  cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.REACT_APP_CLOUDINARY_API_KEY,
  apiSecret: process.env.REACT_APP_CLOUDINARY_API_SECRET,
};

const uploadFileToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    openUploadWidget(
      {
        cloudinaryConfig,
        uploadPreset: 'your_upload_preset', // Create an upload preset in your Cloudinary dashboard
        sources: ['local'],
        multiple: false,
        showAdvancedOptions: true,
      },
      (error, result) => {
        if (result.event === 'success') {
          resolve(result.info.secure_url);
        } else {
          reject(error);
        }
      }
    ).open();
  });
};

export { uploadFileToCloudinary };
