import React from 'react';

export function SearchButton({fetch, ...props}) {
  return (
    <button onClick={fetch} className='flex justify-center w-24 mr-2 rounded-sm p-1 border border-transparent text-xs font-normal text-white hover:shadow-none bg-slate-600 hover:bg-slate-500 focus:outline-none'>
      Ieškoti
    </button>
  );
}
