import { SVGProps } from 'react';

const Clock = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' className='h-[20px] w-[20px]' fill='none' {...props}>
    <path
      fill={props.fill}
      d='M10 0c5.523 0 10 4.477 10 10s-4.477 10-10 10S0 15.523 0 10 4.477 0 10 0Zm0 4a1 1 0 0 0-1 1v5a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L11 9.586V5a1 1 0 0 0-1-1Z'
    />
  </svg>
);
export default Clock;
