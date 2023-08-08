import multer from 'multer';
import crypto from 'node:crypto';
import path from 'path';
export const upload = multer({
  dest: path.resolve(__dirname, '..', 'images'),
  limits: { fileSize: 1024 * 1024 * 2 },
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, path.resolve(__dirname, '..', 'images'));
    },
    filename(req, file, callback) {
      const fileName = `${crypto.randomBytes(20).toString('hex')}${file.originalname
        }`;
      callback(null, fileName);
    },
  }),
});