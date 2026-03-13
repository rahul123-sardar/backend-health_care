// config/multer.js
import multer from "multer";
import cloudinary from "./cloudinary.js";
import { Readable } from "stream";

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const uploadToCloudinary = (fileBuffer, filename, folder = "patients") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, public_id: filename, resource_type: "image" },
      (error, result) => (error ? reject(error) : resolve(result))
    );
    const readable = new Readable();
    readable.push(fileBuffer);
    readable.push(null);
    readable.pipe(stream);
  });
};

export default upload;