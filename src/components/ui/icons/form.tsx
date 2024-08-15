import { SVGProps } from 'react';

const Form = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' className='h-[20px] w-[20px]' fill='none' {...props}>
    <path
      fill={props.fill}
      d='M17.778 0H2.222C1 0 0 1 0 2.222v15.556C0 19 1 20 2.222 20h15.556C19 20 20 19 20 17.778V2.222C20 1 19 0 17.778 0ZM4.444 4.444h2.223v2.223H4.444V4.444Zm0 4.445h2.223v2.222H4.444V8.89Zm0 4.444h2.223v2.223H4.444v-2.223Zm11.112 2.223H8.889v-2.223h6.667v2.223Zm0-4.445H8.889V8.89h6.667v2.222Zm0-4.444H8.889V4.444h6.667v2.223Z'
    />
  </svg>
);
export default Form;
