import { SVGProps } from 'react';

const Claims = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 14' fill='none' {...props}>
    <path
      fill={props.fill}
      d='M10 0C4.477 0 0 3.133 0 7c0 1.32.529 2.555 1.44 3.61L0 13.555l4.01-.96C5.68 13.473 7.75 14 10 14c5.523 0 10-3.133 10-7s-4.477-7-10-7Zm.62 10.958H9.213v-1.26h1.407v1.26Zm-.069-2.187H9.282l-.126-5.389h1.509l-.114 5.39Z'
    />
  </svg>
);
export default Claims;
