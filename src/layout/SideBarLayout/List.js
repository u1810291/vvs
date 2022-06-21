import React, {forwardRef} from 'react';

import Routes from '../../Routes';

import {useTranslation} from 'react-i18next';

const List = forwardRef((props, ref) => {
  const {t} = useTranslation();
  return (
    <div className='flex w-full py-8' ref={ref}>
      <div className='w-full overflow-y-auto'>
        <nav className='max-w-md text-[#B6BFC7] text-lg'>
          {Routes.props.children.map(({props}) => (
            <section className='flex flex-col items-start mb-12 sm:flex-row' key={props.path}>
              <a href={props.path} className='flex items-center mb-4 sm:mr-8 sm:mb-0 text-base font-normal text-white hover:opacity-50'>
                {t(props.translationKey)}
              </a>
            </section>
          ))}
        </nav>
      </div>
    </div>
  );
});

List.displayName = 'List';

export default List;
