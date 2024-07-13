const express = require('express');
const Controller = require('../controller/controller');

const router = express.Router();

router.get('/dishes', Controller.getAllDishes);
router.post('/dishes', Controller.addDish);
router.put('/dishes/:dishId', Controller.updateDish);
router.put('/dishes/:dishId', Controller.togglePublishStatus);

module.exports = router;

