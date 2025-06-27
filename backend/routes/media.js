const express = require('express');
const router = express.Router();
const { getMediaData, } = require('../services/nasaService');

router.get('/', async (req, res, next) => {
    try {
        const { searchText, mediaType, } = req.query;
        const data = await getMediaData({ searchText, mediaType });
        res.json(data);
    } catch (error) {
        next(error);
    }
});

module.exports = router;