import { Link } from 'react-router-dom';

import { SearchNav } from 'src/components/navbar/search/search';
import { UserType } from 'src/components/navbar/userType/userType';
import { Card, CardContent, CardDescription, CardTitle } from 'src/components/ui/card';
import Calendar from 'src/components/ui/icons/calendar';
import { paths } from 'src/paths';

export function Dashboard() {
  return (
    <div className='w-full h-full flex flex-row items-center bg-green-400 relative'>
      <Card className='h-full w-full flex flex-col px-8 sm:px-9 lg:px-10 pt-8 sm:pt-9 lg:pt-10 bg-green-600 border-none rounded-none rounded-l-xl'>
        <Card className='bg-white min-h-[60px] max-h-[60px] w-full mb-4 flex fles-row justify-end items-center px-5 sm:px-10 lg:px-20'>
          <SearchNav />
          <UserType />
        </Card>
        <Card className='bg-white w-full h-full overflow-auto flex flex-col p-6 sm:p-8 lg:p-10 gap-5'>
          <CardTitle className=' text-black font-montserrat font-bold text-[23px] text-center'>Bienvenido</CardTitle>
          <CardTitle className=' text-green-400 font-montserrat font-bold text-[18px] text-left'>
            CITAS MÉDICAS
          </CardTitle>
          <CardContent className='flex flex-col sm:flex-row flex-wrap gap-5'>
            <Link to={paths.myPendingAppintments}>
              <Card className='w-full grow sm:w-72 h-24 bg-green-600 shadow-md hover:bg-green-100 border-none flex flex-row items-center p-5 gap-5'>
                <Calendar className='fill-current text-green-400 h-[59px] w-[54px]'></Calendar>
                <CardDescription className='font-roboto font-bold text-[18px] text-green-400'>
                  Citas Pendientes para Hoy
                </CardDescription>
              </Card>
            </Link>
            <Link to={paths.myCancelledAppointments}>
              <Card className='w-full grow sm:w-72 h-24 bg-green-600 shadow-md hover:bg-green-100 border-none flex flex-row items-center p-5 gap-5'>
                <Calendar className='fill-current text-green-400 h-[59px] w-[54px]'></Calendar>
                <CardDescription className='font-roboto font-bold text-[18px] text-green-400'>
                  Citas Canceladas
                </CardDescription>
              </Card>
            </Link>
            <Link to={paths.myAttentedAppointments}>
              <Card className='w-full grow sm:w-72 h-24 bg-green-600 shadow-md hover:bg-green-100 border-none flex flex-row items-center p-5 gap-5'>
                <Calendar className='fill-current text-green-400 h-[59px] w-[54px]'></Calendar>
                <CardDescription className='font-roboto font-bold text-[18px] text-green-400'>
                  Citas Atendidas
                </CardDescription>
              </Card>
            </Link>
          </CardContent>
        </Card>
      </Card>
    </div>
  );
}
