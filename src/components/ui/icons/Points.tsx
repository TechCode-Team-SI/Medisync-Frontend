import { SVGProps } from 'react';

const Points = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' {...props}>
    <rect fill={props.fill} width={4} height={4} x={3} y={10} rx={2} />
    <rect fill={props.fill} width={4} height={4} x={10} y={10} rx={2} />
    <rect fill={props.fill} width={4} height={4} x={17} y={10} rx={2} />
  </svg>
);
export default Points;
