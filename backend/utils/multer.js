const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// Configure Multer Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "bespoke", // Folder name in Cloudinary
    allowedFormats: ["jpg", "png", "jpeg"], // Allowed file types
  },
});

const upload = multer({ storage });

module.exports = upload;
