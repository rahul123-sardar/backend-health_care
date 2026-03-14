// multer.js
import multer from "multer";
import cloudinary from "./cloudinary.js"; // your cloudinary config
import CloudinaryStorage from "multer-storage-cloudinary";


// Create storage using the new API
const storage = CloudinaryStorage({
  cloudinary, // pass cloudinary instance
  params: async (req, file) => ({
    folder: "patients",
    format: file.mimetype.split("/")[1], // jpg, png, etc.
    public_id: `${Date.now()}-${file.originalname}`,
  }),
});

const upload = multer({ storage });

export default upload;