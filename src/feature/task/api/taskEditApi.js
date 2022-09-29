import maybeToAsync from 'crocks/Async/maybeToAsync';
import raw from 'raw.macro';
import {createUseList} from 'api/buildApiHook';
import {isEmpty} from 'crocks/predicates';
import {map, option} from 'crocks/pointfree';
import {not, ifElse} from 'crocks/logic';
import {pipe} from 'crocks/helpers';
import {safe, getProp} from 'crocks';
import {t} from 'i18n';

export const ERROR = {
  UNHANDLED: t('error.newEvent.eventServiceOffline'),
  SERVICE_DOWN: t('error.newEvent.dataIsInvalid'),
  NETWORK_FAILED: t('error.newEvent.unhandledState'),
};

export const useObjectsDropdown = createUseList({
  graphQl: raw('./graphql/GetAllObjects.graphql'),
  asyncMapFromApi: pipe(
    maybeToAsync('object prop was expected', getProp('object')),
    map(ifElse(isEmpty, () => [], map(a => ({value: a.id, name: a.name || a.id})))),
    safe(not(isEmpty)),
    option([])
  )
});
