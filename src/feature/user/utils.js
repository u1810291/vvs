import {titleCase} from '@s-e/frontend/transformer/string';
import {pipe, safe, not, isEmpty, getProp, hasProps} from 'crocks';

const mNotEmptyStr = pipe(
  a => String(a || '').trim(),
  safe(not(isEmpty)),
);

/**
 * @summary object -> Maybe<String>
 * @type {(userObject: object) => import('crocks/Maybe').default}
 */
export const getName = userObject => (
    getProp('fullName', userObject).chain(safe(not(isEmpty)))
    .alt((
      safe(hasProps(['firstName', 'middleName', 'lastName']), userObject)
      .map(({firstName, middleName, lastName}) => `${firstName} ${middleName} ${lastName}`)
      .chain(mNotEmptyStr)
    ))
    .alt((
      safe(hasProps(['firstName', 'lastName']), userObject)
      .map(({firstName, lastName}) => `${firstName} ${lastName}`)
      .chain(mNotEmptyStr)
    ))
    .alt(getProp('firstName', userObject).chain(mNotEmptyStr))
    .alt(getProp('lastName', userObject).chain(mNotEmptyStr))
    .alt(getProp('id', userObject).chain(mNotEmptyStr))
    .map(titleCase)
);
