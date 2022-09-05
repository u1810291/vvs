import env from 'env';
import raw from 'raw.macro';

import {t} from 'i18n';

import {createUseList} from 'api/buildApiHook';

import Async from 'crocks/Async';
import maybeToAsync from 'crocks/Async/maybeToAsync';

import {fetchGql} from '@s-e/frontend/fetch';
import {caseMap} from '@s-e/frontend/flow-control';

import {lengthGt} from 'util/pred';

import {safe, getProp, getPath} from 'crocks';
import {pipe, tap} from 'crocks/helpers';
import {not, ifElse} from 'crocks/logic';
import {chain, map, option} from 'crocks/pointfree';
import {isString, isEmpty} from 'crocks/predicates';

const {Rejected} = Async;

const createEventQuery = `
  mutation insertEvent($name: String!, $description: String!, $status: String!, $crewID: uuid!, $objectID: Int!) {
    insert_events(objects: {name: $name, description: $description, status: $status, crew_id: $crewID, object_id: $objectID}) {
      returning {
        id
      }
    }
  }
`;

const getObjectsQuery = `
  query getObjects {
    object {
      address
      id
    }
  }
`;

const getCrewsQuery = `
  query getCrews {
    crew {
      id
      name
    }
  }
`;

export const ERROR = {
  UNHANDLED: t('error.newEvent.eventServiceOffline'),
  SERVICE_DOWN: t('error.newEvent.dataIsInvalid'),
  NETWORK_FAILED: t('error.newEvent.unhandledState'),
};

const responseHandling = {
  serviceDown: {
    check: pipe(
      getPath(['errors', 0, 'message']),
      chain(safe(isString)),
      chain(safe(m => m.match(/http.*exception.*webhook/im))),
      map(lengthGt(0)),
      option(false),
    ),
    output: () => Rejected(ERROR.SERVICE_DOWN),
  },
  networkError: {
    check: pipe(
      getProp('message'),
      chain(safe(isString)),
      chain(safe(m => m.match(/network.*failed/im))),
      map(() => true),
      option(false),
    ),
    output: () => Rejected(ERROR.NETWORK_FAILED),
  },
  onUnknownState: pipe(tap(console.error), () => Rejected(ERROR.UNHANDLED)),
};

export const asyncGetCrews = token => {
  return fetchGql(
    env.API_ENDPOINT,
    {'x-hasura-admin-secret': env.API_SECRET, 'authorization': token},
    getCrewsQuery,
    null
  );
};

export const asyncGetObjects = token => {
  return fetchGql(
    env.API_ENDPOINT,
    {'x-hasura-admin-secret': env.API_SECRET, 'authorization': token},
    getObjectsQuery,
    null
  );
};

export const asyncCreateEvent = ({token, name, description, status, crewID, objectID}) => {
  return fetchGql(
    env.API_ENDPOINT,
    {'x-hasura-admin-secret': env.API_SECRET, 'authorization': token},
    createEventQuery,
    {name, description, status, crewID, objectID}
  ).bichain(
    caseMap(responseHandling.onUnknownState,[[responseHandling.networkError.check, responseHandling.networkError.output]]),
    caseMap(responseHandling.onUnknownState, [[responseHandling.serviceDown.check, responseHandling.serviceDown.output]]),
  );
};

export const useObjectsDropdown = createUseList({
  graphQl: raw('./graphql/GetAllObjects.graphql'),
  asyncMapFromApi: pipe(
    maybeToAsync('object prop was expected', getProp('object')),
    map(ifElse(isEmpty, () => [], map(a => ({value: a.id, name: a.name})))),
    safe(not(isEmpty)),
    option([])
  )
});
