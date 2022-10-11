import {createUseOne} from 'api/buildApiHook';
import {augmentToUser} from 'api/buildUserQuery';
import {pipe, maybeToAsync, pick, Async, getProp, setProp, chain} from 'crocks';
import raw from 'raw.macro';

export default createUseOne({
  getGraphQl: raw('./graphql/QuestionById.graphql'),
  updateGraphQl: raw('./graphql/UpdateQuestion.graphql'),
  mapFromApiUsingAuth: true,
  asyncMapFromApi: auth => pipe(
    maybeToAsync('prop "user_question_by_pk" was expected', getProp('user_question_by_pk')),
    chain(
      obj => Async.of(obj => user => setProp('user', user, obj))
        .ap(Async.of(obj))
        .ap(augmentToUser(auth, 'user_id', obj))
    )
  ),
  asyncMapToApi: pipe(
    pick([
      'id'
    ]),
    Async.Resolved
  ),
});