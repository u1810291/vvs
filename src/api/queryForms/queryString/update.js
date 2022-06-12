// export const objectPageImagesUpdate = `mutation MyMutation($imagepath: String!, $imagename: String!, $user: String!) {
//     update_images(objects: {imagepath: $imagepath, imagename: $imagename, user: $user}) {
//       returning {
//         imagename
//         imagepath
//         user
//       }
//     }
//   }`;

  export const objectPageImagesUpdate = `mutation MyMutation($imagepath: String!, $imagename: String!) {
    update_images(where: { imagepath: { _eq: $imagepath}}, _set: { imagename: $imagename } ) {
        affected_rows
    }
  }`;


// example of mutation
  export const objectPageImagesMutation = `mutation MyMutation($image: String!, $imagename: String!) {
    insert_monas_related(objects: {image: $image, imagename: $imagename }) {
      returning {
        id
        imagename
        imagepath
        user
      }
    }
  }`;