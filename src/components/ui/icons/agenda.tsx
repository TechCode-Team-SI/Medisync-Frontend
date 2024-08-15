import { SVGProps } from 'react';

const Agenda = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' className='h-[20px] w-[17px]' fill='none' {...props}>
    <path
      fill={props.fill}
      fillRule='evenodd'
      d='M14.999 0a2 2 0 0 1 1.995 1.85l.005.15v16a2 2 0 0 1-1.85 1.995l-.15.005h-12a2 2 0 0 1-1.995-1.85L.999 18v-1a1 1 0 0 1-.117-1.993L.999 15v-2a1 1 0 0 1-.117-1.993L.999 11V9a1 1 0 0 1-.117-1.993L.999 7V5a1 1 0 0 1-.117-1.993L.999 3V2A2 2 0 0 1 2.849.005L2.999 0h12Zm0 2h-12v16h12V2Zm-2.5 2a1.5 1.5 0 0 1 1.493 1.356l.007.144v2a1.5 1.5 0 0 1-1.356 1.493L12.499 9h-7a1.5 1.5 0 0 1-1.493-1.356L3.999 7.5v-2a1.5 1.5 0 0 1 1.356-1.493L5.499 4h7Zm-.5 2h-6v1h6V6Z'
      clipRule='evenodd'
    />
  </svg>
);
export default Agenda;
