const express = require('express');
const authController = require('../controllers/authController');
const reviewController = require('../controllers/reviewController');
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(authController.protect, reviewController.getReviews)
  .post(
    authController.protect,
    authController.restrictTo('user'),
    reviewController.createReview
  );

router
  .route('/:id')
  .patch(reviewController.updateReview)
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    reviewController.deleteReview
  );
module.exports = router;