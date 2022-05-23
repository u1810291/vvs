export const objectPageImagesAPImutation = `mutation MyMutation ($newObjects: objectimages_insert_input!)
    insert_objectimages(objects: [$newObjects]) {
      returning {
        image
        imagename
      }
    }
  }
  `;

export const objectPageImagesMutation = `mutation MyMutation ($image: binary!, $imagename: String!, $Id: Int!) {
  insert_objectimages(objects: {image: $image, imagename: $imagename, Id: $Id}) {
    returning{
      Id
    }
  }
}`;