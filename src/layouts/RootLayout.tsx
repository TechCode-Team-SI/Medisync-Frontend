import { Link, Outlet } from 'react-router-dom';

import { Toaster } from 'src/components/ui/sonner';
import { useCount } from 'src/hooks/useCountDemo';
import { paths } from 'src/paths';

export const RootLayout = () => {
  const { count } = useCount();
  return (
    <div className='w-full flex-1'>
      <Toaster duration={2000} position='top-center' />
      <nav className='w-full bg-slate-400 flex'>
        <ul className='flex'>
          <li className='hover:bg-slate-300 transition duration-200 cursor-pointer'>
            <Link className='block px-4 py-2' to={paths.home}>
              Home
            </Link>
          </li>
          <li className='hover:bg-slate-300 transition duration-200 cursor-pointer'>
            <Link className='block px-4 py-2' to={paths.tableDemo}>
              Table
            </Link>
          </li>
          <li className='hover:bg-slate-300 transition duration-200 cursor-pointer'>
            <Link className='block px-4 py-2' to={paths.modalsDemo}>
              Modals
            </Link>
          </li>
          <li className='hover:bg-slate-300 transition duration-200 cursor-pointer'>
            <Link className='block px-4 py-2' to={paths.formDemo}>
              Form
            </Link>
          </li>
        </ul>
        <div className='ml-auto px-4 py-2'>Count: {count}</div>
      </nav>
      <Outlet />
    </div>
  );
};
