import { SVGProps } from 'react';
const Add = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 33 33' fill='none' {...props}>
    <path
      fill={props.fill}
      d='M33.176 19.31H19.311v13.866h-4.622V19.311H.823v-4.622H14.69V.823h4.622V14.69h13.865v4.622Z'
    />
  </svg>
);
export default Add;
