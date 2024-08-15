import { SVGProps } from 'react';

const View = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 18 14' fill='none' {...props}>
    <path fill={props.fill} d='M9 9a2.4 2.4 0 1 0 0-4.8A2.4 2.4 0 0 0 9 9Z' />
    <path
      fill={props.fill}
      d='M17.964 6.396A10.015 10.015 0 0 0 9 0 10.014 10.014 0 0 0 .036 6.396a.6.6 0 0 0 0 .408A10.015 10.015 0 0 0 9 13.2a10.015 10.015 0 0 0 8.964-6.396.6.6 0 0 0 0-.408ZM9 10.5a3.9 3.9 0 1 1 0-7.8 3.9 3.9 0 0 1 0 7.8Z'
    />
  </svg>
);
export default View;
