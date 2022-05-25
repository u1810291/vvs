export const getUsers = `query users($queryString: String!) {
    users(queryString: $queryString) {
      users
    }
    }
  `;

export const archiveDriver = `query delete($userId: String!) {
  delete(userId: $userId) {
    userId
  }
}`;

export const archiveClient = `query delete($userId: String!, $hardDelete: Boolean) {
  delete(userId: $userId, hardDelete: $hardDelete) {
    users
  }
}`;