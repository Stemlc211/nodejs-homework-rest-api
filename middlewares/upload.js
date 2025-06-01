import multer from 'multer';
import path from 'path';

const tmpDir = path.join(process.cwd(), 'tmp');

const storage = multer.diskStorage({
  destination: tmpDir,
  filename: (req, file, cb) => cb(null, file.originalname),
});

export default multer({ storage });
