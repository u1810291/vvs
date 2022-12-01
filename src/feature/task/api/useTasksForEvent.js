const gql = a => a[0];

export const GQL = gql`
  subscription tasksForEvent($objectId: [uuid!] = [""]) {
    events(order_by: {created_at: desc}) {
      id
      address
      description
      logs(order_by: {created_at: desc_nulls_last}) {
        id
        created_at
        content
        type
      }
      event_type
      latitude
      longitude
      provider_name
      crew {
        id
        status
        name
        latitude
        longitude
        driver_user_id
        device_id
        abbreviation
        user_settings {
          is_online
          id
          last_ping
        }
        permissions(where: {status: {_in: ALLOWED}, request: {is_assigned_while_in_breaks: {_eq: true}}, expires_at: {_is_null: false}}) {
          status
          expires_at
          request {
            duration
            value
          }
        }
      }
      name
      reason
      status
      updated_at
      object {
        id
        address
        city
        contract_no
        description
        contract_object_no
        feedback_from
        feedback_sla_time_in_min
        feedback_until
        is_atm
        is_call_after_inspection
        users (order_by: {priority: asc_nulls_last}) {
          first_name
          last_name
          middle_name
          phone
          priority
          user_id
        }
        is_crew_autoasigned
        latitude
        longitude
        name
        phone
        keys {
          key {
            crew_id
          }
        }
        modems {
          area_no
        }
        provider_name
      }
    }
  }
`;
