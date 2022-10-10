import {createUseList} from 'api/buildApiHook';
import {getProp, pipe, maybeToAsync} from 'crocks';
import raw from 'raw.macro';

export default createUseList({
  graphQl: raw('./graphql/GetQuestions.graphql'),
  asyncMapFromApi: pipe(
    maybeToAsync('prop \'user_question\' expected but not found.', getProp('user_question')),
  ),
});