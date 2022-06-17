const stage = {
  fusionAuth: {
    BASEURL: 'http://localhost:9011',
    // Application ID from FusionAuth
    APPLICATION_ID: '10e4d908-7655-44af-abf0-1a031aff519a',
  },
  apiServer: {
    // API Server URL: http://localhost:5000
    BASEURL: 'http://localhost:5000',
  },
  app: {
    // Name for the 2Factor application: FusionAuth
    TWO_FA_NAME: 'fusionAuthDemoApp',
  },
  // OAuth info (copied from the FusionAuth admin panel)
  clientID: '85a03867-dccf-4882-adde-1a79aeec50df',
  clientSecret: 'JNlTw3c9B5NrVhF-cz3m0fp_YiBg-70hcDoiQ2Ot30I',
  redirectURI: 'http://localhost:9000/oauth-callback',
  applicationID: '85a03867-dccf-4882-adde-1a79aeec50df',
  // our FusionAuth api key
  apiKey: 'o9WngMh2AAp3zH7gvMYtML9sGG31A9xVY1bi3Oui-_Y',

  // ports
  clientPort: 8080,
  serverPort: 9000,
  fusionAuthPort: 9011,
};

const prod = {
  fusionAuth: {
    BASEURL: 'http://localhost:9011',
    // Application ID from FusionAuth
    APPLICATION_ID: '10e4d908-7655-44af-abf0-1a031aff519a',
  },
  apiServer: {
    // API Server URL: http://localhost:5000
    BASEURL: 'http://localhost:5000',
  },
  app: {
    // Name for the 2Factor application: FusionAuth
    TWO_FA_NAME: 'fusionAuthDemoApp',
  },
  // OAuth info (copied from the FusionAuth admin panel)
  clientID: '85a03867-dccf-4882-adde-1a79aeec50df',
  clientSecret: 'JNlTw3c9B5NrVhF-cz3m0fp_YiBg-70hcDoiQ2Ot30I',
  redirectURI: 'http://localhost:9000/oauth-callback',
  applicationID: '85a03867-dccf-4882-adde-1a79aeec50df',
  // our FusionAuth api key
  apiKey: 'o9WngMh2AAp3zH7gvMYtML9sGG31A9xVY1bi3Oui-_Y',

  // ports
  clientPort: 8080,
  serverPort: 9000,
  fusionAuthPort: 9011,
};

const dev = {};

const config =
  process.env.REACT_APP_STAGE === 'DEV'
    ? dev
    : process.env.REACT_APP_STAGE === 'STAGE'
    ? stage
    : prod;

export default {
  ...config,
};
