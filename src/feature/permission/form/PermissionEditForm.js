import PermissionDetail from '../component/PermissionDetail';
import {renderWithProps} from 'util/react';
import {useParams} from 'react-router-dom';
import {usePermission} from '../api';
import {
  chain,
  map,
  option,
  pipe,
  safe,
  getProp,
  isObject,
} from 'crocks';

const PermissionEditForm = () => {
  const {id} = useParams();
  const {data: permission} = usePermission({id});

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
