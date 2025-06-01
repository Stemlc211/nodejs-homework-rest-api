import express from 'express';
import auth from '../../middlewares/auth.js';
import upload from '../../middlewares/upload.js';
import updateAvatar from '../../controllers/users/avatars.js';

const router = express.Router();
router.patch('/avatars', auth, upload.single('avatar'), updateAvatar);

export default router;
