const expess = require('express');
const router = expess.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.route('/').get(userController.getAllUsers);

module.exports = router;
