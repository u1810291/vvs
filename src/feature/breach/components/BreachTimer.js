// import {renderWithChildren} from 'util/react';
const {parseISO, differenceInSeconds} = require('date-fns');
const {useCyclicalTransformation} = require('hook/useCyclicalTransformation');
const {
  getProp,
  safe,
  isInteger,
  pipe,
  Maybe,
  map,
  constant
} = require('crocks');


const secondsToHMS = pipe(
  sec => {
    console.log(sec, 'sec');
    let date = new Date(null);
    date.setSeconds(sec)
    return date.toISOString().substr(11, 8);
  }
)

const BreachTimer = ({breach}) => {  
  const mExists = useCyclicalTransformation(
    1000,
    getProp('start_time', breach).map(created_at => differenceInSeconds(new Date(), parseISO(created_at))),
    safe(constant(true))
  );

  return (
    mExists
      .map(secondsToHMS)
      .map(value => <p key='breach-timer' className='flex justify-center items-center rounded-sm px-1.5 border border-transparent text-xs font-normal text-gray-600 font-montserrat hover:shadow-none bg-gray-200 focus:outline-none'>{value}</p>)
      .option('')
  );
}

export default BreachTimer;