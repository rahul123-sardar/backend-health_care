import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import { Readable } from "stream";

// Multer memory storage (no local files)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Helper function to upload buffer to Cloudinary
export const uploadToCloudinary = (fileBuffer, filename, folder = "patients") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, public_id: filename, resource_type: "image" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    const readable = new Readable();
    readable.push(fileBuffer);
    readable.push(null);
    readable.pipe(stream);
  });
};

export default upload;