const expess = require('express');
const authController = require('../controllers/authController');
const tourController = require('../controllers/tourController');
const reviewRouter = require('./reviewRoutes');
const router = expess.Router();

router.use('/:tourId/reviews', reviewRouter);
router
  .route('/tour-stats')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.getTourStats
  );
router
  .route('/top-5-cheap')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.aliasTopTours,
    tourController.getAllTours
  );

router
  .route('/monthly-plan/:year')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide', 'guide'),
    tourController.getMonthlyPlan
  );

router.route('/distances/:latlng/unit/:unit').get(tourController.getDistances);

router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(tourController.getToursWithin);

router
  .route('/')
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.createTour
  )
  .get(tourController.getAllTours);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.updateTour
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );

module.exports = router;
