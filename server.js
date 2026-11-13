require('dotenv').config();
const path = require('path');
const express = require('express');
const logger = require('./middleware/logger');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(logger);          // log requests (bonus)
app.use(express.json());  // JSON parsing

// GET / -> "My Week 2 API!" for curl/Postman.
// Browsers (Accept: text/html) fall through to the static page below.
app.get('/', (req, res, next) => {
  const accept = req.headers.accept || '';
  if (accept.includes('text/html')) return next();
  res.send('My Week 2 API!');
});

// Serve static HTML page at /
app.use(express.static(path.join(__dirname, 'public')));

// POST /user -> accepts { name, email }
app.post('/user', (req, res) => {
  const { name, email } = req.body || {};
  if (!name || !email) {
    return res.status(400).json({ error: 'Both name and email are required.' });
  }
  res.send(`Hello, ${name}!`);
});

// GET /user/:id
app.get('/user/:id', (req, res) => {
  res.send(`User ${req.params.id} profile`);
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler (also catches invalid JSON bodies)
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    error: status === 400 ? 'Invalid JSON in request body.' : 'Something went wrong.'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
