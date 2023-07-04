const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// API Routes
app.use('/api', apiRoutes);

// HTML Routes
app.use('/', htmlRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});
