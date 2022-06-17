export const crewsQuery = `query MyQuery {
  crew {
    abbreviation
    dislocationZone
    driver_name
    is_assigned_automatically
    id
    name
    phone_number
    status
  }
}`;

export const objectsQuery = `query MyQuery {
  object {
    address
    city
    contract_no
    contract_object_no
    id
    is_atm
    latitude
    longitude
    provider_name
    provider_id
    phone
    name
    navision_id
    users {
      object_id
      user_id
      user_type
      is_subscribed_yesterdays_report
    }
    provider_object {
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
    modems {
      object_id
      id
      central
      area_no
    }
    keys {
      id
      key_id
      object_id
      object {
        address
        provider_name
        provider_id
        phone
        navision_id
        name
        longitude
        latitude
        is_atm
        id
        contract_object_no
        contract_no
        city
        users {
          user_type
          user_id
          object_id
          is_subscribed_yesterdays_report
        }
        provider_object {
          AcLossDetected
          DcLossDetected
          Id
          Locked
          MainSubDisabled
          MainSubDriverReactionTimes
          MainSubEvents
          MainSubGenerated
          MainSubId
          MainSubMoreNotes
          MainSubInfo
          MainSubOpenClose
          MainSubPersons
          MainSubSchemes
          MainSubTest
          MainSubZones
          NotesText
          OpenCloseSeekState
          TS
          address
          assignedeventexampleid
          assignedgroupableeventexampleid
          celebrationsclosehour
          celebrationsclosemin
          celebrationsopenhour
          celebrationsopenmin
          city
          closedeviation
          closedeviationneg
          closehourdefault
          closemindefault
          contract
          contract2
          destination
          dynamic
          firsttest
          freeEvents
          fridayclosehour
          fridayclosemin
          fridayopenhour
          fridayopenmin
          generatedeventsexample
          grg_info
          groupid
          installed
          installer
          installerCompany
          intlinenr
          intreceivernr
          lastPersonToOpenClose
          lasttesttime
          latitude
          linenr
          longitude
          mainsubgroup
          mondayclosehour
          mondayclosemin
          mondayopenhour
          mondayopenmin
          mustopen
          name
          notes
          obdindx
          objectid
          objectstate
          objectstatus
          opendeviation
          opendeviationneg
          openhourdefault
          openmindefault
          otherevents
          phone
          reacttoeachevent
          receivernr
          region
          relationId
          saturdayclosehour
          saturdayclosemin
          saturdayopenhour
          saturdayopenmin
          seekcelebrationsclose
          seekcelebrationsopen
          seekcloseworktime
          seekfridayclose
          seekfridayopen
          seekmondayclose
          seekmondayopen
          seekopenworktime
          seeksaturdayclose
          seeksaturdayopen
          seeksundayclose
          seeksundayopen
          seekthursdayclose
          seekthursdayopen
          seektuesdayclose
          seektuesdayopen
          seekwednesdayclose
          seekwednesdayopen
          specialfriday
          specialcelebrations
          specialmonday
          specialsaturday
          specialsunday
          specialthursday
          specialtuesday
          specialwednesday
          wednesdayopenmin
          wednesdayopenhour
          wednesdayclosemin
          wednesdayclosehour
          usegroupableeventsexample
          useeventexample
          uniqueID
          unifier_id
          tuesdayopenmin
          tuesdayclosemin
          tuesdayopenhour
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
        }
      }
    }
  }
}
`
// old query reference to check necessary fields
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
export const crewZonesQuery = `query My_query {
  crew_zone {
    id
    name
    nodes
    crew_id
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