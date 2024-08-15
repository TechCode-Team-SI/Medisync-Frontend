import { SVGProps } from 'react';

const Edit = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' className='h-[18px] w-[18px]' fill='none' {...props}>
    <path
      fill={props.fill}
      d='M0 18v-4.25L13.2.575c.2-.183.421-.325.663-.425.242-.1.496-.15.762-.15s.524.05.775.15c.25.1.467.25.65.45L17.425 2c.2.183.346.4.438.65a2.141 2.141 0 0 1 0 1.513 1.85 1.85 0 0 1-.438.662L4.25 18H0ZM14.6 4.8 16 3.4 14.6 2l-1.4 1.4 1.4 1.4Z'
    />
  </svg>
);
export default Edit;
