import React from 'react';
import {Link} from 'react-router-dom';

export function Connected({data, ...props}) {
  return (
    <Link
      to={{pathname: `/driver/${data}`}}
      className='flex justify-center self-center w-20 truncate rounded text-xs text-white hover:shadow-none bg-green-600 focus:outline-none'
    >
      Prisijungęs
    </Link>
  );
}
