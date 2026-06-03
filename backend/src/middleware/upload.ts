import multer from 'multer';

const memoryStorage = multer.memoryStorage();

const imageFilter = (_req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype.startsWith('image/')) {
    return cb(null, true);
  }

  cb(new Error('Only image uploads are allowed.'));
};

export const uploadMedia = multer({
  storage: memoryStorage,
  fileFilter: imageFilter,
  limits: {
    fileSize: 10 * 1024 * 1024
  }
});
