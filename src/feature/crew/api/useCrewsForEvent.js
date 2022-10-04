const gql = a => a[0];

export const GQL = gql`
  subscription crewsForEvent($objectId: [uuid!] = [""]) {
  crew(order_by: [
      {status: desc_nulls_last},
      {permissions_aggregate: {count: asc_nulls_first}},
      {event_aggregate: {count: asc_nulls_first}},
      {name: asc_nulls_last},
      {abbreviation: asc_nulls_last},
    ]) {
      id
      status
      name
      latitude
      longitude
      driver_user_id
      device_id
      abbreviation
      status
      user_settings {
        is_online
        id
        last_ping
      }
      permissions(where: {status: {_in: ALLOWED}, request: {is_assigned_while_in_breaks: {_eq: true}}, time_left: {_gte: "0"}}) {
        status
        expires_at
        request {
          duration
          value
        }
      }
      object_key_boxes(where: {keys: {object: {id: {_in: $objectId}}}}) {
        id
      }
    }
  }
`;
