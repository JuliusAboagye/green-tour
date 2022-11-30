const expess = require('express');
const authController = require('../controllers/authController');
const tourController = require('../controllers/tourController');
const reviewController = require('../controllers/reviewController');
const reviewRouter = require('./reviewRoutes');
const router = expess.Router();

router.use('/:tourId/reviews', reviewRouter);
router.route('/tour-stats').get(tourController.getTourStats);
router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

router
  .route('/')
  .post(tourController.createTour)
  .get(authController.protect, tourController.getAllTours);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );

module.exports = router;
