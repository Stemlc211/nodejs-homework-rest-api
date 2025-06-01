import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/api/auth.js';
import userRoutes from './routes/api/users.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use('/avatars', express.static(path.join(__dirname, 'public/avatars')));
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.use((req, res) => res.status(404).json({ message: 'Not found' }));

export default app;
