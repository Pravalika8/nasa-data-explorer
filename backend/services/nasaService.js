const axios = require('axios');
const logger = require('../logs/logger');
// const { log } = require('winston');

const NASA_PUBLIC_API = process.env.NASA_PUBLIC_API;
const NASA_API_KEY = process.env.NASA_API_KEY;
const NASA_APOD_URL = `${NASA_PUBLIC_API}/planetary/apod`;
const NASA_IMAGE_API = process.env.NASA_IMAGE_API;

const getApodData = async ({ date, start_date, end_date }) => {
  try {
    let url = `${NASA_APOD_URL}?api_key=${NASA_API_KEY}`;
    if (date) {
      url += `&date=${date}`;
    } else if (start_date && end_date) {
      url += `&start_date=${start_date}&end_date=${end_date}`;
    }
    logger.info(`Nasa apod url: ${url}`);
    return await axios.get(url).then(response => sendResponse(200, response.data)).catch(error => {
      return handleError(error);
    });
  } catch (error) {
    logger.error(`NASA APOD API ERROR: ${error}`);
    return handleError(error);
  }
};

const getNeoData = async ({ start_date, end_date }) => {
  try {
    let url = `${NASA_PUBLIC_API}/neo/rest/v1/feed?api_key=${NASA_API_KEY}`;
    if (start_date && end_date) {
      url += `&start_date=${start_date}&end_date=${end_date}`
    } else if (start_date) {
      url += `&start_date=${end_date}`;
    }
    logger.info('Nasa neo url: ', url);
    return await axios.get(url).then(response => sendResponse(200, response.data)).catch(error => {
      return handleError(error);
    });

  } catch (error) {
    logger.error(`NASA NEO API ERROR: ${error}`);
    return handleError(error);
  }
};

const getMediaData = async ({ searchText, mediaType }) => {
  try {
    let url = `${NASA_IMAGE_API}/search?`;
    if (searchText) {
      url += `q=${searchText}`;
    }
    if (mediaType) {
      url += `&mediaType=${mediaType}`;
    }
    logger.info('Nasa media url', url);
    return await axios.get(url).then(response => sendResponse(200, response.data)).catch(error => {
      return handleError(error);
    });

  } catch (error) {
    logger.error(`NASA MEDIA API ERROR: ${error}`);
    return handleError(error);
  }
}

const getEpicData = async (date) => {
  try {
    const url = date
      ? `${NASA_PUBLIC_API}/EPIC/api/natural/date/${date}?api_key=${NASA_API_KEY}`
      : `${NASA_PUBLIC_API}/EPIC/api/natural?api_key=${NASA_API_KEY}`;
    logger.info('Nasa epic url', url);
    return await axios.get(url).then(response => sendResponse(200, response.data)).catch(error => {
      return handleError(error);
    });
  } catch (error) {
    logger.error(`NASA EPIC API ERROR: ${error}`);
    return handleError(error);
  }
}

const handleError = (error) => {
  logger.error(error);
  if (error.response) {
    return sendResponse(error.response.status, undefined)
  }
  return sendResponse(500, undefined);
}

const sendResponse = (status, data) => {
  if (status === 200) {
    return { status: 'SUCCESS', data: data, message: 'data recieved successfully' }
  } else if (status === 400) {
    return { status: 'ERROR', message: 'Invalid Search!' }
  } else if (status === 429) {
    return { status: 'ERROR', message: 'too many requests at the moment. Please try again later.' }
  } else {
    return { status: ERROR, message: 'Unable to server request' }
  }
}

module.exports = {
  getApodData,
  getNeoData,
  getMediaData,
  getEpicData,
};