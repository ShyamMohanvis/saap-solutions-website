const path = require('path');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Simple health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Serve frontend in production
const CLIENT_DIST = path.join(__dirname, '..', 'client', 'dist');
app.use(express.static(CLIENT_DIST));
// Fallback to index.html for any non-API route
app.use((req, res, next) => {
  if (req.path.startsWith('/api/')) return next();
  res.sendFile(path.join(CLIENT_DIST, 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


