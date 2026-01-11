/**
 * Mock API Server for Gadget Hub
 * Simplified server for login functionality and product retrieval
 */

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// Load database
const dbPath = path.join(__dirname, 'db.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

// POST - Login endpoint (Authentication)
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  const user = db.users.find(u => u.username === username);

  if (!username || !password) {
    return res.status(400).json({ 
      error: 'Username and password are required' 
    });
  }

  if (!user) {
    return res.status(401).json({ 
      error: 'Username/password combination not found' 
    });
  }

  if (user.password !== password) {
    return res.status(401).json({ 
      error: 'Username/password combination not found' 
    });
  }

  if (user.locked) {
    return res.status(403).json({ 
      error: 'Sorry, this user has been locked out.' 
    });
  }

  res.status(200).json({
    token: user.token,
    user: {
      id: user.id,
      username: user.username
    }
  });
});

// POST - Logout endpoint (Authentication)
app.post('/api/auth/logout', (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
});

// GET - Get all products
app.get('/api/products', (req, res) => {
  res.status(200).json(db.products);
});

// GET - Get product by ID
app.get('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = db.products.find(p => p.id === productId);

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  res.status(200).json(product);
});

app.listen(PORT, () => {
  console.log(`🚀 Mock API Server is running on http://localhost:${PORT}`);
  console.log(`📚 Endpoints available:`);
  console.log(`   - POST http://localhost:${PORT}/api/auth/login`);
  console.log(`   - POST http://localhost:${PORT}/api/auth/logout`);
  console.log(`   - GET  http://localhost:${PORT}/api/products`);
  console.log(`   - GET  http://localhost:${PORT}/api/products/:id`);
});
