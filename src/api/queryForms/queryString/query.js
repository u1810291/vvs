export const objectPage = `query MyQuery {
  objects {
    name
    address
    phone
    city
    street
    contract
    notes
    objectstate
    objectstatus
    objectid
    obdindx
    receivernr
    Id
    name
  }
  corresppersons {
    phone
    name
  }
  monas_images_related {
    Id
    id
    imagepath
    imagename
  }
  monas_related {
    Id
    atm
    contact
    assign_car
    modem
    area_no
    monasid
    navid
  }
  crews {
    Id
    name
    abbreviation
    dislocationZone
    status
    is_assigned_automatically
    id
    phone_number
    driver_name
  }
  events {
    id
    monas_id
    updated_at
  }
  filters {
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
}`;

export const imagesUpdate = `query uploadImage($image: String!, $id: String!, $authToken: String!) {
  uploadImages(image: $image, id: $id, authToken: $authToken) {
    image
    id
    authToken
  }
}`;

export const modemsPage = `query MyQuery {
  objects {
    name
    address
    phone
    city
    street
    contract
    notes
    objectstate
    objectstatus
    objectid
    obdindx
    receivernr
    Id
  }
  corresppersons {
    phone
    name
  }
  monas_related {
    id
    atm
    contact
    assign_car
    modem
    area_no
  }
}`;
// export const imagesUpdate = `query uploadImage($imageName: String!, $imagePath: String!, $id: String!, $deleted: String!, $authToken: String!) {
//   uploadImages(imageName: $imageName, imagePath: $imagePath, id: $id, deleted: $deleted, authToken: $authToken) {
//     imageName
//     imagePath
//     id
//     deleted
//     authToken
//   }
// }`;

export const getUsers = `query users($queryString: String!) {
  users(queryString: $queryString) {
    users
  }
  }
`;

export const updateRegister = `query updateRegisterQuery($userId: String!, $roles: String!) {
  updateRegister(userId: $userId, roles: $roles) {
    userId
    roles
  }
}`;
