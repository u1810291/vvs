export const getUsers = `query users($queryString: String!) {
    users(queryString: $queryString) {
      users
    }
    }
  `;

export const archive = `query delete($userId: String!) {
  delete(userId: $userId) {
    userId
  }
}`;