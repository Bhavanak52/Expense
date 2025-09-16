// backend/src/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors =require('cors');
require('dotenv').config();

const expenseRoutes = require('./routes/expenses');

// Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/expenses', expenseRoutes);

// Connect to DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // Listen for requests
    app.listen(process.env.PORT, () => {
      console.log('Connected to db & listening on port', process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
