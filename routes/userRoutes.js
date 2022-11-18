const expess = require('express');
const router = expess.Router();
const authController = require('../controllers/authController');

router.post('/signup', authController.signup);

module.exports = router;
