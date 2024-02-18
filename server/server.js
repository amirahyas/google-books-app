// server.js
const express = require('express');
const path = require('path');
const connectDB = require('./config/connection');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(routes);

// Connect to MongoDB and start the server
connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
