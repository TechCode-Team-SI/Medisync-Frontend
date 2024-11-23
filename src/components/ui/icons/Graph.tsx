import { SVGProps } from 'react';

const Graph = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' {...props}>
    <path stroke='#539091 ' strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 5v14a1 1 0 0 0 1 1h14' />
    <path stroke='#539091 ' strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='m18 9-5 5-2.5-2.5L7 15' />
  </svg>
);
export default Graph;
