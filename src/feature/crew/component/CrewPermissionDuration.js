import {
  pipe,
  getPath,
  chain,
  safe,
  isTruthy,
  Maybe,
} from 'crocks';
import {formatPermissionExpiration, getPermissionExpiration} from 'feature/permission/utils';
import {useState, useRef, useEffect, useMemo} from 'react';


const CrewPermissionDuration = ({updateInterval = 1000, ...crew}) => {
  const getExpiration = useMemo(() => pipe(
    getPath(['permissions', 0]),
    chain(getPermissionExpiration),
  ), []);

  const timerRef = useRef();
  const [expiresAt, setExpiresAt] = useState(getExpiration(crew));

  useEffect(() => {
    timerRef.current = setInterval(() => (
        getExpiration(crew)
        .either(
          () => clearInterval(timerRef.current),
          pipe(Maybe.of, setExpiresAt)
        )
    ), updateInterval)

    return () => clearInterval(timerRef.current);
  }, [timerRef, setExpiresAt, crew, updateInterval]);

  return expiresAt
    .map(formatPermissionExpiration)
    .chain(safe(isTruthy))
    .map(durationString => <span key={durationString} className='text-steel'>{durationString}</span>)
    .option(null);
};

export default CrewPermissionDuration;
