const express = require('express');
const router = express.Router();
const { getEpicData, } = require('../services/nasaService');

router.get('/', async (req, res, next) => {
    try {
        const { date } = req.query;
        const data = await getEpicData(date);
        res.json(data);
    } catch (error) {
        next(error);
    }
});

module.exports = router;