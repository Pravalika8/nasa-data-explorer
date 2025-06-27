const express = require('express');
const router = express.Router();
const { getNeoData } = require('../services/nasaService');

router.get('/', async (req, res, next) => {
    try {
        const { start_date, end_date } = req.query;
        const data = await getNeoData({ start_date, end_date });
        res.json(data);
    } catch (error) {
        next(error);
    }
});

module.exports = router;