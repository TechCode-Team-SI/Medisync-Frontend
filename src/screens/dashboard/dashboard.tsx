import { SearchNav } from 'src/components/navbar/search/search';
import { UserType } from 'src/components/navbar/userType/userType';
import { Card, CardTitle, CardContent, CardDescription } from 'src/components/ui/card';
import Calendar from 'src/components/ui/icons/calendar';

import { Sidebar } from '../../components/sidebar/sidebar';

export function Dashboard() {
  return (
    <div className='w-full h-full flex flex-row items-center relative'>
      <Card className='h-full w-[316px] bg-green-400 border-none rounded-none'>
        <Sidebar></Sidebar>
      </Card>
      <Card className='h-full w-[calc(100%-285px)] p-10 bg-green-600 border-none absolute left-72 rounded-none rounded-l-xl'>
        <Card className='bg-white h-[50px] w-full mb-4 flex fles-rows justify-end items-center px-20'>
          <SearchNav></SearchNav>
          <UserType></UserType>
        </Card>
        <Card className='bg-white w-full h-full flex flex-col p-8 gap-5'>
          <CardTitle className=' text-black font-montserrat font-bold text-[23px] text-center'>Bienvenido</CardTitle>
          <CardTitle className=' text-green-400 font-montserrat font-bold text-[18px] text-left'>
            CITAS MÉDICAS
          </CardTitle>
          <CardContent className='flex flex-col sm:flex-row flex-wrap gap-5'>
            <Card className='w-full grow sm:w-72 h-24 bg-green-600 shadow-md hover:bg-green-100 border-none flex flex-row items-center p-5 gap-5'>
              <Calendar className='fill-current text-green-400 h-[59px] w-[54px]'></Calendar>
              <CardDescription className='font-roboto font-bold text-[18px] text-green-400'>
                Citas Pendientes para Hoy
              </CardDescription>
            </Card>
            <Card className='w-full grow sm:w-72 h-24 bg-green-600 shadow-md hover:bg-green-100 border-none flex flex-row items-center p-5 gap-5'>
              <Calendar className='fill-current text-green-400 h-[59px] w-[54px]'></Calendar>
              <CardDescription className='font-roboto font-bold text-[18px] text-green-400'>
                Citas Canceladas
              </CardDescription>
            </Card>
            <Card className='w-full grow sm:w-72 h-24 bg-green-600 shadow-md hover:bg-green-100 border-none flex flex-row items-center p-5 gap-5'>
              <Calendar className='fill-current text-green-400 h-[59px] w-[54px]'></Calendar>
              <CardDescription className='font-roboto font-bold text-[18px] text-green-400'>
                Citas Atendidas
              </CardDescription>
            </Card>
          </CardContent>
        </Card>
      </Card>
    </div>
  );
}
