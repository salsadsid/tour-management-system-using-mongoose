const express = require('express');

const tourController = require('../controllers/tour.controller')

const router = express.Router()
router.route('/trending')
    .get(tourController.trendingTours)
router.route('/cheapest')
    .get(tourController.cheapestTours)

router.route('/')
    .get(tourController.getTours)
    .post(tourController.createTour)

router.route('/:id')
    .get(tourController.getATour)
    .patch(tourController.updateATour)

module.exports = router;