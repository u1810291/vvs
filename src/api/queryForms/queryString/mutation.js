export const deleteImageURI = `mutation MyMutation ($imagepath: String!) {
  delete_monas_images_related(where: {imagepath: {_eq: $imagepath}}) {
    affected_rows
  }
}`;

export const uploadImageURI = `mutation MyMutation ($updateURI: [monas_images_related_insert_input!]!) {
  insert_monas_images_related(objects: $updateURI) {
    returning {
      id
      imagename
      imagepath
      user
    }
  }
}
`;

export const imageUpload = `mutation MyMutation ($namespace: String, $path: String!, $base64: String!) {
  storeFile(namespace: $namespace, path: $path, base64: $base64) {
      uri
  }
}`;

// , on_conflict: { constraint: monas_events_related_pkey ,update_columns: [id, crew, endTime, startTime, position, weekDay] }
export const updateCalendar = `mutation MyMutation ($updateCalendar: [monas_calendar_related_insert_input!]!) {
  insert_monas_calendar_related(objects: $updateCalendar) {
    returning {
      id
      crew
      endTime
      startTime
      position
      weekDay
    }
  }
}
`;

// , on_conflict: { constraint: filters_pkey ,update_columns: [Id, id, userId, filterName, filterShortName, savedToFavorite, savedToMenu, date, objectAddress, operator, object, type, group, status, reason, crew, driver, inTime, dashboardList] }
export const addFilters = `mutation MyMutation ($updateAddFilter: [filters_insert_input!]!) {
  insert_filters(objects: $updateAddFilter, on_conflict: { constraint: filters_pkey ,update_columns: [Id, id, userId, filterName, filterShortName, savedToFavorite, savedToMenu, date, objectAddress, operator, object, type, group, status, reason, crew, driver, inTime, dashboardList] }) {
    returning {
      Id
      id
      userId
      filterName
      filterShortName
      savedToFavorite
      savedToMenu
      date
      objectAddress
      operator
      object
      type
      group
      status
      reason
      crew
      driver
      inTime
      dashboardList
    }
  }
}
`;