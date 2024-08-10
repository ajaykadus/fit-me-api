import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes';
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;
const mongoURI = 'mongodb://localhost:27017/mydatabase'; // Update with your MongoDB URI

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Use routes
app.use('/api/users', userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
