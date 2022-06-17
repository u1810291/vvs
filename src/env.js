const ENV = {
  API_ENDPOINT: process.env.REACT_APP_BACKEND_URL,
  GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
  IS_DEV: ['true', 1, '1', 't', 'yes', 'y'].includes(process.env.REACT_APP_IS_DEV.toLowerCase()),
  API_SECRET: process.env.REACT_APP_BACKEND_SECRET,
};

export default ENV;
