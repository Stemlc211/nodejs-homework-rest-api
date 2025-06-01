import gravatar from 'gravatar';
import bcrypt from 'bcryptjs';
import User from '../../models/User.js';

export default async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(409).json({ message: 'Email in use' });

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email, { s: '250', d: 'retro' }, true);

  const newUser = await User.create({ email, password: hashPassword, avatarURL });

  res.status(201).json({ email: newUser.email, avatarURL });
};
