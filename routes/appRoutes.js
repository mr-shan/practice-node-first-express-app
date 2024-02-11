const express = require('express');

const appController = require('./../controllers/app');

const router = express.Router();

// route for home etc.
router.get('', appController.getHome)

// route for 404
router.use(appController.get404)

module.exports = router;