const gql = a => a[0];

export const GQL = gql`
  subscription permissionsForDashboard {
    crew_permission(where: {status: {_eq: ASKED}}, order_by: {created_at: desc}) {
      id
      created_at
      updated_at
      crew_id
      crew {
        id
        name
        driver_user_id
      }
      request_id
      status
    }
  }
`;

export default GQL;