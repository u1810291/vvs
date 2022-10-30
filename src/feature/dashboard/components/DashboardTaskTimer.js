const {parseISO, differenceInSeconds} = require('date-fns');
const {useCyclicalTransformation} = require('hook/useCyclicalTransformation');
const {
  getProp,
  safe,
  pipe,
  constant
} = require('crocks');

const secondsToHMS = pipe(
  sec => {
    let date = new Date(null);
    date.setSeconds(sec)
    return date.toISOString().substr(11, 8);
  }
)

const DashboardTaskTimer = ({task}) => {  
  const mExists = useCyclicalTransformation(
    1000,
    getProp('updated_at', task).map(updated_at => differenceInSeconds(new Date(), parseISO(updated_at))),
    safe(constant(true))
  );

  return (
    mExists
      .map(secondsToHMS)
      .map(value => <p key='task-timer' className='flex justify-start items-center rounded-md px-1.5 border border-transparent text-xs font-normal text-gray-600 font-montserrat hover:shadow-none bg-gray-200 focus:outline-none'>{value}</p>)
      .option('')
  );
}

export default DashboardTaskTimer;
