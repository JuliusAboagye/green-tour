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
    reviewController.setTourAndUserId,
    reviewController.createReview
  );

router
  .route('/:id')
  .get(authController.protect, reviewController.getReview)
  .patch(reviewController.updateReview)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'user'),
    reviewController.deleteReview
  );
module.exports = router;
