import { SVGProps } from 'react';

const Questions = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' className='h-[21px] w-[21px]' fill='none' {...props}>
    <path
      fill={props.fill}
      d='M15.75 10.498V4.374A4.38 4.38 0 0 0 11.375 0h-7A4.38 4.38 0 0 0 0 4.374V15.62a1.878 1.878 0 0 0 2.922 1.565l3.468-2.312h4.985a4.38 4.38 0 0 0 4.375-4.375Zm-7.875 1.754a.875.875 0 1 1 0-1.751.875.875 0 0 1 0 1.75Zm1.266-3.825c-.391.216-.391.279-.391.325a.875.875 0 1 1-1.75 0c0-1.144.908-1.644 1.296-1.857a.877.877 0 0 0 .44-.933.878.878 0 0 0-1.423-.505.87.87 0 0 0-.313.671.875.875 0 1 1-1.75 0 2.621 2.621 0 0 1 3.093-2.582 2.645 2.645 0 0 1 2.115 2.114A2.639 2.639 0 0 1 9.14 8.428h.001ZM21 7.874v11.245A1.878 1.878 0 0 1 19.12 21c-.364 0-.728-.106-1.042-.315l-3.468-2.313H9.625a4.352 4.352 0 0 1-3.203-1.417l.498-.333h4.455a6.132 6.132 0 0 0 6.125-6.124V4.374c0-.27-.024-.532-.057-.792A4.377 4.377 0 0 1 21 7.874Z'
    />
  </svg>
);
export default Questions;
