const express = require('express');
const router = express.Router();
const { getApodData } = require('../services/nasaService');

router.get('/', async (req, res, next) => {
    try {
        const { date, start_date, end_date } = req.query;
        const data = await getApodData({ date, start_date, end_date });
        res.json(data);
    } catch (error) {
        next(error);
    }
});

module.exports = router;