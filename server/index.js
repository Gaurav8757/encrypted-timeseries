// app.js
import express from 'express';
import cors from 'cors';
import connectDB from './database/databseConn.js';
import emitterRoutes from './routes/emitterRoutes.js';
import listenerRoutes from './routes/emitterRoutes.js';

const app = express();
// middleware
app.use(express.json());
app.use(cors());


connectDB();
app.use('/emit', emitterRoutes);
app.use('/save', listenerRoutes);

const PORT = process.env.PORT || 3000; //here port also comes from .env file

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
