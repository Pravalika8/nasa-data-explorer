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


const allowedOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:3000';
app.use(cors({
  origin: allowedOrigin
}));
app.get('healthz', (req, res) => {
  res.json({ message: 'Pong from NASA backend' });
});
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
