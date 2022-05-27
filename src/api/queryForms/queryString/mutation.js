export const objectPageImagesAPImutation = `mutation MyMutation ($newObjects: objectimages_insert_input!)
    insert_objectimages(objects: [$newObjects]) {
      returning {
        image
        imagename
      }
    }
  }
  `;

export const objectPageImagesMutation = `mutation MyMutation($imagepath: String!, $imagename: String!, $id: String!, $user: String!) {
  insert_images(objects: {imagepath: $imagepath, imagename: $imagename, id: $id, user: $user}) {
    returning {
      id
      imagename
      imagepath
      user
    }
  }
}`;

export const imagesUpdateMutation = `mutation MyMutation ($imageName: String!, $imagePath: String!, $id: String!, $deleted: String!, authToken: String!) {
  upload(imageName: $imageName, imagePath: $imagePath, id: $id, deleted: $deleted, authToken: $authToken) {
      imageName
      imagePath
      id
      deleted
      authToken
  }
}`;
