import {useContext} from "react";
import AuthContext from "../../../context/authContext";
import env from "../../../env";
import Async from "crocks/Async";
import maybeToAsync from "crocks/Async/maybeToAsync";
import {fetchGql} from "@s-e/frontend/fetch";
import {caseMap} from "@s-e/frontend/flow-control";
import {lengthGt} from "../../../util/pred";
import {getProp, tap, pipe, chain, safe, option, map, isString, getPath, hasProps} from "crocks";
import {t} from "../../../i18n";

const {Rejected} = Async;

const createEventQuery = `
  mutation instertEvent($name: String!, $desctiption: String!, $status: String!, $crewID: uuid!, $objectID: Int!) {
    insert_events(objects: {name: $name, description: $desctiption, status: $status, crew_id: $crewID, object_id: $objectID}) {
      returning {
        id
      }
    }
  }
`;

const getObjectsQuery = `
  query getObjects {
    objects {
      address
      Id
    }
  }
`;

const getCrewsQuery = `
  query getCrews {
    crews {
      Id
      abbreviation
    }
  }
`;

export const ERROR = {
  UNHANDLED: t("error.newEvent.eventServiceOffline"),
  SERVICE_DOWN: t("error.newEvent.dataIsInvalid"),
  INVALID: t("error.newEvent.networkError"),
  UNEXPECTED_OK_RESPONSE: t("error.newEvent.unexpectedResponse"),
  NETWORK_FAILED: t("error.newEvent.unhandledState"),
};

const responseHandling = {
  invalidCreds: {
    check: pipe(
      getPath(["errors", 0, "message"]),
      chain(safe(isString)),
      chain(safe(m => m.match(/not.*valid.*response.*hook/im))),
      map(lengthGt(0)),
      option(false),
    ),
    output: () => Rejected(ERROR.INVALID),
  },
  validCreds: {
    check: pipe(
      getPath(["data", "login"]),
      map(hasProps(["token", "refreshToken", "user"])),
      option(false),
    ),
    output: maybeToAsync(
      ERROR.UNEXPECTED_OK_RESPONSE,
      getPath(["data", "login"]),
    ),
  },
  serviceDown: {
    check: pipe(
      getPath(["errors", 0, "message"]),
      chain(safe(isString)),
      chain(safe(m => m.match(/http.*exception.*webhook/im))),
      map(lengthGt(0)),
      option(false),
    ),
    output: () => Rejected(ERROR.SERVICE_DOWN),
  },
  networkError: {
    check: pipe(
      getProp("message"),
      chain(safe(isString)),
      chain(safe(m => m.match(/network.*failed/im))),
      map(() => true),
      option(false),
    ),
    output: () => Rejected(ERROR.NETWORK_FAILED),
  },
  onUnknownState: pipe(tap(console.error), () => Rejected(ERROR.UNHANDLED)),
};

export const asyncGetCrews = (secret, token) => {
  return fetchGql(
    env.API_ENDPOINT,
    {
      "x-hasura-admin-secret": secret,
      "authorization": token
    },
    getCrewsQuery,
    null
  );
};

export const asyncGetObjects = (secret, token) => {
  return fetchGql(
    env.API_ENDPOINT,
    {
      "x-hasura-admin-secret": secret,
      "authorization": token
    },
    getObjectsQuery,
    null
  );
};

export const asyncCreateEvent = ({secret, token, name, desctiption, status, crewID, objectID}) => {
  return fetchGql(
    env.API_ENDPOINT,
    {"x-hasura-admin-secret": secret, "authorization": token},
    createEventQuery,
    {name, desctiption, status, crewID, objectID}
  ).bichain(
    caseMap(responseHandling.onUnknownState, [
      [
        responseHandling.networkError.check,
        responseHandling.networkError.output,
      ],
    ]),
    caseMap(responseHandling.onUnknownState, [
      [responseHandling.serviceDown.check, responseHandling.serviceDown.output],
      [
        responseHandling.invalidCreds.check,
        responseHandling.invalidCreds.output,
      ],
      [responseHandling.validCreds.check, responseHandling.validCreds.output],
    ]),
  );
};
