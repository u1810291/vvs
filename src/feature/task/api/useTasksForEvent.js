const gql = a => a[0];

export const GQL = gql`
  subscription tasksForEvent($objectId: [uuid!] = [""]) {
    events(order_by: { status: asc }) {
      id
      address
      description
      event_type
      latitude
      longitude
      name
      reason
      status
      provider_name
      object {
        address
        city
        description
        latitude
        longitude
        name
        phone
      }
      updated_at
      provider_id
    }
  }
`;
