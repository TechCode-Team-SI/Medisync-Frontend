import { SVGProps } from 'react';

const User = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' className='h-[20px] w-[20px]' fill='none' {...props}>
    <path
      fill={props.fill}
      d='M10 0a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 12.5c5.525 0 10 2.238 10 5V20H0v-2.5c0-2.762 4.475-5 10-5Z'
    />
  </svg>
);
export default User;
