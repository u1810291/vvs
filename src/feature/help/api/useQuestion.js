import {createUseOne} from 'api/buildApiHook';
import {pipe, maybeToAsync, pick, Async, getProp} from 'crocks';
import raw from 'raw.macro';

export default createUseOne({
  getGraphQl: raw('./graphql/QuestionById.graphql'),
  updateGraphQl: raw('./graphql/UpdateQuestion.graphql'),
  asyncMapFromApi: pipe(
    maybeToAsync('expected \'user_question_by_pk\' but not found', getProp('user_question_by_pk')),
  ),
  asyncMapToApi: pipe(
    pick([
      'id'
    ]),
    Async.Resolved
  ),
});