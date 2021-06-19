const { Router } = require('express');
const homeController = require('../controllers/homeController');
const {isAuthNeededMiddleware} = require('../utils');
const router = Router();

router.get('/', homeController.get.home);
router.post('/search', homeController.post.search);

module.exports = router