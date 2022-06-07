export const deleteImageURI = `mutation MyMutation ($deleteURI: [monas_images_related_insert_input!]!) {
  delete_monas_images_related(where: {imagepath: {_eq: $deleteURI}})
}`;

// export const deleteImageURI = `mutation MyMutation ($deleteURI: [monas_images_related_insert_input!]!) {
//   insert_monas_images_related(objects: $deleteURI, on_conflict: { constraint: images_pkey ,update_columns: [Id, imagename, imagepath, id] }) {
//     returning {
//       id
//     }
//   }
// }
// `;

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

export const imageUpload = `mutation MyMutation ($namespace: String!, $path: String!, $base64: String!) {
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