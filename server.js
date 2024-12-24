const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/config');
const userRoutes = require('./routers/userRoute');
const multer = require("multer");
const path = require("path");
const cors = require('cors');

const connectDB = require('./db/db')
require('dotenv').config();

const app = express();
connectDB()
app.use(cors());
app.use(express.json());
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/"); 
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); 
    },
  });
  
  const upload = multer({ storage });
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
  app.use('/uploads', express.static(path.join(__dirname, 'uploads/admin')));



// Middleware
app.use(express.json());
// Routes
app.use('/api', userRoutes);
// Start server
//const port = config.port;
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
module.exports = app;
