import { SVGProps } from 'react';
const CalendarAgg = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' className='h-[20px] w-[17px]' fill='none' {...props}>
    <path
      fill={props.fill}
      d='M13.222 2h1.89c.5 0 .98.21 1.335.586C16.8 2.96 17 3.47 17 4v14c0 .53-.199 1.04-.553 1.414A1.837 1.837 0 0 1 15.11 20H1.89c-.501 0-.982-.21-1.336-.586A2.061 2.061 0 0 1 0 18V4c0-1.1.85-2 1.889-2h1.889V0h1.889v2h5.666V0h1.89v2ZM1.89 6v12H15.11V6H1.89Zm5.667 5V9h1.888v2h1.89v2h-1.89v2H7.556v-2h-1.89v-2h1.89Z'
    />
  </svg>
);
export default CalendarAgg;
