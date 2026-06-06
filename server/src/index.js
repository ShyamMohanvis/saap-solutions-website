import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import contactRouter from './routes/contact.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const clientOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

app.use(cors({ origin: clientOrigin }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.get('/', (_req, res) => {
  res.json({ name: '[Your Agency Name] API', status: 'ok' });
});

app.use('/api/contact', contactRouter);

const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/agency';

mongoose.connect(mongoUri)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(port, () => console.log(`API listening on :${port}`));
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });


