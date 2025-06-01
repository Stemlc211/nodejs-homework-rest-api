import path from 'path';
import fs from 'fs/promises';
import Jimp from 'jimp';
import { v4 as uuidv4 } from 'uuid';
import User from '../../models/User.js';

const avatarsDir = path.join(process.cwd(), 'public/avatars');

export default async (req, res) => {
  const { path: tmpPath, originalname } = req.file;
  const { _id } = req.user;
  const filename = `${_id}_${uuidv4()}${path.extname(originalname)}`;
  const finalPath = path.join(avatarsDir, filename);

  await Jimp.read(tmpPath).then(img => img.resize(250, 250).writeAsync(finalPath));
  await fs.unlink(tmpPath);

  const avatarURL = `/avatars/${filename}`;
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.status(200).json({ avatarURL });
};
