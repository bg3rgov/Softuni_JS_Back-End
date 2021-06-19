const { Router } = require('express');
const courseController = require('../controllers/courseController');
const {isAuthNeededMiddleware, courseMiddlewareValidator} = require('../utils');
const router = Router();

router.get('/create', isAuthNeededMiddleware(),  courseController.get.create);
router.get('/details/:id', isAuthNeededMiddleware(), courseController.get.details);
router.get('/delete/:id', isAuthNeededMiddleware(), courseController.get.delete);
router.get('/edit/:id', isAuthNeededMiddleware(), courseController.get.edit);
router.get('/enroll/:id', isAuthNeededMiddleware(), courseController.get.enroll);

router.post('/create', isAuthNeededMiddleware(), courseMiddlewareValidator, courseController.post.create);
router.post('/edit/:id', isAuthNeededMiddleware(), courseController.post.edit);
module.exports = router