import { SVGProps } from 'react';

const Exclamation = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' fill='none' {...props}>
      <circle cx={25} cy={25} r={25} fill='#E5F4F3' />
      <circle cx={25} cy={25} r={25} fill='#E5F4F3' />
      <ellipse cx={25} cy={25} fill='#A0F1EB' fillOpacity={0.57} rx={21.894} ry={21.71} />
      <ellipse cx={25} cy={25} fill='#68C2B6' rx={18.789} ry={18.421} />
      <path
        stroke='#F8F8F8'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={3.125}
        d='M26 13c-1.08 0-2.069.521-1.996 1.133l.998 15.3c0 .15.105.295.292.401.187.106.441.166.706.166.265 0 .519-.06.706-.166.187-.106.292-.25.292-.4l.998-15.3C28.07 13.52 27.081 13 26 13ZM26 37c1.105 0 2-.448 2-1s-.895-1-2-1-2 .448-2 1 .895 1 2 1Z'
      />
    </svg>
  );
};

export default Exclamation;
