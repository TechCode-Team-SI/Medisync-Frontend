import { SVGProps } from 'react';

const Calendar = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 54 59' fill='none' {...props}>
    <path
      fill={props.fill}
      d='M48 53.1H6V20.65h42M39 0v5.9H15V0H9v5.9H6c-3.33 0-6 2.625-6 5.9v41.3a5.85 5.85 0 0 0 1.757 4.172A6.052 6.052 0 0 0 6 59h42a6.052 6.052 0 0 0 4.243-1.728A5.85 5.85 0 0 0 54 53.1V11.8a5.85 5.85 0 0 0-1.757-4.172A6.052 6.052 0 0 0 48 5.9h-3V0m-3 32.45H27V47.2h15V32.45Z'
    />
  </svg>
);
export default Calendar;
