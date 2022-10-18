import {OverlayView} from '@react-google-maps/api';
import Nullable from 'components/atom/Nullable';
import {
  pipe,
  branch,
  merge,
  map,
  // getProp,
  // alt,
  // chain,
  // safe,
  // and,
  // isString,
  // option,
  // isTruthy,
  // pick,
} from 'crocks';
import {useTranslation} from 'react-i18next';
// import {renderWithChildren} from 'util/react';
import {getTaskLatLngLiteral} from '../util';


const MapTaskMarker = pipe(
  branch,
  map(getTaskLatLngLiteral),
  merge((task, mLatLngLiteral) => {
    const {t} = useTranslation('task', {keyPrefix: 'status'});

    return (mLatLngLiteral.map(position => (
      <OverlayView
        key={`MapTaskMarker-${JSON.stringify(task)}`}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        position={position}
      >
        <div className='flex'>
        <svg
            width='32'
            height='32'
            viewBox='0 0 32 32'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='-left-4 -top-4 relative'
          >
            <circle opacity='0.3' cx='16' cy='16' r='16' fill='#C32A2F'/>
            <circle cx='16' cy='16' r='3' fill='#C32A2F' stroke='white' strokeWidth='2'/>
          </svg>
          {/* {
            pipe(
              getProp('status'),
              alt(getProp('name', task)),
              chain(safe(and(isString, isTruthy))),
              map(status => renderWithChildren(
                <span role='tooltip' className={[
                  '-translate-y-1/2',
                  'absolute',
                  'before:-left-[15px]',
                  'before:-translate-y-1/2',
                  'before:absolute',
                  'before:block',
                  'before:border-[10px]',
                  'before:border-r-[10px]',
                  'before:border-r-brick',
                  'before:border-transparent',
                  'before:content-[""]',
                  'before:top-1/2',
                  'bg-brick',
                  'font-medium',
                  'inline-block',
                  'px-3',
                  'py-2',
                  'rounded-lg',
                  'shadow-sm',
                  'text-sm',
                  'text-white',
                  'translate-x-3',
                  'whitespace-nowrap',
                  'z-10',
                ].join(' ')} />
              )(status)),
              option(null),
            )(task)
          } */}

          <div role='tooltip' className={[
            task?.status === 'INSPECTION_DONE' ? 'before:border-r-orange-500' : 'before:border-r-brick',
            '-translate-y-1/2', 'absolute', 'before:-left-[15px]', 'before:-translate-y-1/2',
            'before:absolute', 'before:block', 'before:border-[10px]', 'before:border-r-[10px]',
            'before:border-transparent', 'before:content-[""]',
            'before:top-1/2', , 'font-medium', 'inline-block', 'rounded-xl', 'shadow-sm', 'text-sm', 'text-white',
            'translate-x-3', 'whitespace-nowrap', 'z-10', 'flex', 'bg-white'
          ].join(' ')}>
            <div className={`${task?.status === 'INSPECTION_DONE' ? 'bg-orange-500' : 'bg-brick'} flex  px-3 py-2 rounded-xl shadow`}>
              {t(task?.status)}
            </div>
            
            <Nullable on={['ON_THE_ROAD', 'INSPECTION', 'INSPECTION_DONE'].includes(task?.status)}>
              <div key={task.status} className='bg-white text-brick px-2 py-2 rounded-tr-xl rounded-br-xl'>{task?.name}</div>
            </Nullable>
          </div>
        </div>
      </OverlayView>
    )).option(null)
  )}),
);

export default MapTaskMarker;
