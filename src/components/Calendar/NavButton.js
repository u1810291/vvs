import {isTruthy} from 'crocks';
import {useCalendar} from './Context';

const NavButton = ({direction, ...props}) => {
  const {
    canGoBack,
    canGoFwd,
    goNextMonth,
    goPrevMonth,
  } = useCalendar();

  const isDisabled = direction && !canGoFwd || !direction && !canGoBack

  const onClick = () => {
    if (direction && canGoFwd) return goNextMonth()
    if (!direction && canGoBack) return goPrevMonth();
  };

  const className = [
    'focus:outline-none flex py-6 px-6',
    isDisabled && 'opacity-20',
    props?.className,
  ]
  .filter(isTruthy)
  .join(' ');

  const children = direction ? '→' : '←';

  return (
    <button {...props} onClick={onClick} className={className}>
      {children}
    </button>
  );
};

export default NavButton;

