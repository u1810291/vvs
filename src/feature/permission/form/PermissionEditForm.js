// import {useCrewRequest,useCrewRequestStatus, usePermission} from '../api';
import {useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
// import {useCrews} from 'feature/crew/api/crewEditApi';
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
import PermissionDetail from '../component/PermissionDetail';
import {renderWithProps} from 'util/react';
import {usePermission} from '../api';




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
  
  // const requests = useCrewRequest();
  // const statuses = useCrewRequestStatus(true);
  // const crews = useCrews({filters: {}});

  // console.log(permission, 'data');


  return (
    <div className='flex flex-row w-full justify-between h-full overflow-hidden'>
      <aside className='grow'></aside>
      
      <div className='w-96'>
        <aside className={'border-l border-gray-border h-full overflow-auto'}>
          {
            pipe(
              getProp('crew'),
              chain(safe(isObject)),
              map(pipe(
                crew => ({
                  key: crew.id,
                  crew,
                  permission,
                  title: JSON.stringify(crew, null, '  '), 
                  children: (<></>)
                }),
                renderWithProps(PermissionDetail),
              )),
              option(null),
            )(permission)
          }
        </aside>
      </div>  
    </div>
  );
}

export default PermissionEditForm;
