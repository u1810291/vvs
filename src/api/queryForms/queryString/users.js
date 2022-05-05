export const getUsers = `query users($queryString: String!) {
    users(queryString: $queryString) {
      users
    }
    }
  `;
