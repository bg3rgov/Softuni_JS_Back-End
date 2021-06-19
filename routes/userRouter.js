const { Router } = require('express');
const userController = require('../controllers/userController');
const {registerMiddlewareValidator, loginMiddlewareValidator, isAuthNeededMiddleware} = require('../utils');
const router = Router();

router.get('/register', isAuthNeededMiddleware(false), userController.get.register);
router.get('/login', isAuthNeededMiddleware(false), userController.get.login);
router.get('/logout', isAuthNeededMiddleware(), userController.get.logout);

router.post('/register', isAuthNeededMiddleware(false), registerMiddlewareValidator, userController.post.register);
router.post('/login', isAuthNeededMiddleware(false), loginMiddlewareValidator, userController.post.login);

module.exports = router;