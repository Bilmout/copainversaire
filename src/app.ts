import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import friendRoutes from './routes/routeDami';

dotenv.config();

const app = express();

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(express.urlencoded({ extended: true }));
app.use('/', friendRoutes);

mongoose.connect(process.env.MONGODB_URI as string)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

export default app;
