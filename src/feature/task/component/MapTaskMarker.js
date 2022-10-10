import {OverlayView} from '@react-google-maps/api';
import {
  pipe,
  branch,
  merge,
  getProp,
  alt,
  chain,
  safe,
  and,
  isString,
  option,
  isTruthy,
  map,
} from 'crocks';
import {renderWithChildren} from 'util/react';
import {getTaskLatLngLiteral} from '../util';


const MapTaskMarker = pipe(
  branch,
  map(getTaskLatLngLiteral),
  merge((task, mLatLngLiteral) => (
    mLatLngLiteral.map(position => (
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
          {
            pipe(
              getProp('name'),
              alt(getProp('id', task)),
              chain(safe(and(isString, isTruthy))),
              map(renderWithChildren(
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
                ].join(' ')}/>
              )),
              option(null),
            )(task)
          }
        </div>
      </OverlayView>
    )).option(null)
  )),
);

export default MapTaskMarker;
