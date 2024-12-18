const express = require('express');
const cors = require('cors'); // Import cors module
const app = express();
const PORT = 5000;

// Enable CORS for all origins (can be restricted to frontend URL later)
app.use(cors());

app.use(express.json()); // Parse JSON bodies

let reviews = []; // Temporary in-memory storage for reviews

// POST endpoint for adding reviews
app.post('/api/reviews', (req, res) => {
  const { rating, comment } = req.body;

  if (!rating || !comment) {
    return res.status(400).json({ error: 'Rating and comment are required.' });
  }

  const newReview = { id: reviews.length + 1, rating, comment };
  reviews.push(newReview);

  return res.status(201).json(newReview);
});

// GET endpoint to fetch all reviews
app.get('/api/reviews', (req, res) => {
  return res.json(reviews);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
