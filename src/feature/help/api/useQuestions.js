import {createUseApiList} from 'api/buildApiHook';
import {augmentsToUsers} from 'api/buildUserQuery';
// import {augmentToUser} from 'api/buildUserQuery';
import {
  getProp, 
  pipe, 
  maybeToAsync, 
  // identity,
  // setPath,
  // map,
  chain,
  Async,
} from 'crocks';
import raw from 'raw.macro';



export default createUseApiList({
  graphQl: raw('./graphql/GetQuestions.graphql'),
  mapFromApiUsingAuth: true,
  asyncMapFromApi: auth => pipe(
    maybeToAsync('prop "user_question" was expected', getProp('user_question')),
    chain(questions => (
      augmentsToUsers(
        auth,
        getProp('user_id'),
        questions
      )
      // .map(objectUsers => setPath(['object', 'users'], objectUsers, questions))
      .alt(Async.Resolved(questions))
    ))    
  )
});