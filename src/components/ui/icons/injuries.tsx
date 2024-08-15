import { SVGProps } from 'react';

const Injuries = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 20' fill='none' {...props}>
    <path
      fill={props.fill}
      d='M4 4c0-2.21 1.79-4 4-4s4 1.79 4 4-1.79 4-4 4-4-1.79-4-4Zm9 16h1c1.1 0 2-.9 2-2v-4.78c0-1.12-.61-2.15-1.61-2.66-.43-.22-.89-.43-1.39-.62V20Zm-4.66-5L11 9.33C10.07 9.12 9.07 9 8 9c-2.53 0-4.71.7-6.39 1.56A2.97 2.97 0 0 0 0 13.22V20h2.34c-.22-.45-.34-.96-.34-1.5C2 16.57 3.57 15 5.5 15h2.84ZM6 20l1.41-3H5.5c-.83 0-1.5.67-1.5 1.5S4.67 20 5.5 20H6Z'
    />
  </svg>
);
export default Injuries;
