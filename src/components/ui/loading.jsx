import React from 'react';

import Spinner from './icons/spinner';

const Loading = () => (
  <div className='flex absolute w-full h-full items-center justify-center bg-white'>
    <Spinner width={'3em'} height={'3em'} />
  </div>
);

export { Loading };
