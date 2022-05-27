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
  }
  corresppersons {
    phone
    name
  }
  objectimages {
    Id
    image
    imagename
  }
  monas_related {
    id
    atm
    contact
    assign_car
  }
  events {
    receivedtime
    status
  }
  images {
    id
    imagename
    imagepath
  }
}`

export const imagesUpdate = `query uploadImage($image: String!, $id: String!, $authToken: String!) {
  uploadImages(image: $image, id: $id, authToken: $authToken) {
    image
    id
    authToken
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