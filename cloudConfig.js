const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_AYPI_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'wanderlust_storage',
      allowedFormats: async (req, file) => ['png', 'jpg', 'jpeg', 'pdf'], // supports promises as well
     
    },
  });

  module.exports={
    cloudinary,
    storage,
  };