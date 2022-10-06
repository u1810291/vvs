const ENV = {
  API_ENDPOINT: process.env.REACT_APP_BACKEND_URL,
  API_SECRET: process.env.REACT_APP_BACKEND_SECRET,

  GOOGLE_MAPS_API_KEY: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
  IS_DEV: ['true', 1, '1', 't', 'yes', 'y'].includes(process.env.REACT_APP_IS_DEV.toLowerCase()),

  QUERY_PROTOCOL: process.env.REACT_APP_QUERY_PROTOCOL,
  SUBSCRIPTION_PROTOCOL: process.env.REACT_APP_SUBSCRIPTION_PROTOCOL,
};

export default ENV;
