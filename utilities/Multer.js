const multer = require('multer');
const fs = require('fs');
const path = require('path');
const ValidationError = require('../errors/ValidationError');
const IMG_PATH = '/uploads/';
const MAX_IMG_FILE_SIZE = 1024 * 1024 * 20; // 20 MB limit

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, IMG_PATH, `${req.user.email}/`);
        if (!fs.existsSync(uploadDir)) {
            try{
                fs.mkdirSync(uploadDir, {recursive: true});
            }catch(err){
                cb(new Error('Error while uploading image'));
            };
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const uploadImage = multer({
    storage,
    limits: {
        fileSize: MAX_IMG_FILE_SIZE
    },
    fileFilter: (req, file, cb) => {
        if (file.size > MAX_IMG_FILE_SIZE) {
            cb(new ValidationError('Image file size exceeds the limit'));
        }
        else if (!(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg')) {
            cb(new ValidationError('Only PNG and JPEG files are allowed'));
        } else {
            cb(null, true);
        }
    }
});

module.exports = { uploadImage };