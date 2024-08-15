import { SVGProps } from 'react';

const Publications = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' className='h-[20px] w-[20px]' fill='none' {...props}>
    <path
      fill={props.fill}
      d='M0 20V0h20v20H0Zm3.333-7.778h13.334V10H3.333v2.222Zm0 3.334h13.334v-1.667H3.333v1.667Z'
    />
  </svg>
);
export default Publications;
