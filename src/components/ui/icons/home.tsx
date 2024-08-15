import { SVGProps } from 'react';
const Home = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' className='h-[19px] w-[18px]' fill='none' {...props}>
    <path fill={props.fill} d='M0 19V6.364L9 0l9 6.364V19h-6.675v-7.683h-4.65V19H0Z' />
  </svg>
);
export default Home;
