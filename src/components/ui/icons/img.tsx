import { SVGProps } from 'react';
const Img = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 21 21' fill='none' {...props}>
    <path
      fill={props.fill}
      d='M2.333 21c-.641 0-1.19-.228-1.647-.685A2.251 2.251 0 0 1 0 18.667V2.333c0-.641.229-1.19.686-1.647A2.252 2.252 0 0 1 2.333 0h16.334c.641 0 1.19.229 1.648.686.457.457.686 1.006.685 1.647v16.334a2.25 2.25 0 0 1-.685 1.648 2.241 2.241 0 0 1-1.648.685H2.333ZM3.5 16.333h14L13.125 10.5l-3.5 4.667L7 11.667l-3.5 4.666Z'
    />
  </svg>
);
export default Img;
