const express = require('express');
const Review = require('../models/Review');
const router = express.Router();

// Get all approved reviews
router.get('/', async (req, res) => {
  const reviews = await Review.find({ approved: true });
  res.json(reviews);
});

// Submit a new review
router.post('/', async (req, res) => {
  const { username, rating, comment } = req.body;
  const review = new Review({ username, rating, comment });
  await review.save();
  res.status(201).json({ message: 'Review submitted!' });
});

// Approve or delete reviews (Admin actions)
router.put('/:id/approve', async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (review) {
    review.approved = true;
    await review.save();
    res.json({ message: 'Review approved!' });
  } else {
    res.status(404).json({ message: 'Review not found!' });
  }
});

router.delete('/:id', async (req, res) => {
  await Review.findByIdAndDelete(req.params.id);
  res.json({ message: 'Review deleted!' });
});

module.exports = router;
