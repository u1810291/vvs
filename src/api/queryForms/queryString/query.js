export const objectPage = `query MyQuery {
  object {
    id
    address
    latitude
    longitude
    name
    phone
    provider_object {
      AcLossDetected
      DcLossDetected
      Id
      Locked
      MainSubDisabled
      MainSubDriverReactionTimes
      MainSubGenerated
      MainSubEvents
      MainSubId
      MainSubInfo
      MainSubMoreNotes
      groupid
      grg_info
      generatedeventsexample
      fridayopenmin
      fridayopenhour
      fridayclosemin
      fridayclosehour
      freeEvents
      firsttest
      dynamic
      destination
      contract2
      contract
      closemindefault
      closehourdefault
      closedeviationneg
      closedeviation
      city
      celebrationsopenmin
      celebrationsopenhour
      celebrationsclosemin
      celebrationsclosehour
      assignedgroupableeventexampleid
      assignedeventexampleid
      address
      TS
      OpenCloseSeekState
      NotesText
      MainSubTest
      MainSubSchemes
      MainSubPersons
      MainSubZones
      MainSubOpenClose
      wednesdayopenmin
      wednesdayopenhour
      wednesdayclosemin
      wednesdayclosehour
      usegroupableeventsexample
      useeventexample
      uniqueID
      unifier_id
      tuesdayopenmin
      tuesdayopenhour
      tuesdayclosemin
      tuesdayclosehour
      transinstdate
      tolerance
      timestamp
      timesperday
      timebetweentesttime
      timebetweentestdays
      thursdayopenmin
      thursdayopenhour
      thursdayclosemin
      thursdayclosehour
      testtype
      synchronize
      sundayopenmin
      sundayopenhour
      sundayclosemin
      sundayclosehour
      subgroup
      subdivision
      street
      specialwednesday
      specialtuesday
      specialthursday
      specialsunday
      specialsaturday
      specialmonday
      specialfriday
      specialcelebrations
      seekwednesdayopen
    }
    provider_id
    provider_name
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
    corresppersons {
    phone
    name
  }
  images {
    imagepath
    imagename
    id
    Id
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

// export const objectPage = `query MyQuery {
//   objects {
//     name
//     address
//     phone
//     city
//     street
//     contract
//     notes
//     objectstate
//     objectstatus
//     objectid
//     obdindx
//     receivernr
//     Id
//     name
//   }
//   monas_images_related {
//     Id
//     id
//     imagepath
//     imagename
//   }
//   monas_related {
//     Id
//     atm
//     contact
//     assign_car
//     modem
//     area_no
//     monasid
//     navid
//   }
//   crews {
//     Id
//     name
//     abbreviation
//     dislocationZone
//     status
//     is_assigned_automatically
//     id
//     phone_number
//     driver_name
//   }
//   events {
//     id
//     monas_id
//     updated_at
//   }
// }`;

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

// %searchvalue% {Id: {_eq: $id}, _and: }
export const searchAddress = `query SearchAddress ($address: String!) {
  objects(where: {address: {_like: $address}}) {
    AcLossDetected
    DcLossDetected
    MainSubId
    NotesText
    OpenCloseSeekState
    TS
    address
    assignedeventexampleid
    assignedgroupableeventexampleid
    city
    contract
    contract2
    freeEvents
    generatedeventsexample
    grg_info
    installed
    installer
    installerCompany
    intlinenr
    intreceivernr
    lastPersonToOpenClose
    lasttesttime
    latitude
    longitude
    name
    notes
    obdindx
    phone
    region
    relationId
    street
    subdivision
    transinstdate
    unifier_id
  }
}`;