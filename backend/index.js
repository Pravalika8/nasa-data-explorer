const express = require('express');
const cors = require('cors');
require('dotenv').config();
const logger = require('./logs/logger');
const apodRoute = require('./routes/apod');
const neoRoute = require('./routes/neo')
const mediaRoute = require('./routes/media');
const epicRoute = require('./routes/epic');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use('/apod', apodRoute);
app.use('/neo', neoRoute);
app.use('/media', mediaRoute);
app.use('/epic', epicRoute);

app.use(errorHandler);

if(process.env.NODE_ENV !=='test'){
    app.listen(PORT, () => {
        logger.info(`Server is running on http://localhost:${PORT}`);
    });
}

module.exports = app;