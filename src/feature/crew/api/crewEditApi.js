export const getCrewByIdQuery = `
  query getCrewById ($id: uuid!) {
    crew_by_pk(id: $id) {
      id
      name
    }
  }
`;