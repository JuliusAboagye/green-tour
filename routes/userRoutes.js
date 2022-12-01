const expess = require('express');
const router = expess.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.patch('/updateMe', authController.protect, userController.updateMe);
router.delete('/deleteMe', authController.protect, userController.deleteMe);

router.patch(
  '/updateMyPassword',
  authController.protect,
  authController.updatePassword
);

router.route('/').get(userController.getAllUsers);
router
  .route('/:id')
  .patch(userController.updateUser)
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    userController.deleteUser
  );

module.exports = router;
