import {useCrewRequest,useCrewRequestStatus, usePermission} from '../api';
import {useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {useCrews} from 'feature/crew/api/crewEditApi';
import {
  constant,
  chain,
  isEmpty,
  map,
  not,
  option,
  pipe,
  safe,
  getProp,
  isObject,
} from 'crocks';
// import Button from 'components/Button';
import CrewDetail from 'feature/crew/component/CrewDetail';
import {renderWithProps} from 'util/react';




const displayValue = mapper => pipe(
  // tap(console.log),
  getProp('value'),
  chain(safe(not(isEmpty))),
  map(mapper),
  option(''),
  constant,
)


const PermissionEditForm = () => {
  const {id} = useParams();
  const {t} = useTranslation('permission', {keyPrefix: 'edit'});
  const {data: permission, update} = usePermission({id});
  
  const requests = useCrewRequest();
  const statuses = useCrewRequestStatus(true);
  const crews = useCrews({filters: {}});

  console.log(permission, 'data');


  return (
    <section className={'flex'}>
      <aside className={'border-r border-gray-border h-full overflow-auto'}>
        {
          pipe(
            getProp('crew'),
            chain(safe(isObject)),
            pipe(
              crew => {
                console.log('crew', crew);
                return ({
                  key: crew.id,
                  crew,
                  // crews: [],
                  // task: null,
                  title: JSON.stringify(crew, null, '  '), 
                })
              },
              renderWithProps(CrewDetail),
            )
            // option(null),
          )(permission)
        }
      </aside>  
    </section>
  );
}

export default PermissionEditForm;
