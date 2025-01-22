import express from 'express';
import { configDotenv } from 'dotenv';
import cors from 'cors';
configDotenv({});


export const app = express();
app.use(cors({}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello from the server...");
});

import userRoutes from './routes/user.routes.js';

app.use('/api/user', userRoutes);