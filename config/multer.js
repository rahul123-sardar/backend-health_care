import multer from 'multer';

const storage = multer.memoryStorage(); // files stored in memory temporarily
const upload = multer({ storage });

export default upload;