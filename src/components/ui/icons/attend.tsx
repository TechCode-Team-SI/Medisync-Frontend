import { SVGProps } from 'react';

const Attend = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none' {...props}>
    <path
      fill={props.fill}
      d='M4.572 0c-1.6 0-2.401 0-3.013.31-.537.275-.974.712-1.248 1.25C-.001 2.17 0 2.971 0 4.571v8c0 1.6 0 2.4.31 3.01.275.538.712.976 1.25 1.249.61.311 1.412.312 3.012.312h9.714V20l.66-.33c1.835-.918 2.75-1.377 3.421-2.06a5.71 5.71 0 0 0 1.32-2.134c.313-.907.313-1.934.313-3.984v-6.92c0-1.6 0-2.401-.31-3.013A2.859 2.859 0 0 0 18.44.311C17.83-.001 17.029 0 15.429 0H4.572Zm1.142 8.57h8.572a4.285 4.285 0 1 1-8.572.02v-.02Z'
    />
  </svg>
);
export default Attend;
