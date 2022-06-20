import {apiQuery} from 'api';

const LOGIN_QUERY = `
  query Login($password: String!, $username: String!) {
    login(password: $password, username: $username) {
      token
      refreshToken
      user {
        id
      }
    }
  }
`;

const login = ({username, password}) => apiQuery({username, password})(LOGIN_QUERY)

export default login;
