import express, { json } from 'express';
import route from './routes/route.js';
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors( {
  origin: 'http://localhost:5173'
}));

app.use('/logs', route);

export default app;