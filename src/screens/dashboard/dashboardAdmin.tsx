import { Link } from 'react-router-dom';

import { TopDays } from 'src/components/modals/Top/topDays';
import { TopDoctors } from 'src/components/modals/Top/topDoctors';
import { TopSpecialties } from 'src/components/modals/Top/topSpecialties';
import { SearchNav } from 'src/components/navbar/search/search';
import { UserType } from 'src/components/navbar/userType/userType';
import { Card, CardTitle, CardContent, CardDescription } from 'src/components/ui/card';
import { Dialog, DialogTrigger } from 'src/components/ui/dialog';
import Calendar from 'src/components/ui/icons/calendar';
import MedicalStaff from 'src/components/ui/icons/medicalStaff';
import Settings from 'src/components/ui/icons/settings';
import Specialties from 'src/components/ui/icons/specialties';

export function DashboardAdmin() {
  return (
    <div className='w-full h-full flex flex-row items-center bg-green-400 relative'>
      <Card className='h-full w-full flex flex-col px-8 sm:px-9 lg:px-10 pt-8 sm:pt-9 lg:pt-10 bg-green-600 border-none rounded-none rounded-l-xl'>
        <Card className='bg-white min-h-[60px] max-h-[60px] w-full mb-4 flex fles-row justify-end items-center px-5 sm:px-10 lg:px-20'>
          <SearchNav />
          <UserType />
        </Card>
        <Card className='bg-white w-full h-full overflow-auto flex flex-col p-6 sm:p-8 lg:p-10 gap-5'>
          <Link to='/medicalCenterConfig'>
            <CardContent className='flex justify-end items-center gap-2'>
              <CardTitle className=' text-green-400 font-montserrat font-bold text-[18px]'>
                CONFIGURAR CENTRO MÉDICO
              </CardTitle>
              <Settings className='fill-current text-green-400 h-7 w-7' />
            </CardContent>
          </Link>
          <CardTitle className=' text-black font-montserrat font-bold text-[23px] text-center'>Bienvenido</CardTitle>
          <CardContent className='flex flex-col sm:flex-row flex-wrap gap-5'>
            <Dialog>
              <DialogTrigger asChild>
                <Card className='w-full grow sm:w-72 h-24 bg-green-600 shadow-md hover:bg-green-100 border-none flex flex-row items-center p-5 gap-5'>
                  <MedicalStaff className='fill-current text-green-400 h-[59px] w-[54px]' />
                  <CardDescription className='font-roboto font-bold text-[18px] text-green-400'>
                    Médicos más Solicitados
                  </CardDescription>
                </Card>
              </DialogTrigger>
              <TopDoctors />
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Card className='w-full grow sm:w-72 h-24 bg-green-600 shadow-md hover:bg-green-100 border-none flex flex-row items-center p-5 gap-5'>
                  <Specialties className='fill-current text-green-400 h-[59px] w-[54px]' />
                  <CardDescription className='font-roboto font-bold text-[18px] text-green-400'>
                    Especialidades más Solicitadas
                  </CardDescription>
                </Card>
              </DialogTrigger>
              <TopSpecialties />
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Card className='w-full grow sm:w-72 h-24 bg-green-600 shadow-md hover:bg-green-100 border-none flex flex-row items-center p-5 gap-5'>
                  <Calendar className='fill-current text-green-400 h-[59px] w-[54px]' />
                  <CardDescription className='font-roboto font-bold text-[18px] text-green-400'>
                    Días más Concurridos
                  </CardDescription>
                </Card>
              </DialogTrigger>
              <TopDays />
            </Dialog>
          </CardContent>
        </Card>
      </Card>
    </div>
  );
}
