
const BASE_URL = process.env.REACT_APP_BACKEND_API;

const getApod = async ({ startDate, endDate }) => {
  let url = `${BASE_URL}/apod`;

  if (startDate && endDate) {
    url += `?start_date=${startDate}&end_date=${endDate}`;
  } else if (startDate) {
    url += `?date=${startDate}`;
  }
  const response = await fetch(url);
  console.log('apod resonpse', response)
  if (!response.ok) {
    throw new Error('API error');
  }
  return await response.json();
};

const getNeo = async ({ startDate, endDate }) => {
  let url = `${BASE_URL}/neo`;
  if (startDate && endDate) {
    url += `?start_date=${startDate}&end_date=${endDate}`;
  } else if (startDate) {
    url += `?start_date=${startDate}`;
  }
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('API error');
  }
  return await response.json();
}

const getMedia = async (searchText, mediaType) => {
  let url = `${BASE_URL}/media?searchText=${searchText}`;
  if (mediaType) {
    url += `&media_type=${mediaType}`;
  }
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Api Error');
  }
  return await response.json();
}

const getEpic = async (date) => {
  let url = `${BASE_URL}/epic`;
  if (date) {
    url += `?date=${date}`
  }
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Api Error');
  }
  return await response.json();
}

const apis = {
  getApod,
  getNeo,
  getMedia,
  getEpic
}

export default apis;