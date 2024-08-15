import { SVGProps } from 'react';

const Trash = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 18' fill='none' {...props}>
    <path
      fill={props.fill}
      d='M3 18c-.55 0-1.02-.196-1.412-.587A1.93 1.93 0 0 1 1 16V3H0V1h5V0h6v1h5v2h-1v13c0 .55-.196 1.021-.587 1.413A1.92 1.92 0 0 1 13 18H3Zm2-4h2V5H5v9Zm4 0h2V5H9v9Z'
    />
  </svg>
);
export default Trash;
