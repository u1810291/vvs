const gql = a => a[0];

export const GQL = gql`
  subscription dislocationZones {
    crew_zone {
      id
      name
      nodes      
    }
  }
`;
