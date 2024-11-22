import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import { CreateStatistics } from 'src/components/modals/statistics/CreateStatistics';
import { TopDays } from 'src/components/modals/Top/topDays';
import { TopDoctors } from 'src/components/modals/Top/topDoctors';
import { TopSpecialties } from 'src/components/modals/Top/topSpecialties';
import { SearchNav } from 'src/components/navbar/search/search';
import { UserType } from 'src/components/navbar/userType/userType';
import { Card, CardContent, CardDescription, CardTitle } from 'src/components/ui/card';
import { ChartContainer } from 'src/components/ui/chart';
import { Dialog, DialogTrigger } from 'src/components/ui/dialog';
import Calendar from 'src/components/ui/icons/calendar';
import MedicalStaff from 'src/components/ui/icons/medicalStaff';
import Specialties from 'src/components/ui/icons/specialties';
import { paths } from 'src/paths';
import { statisticsHttp } from 'src/services/api/statistics';
import { useSessionStore } from 'src/store/sessionStore';
import { FieldQuestionTypeEnum, FilteredByType, StatisticType } from 'src/utils/constants';

const chartData = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: '#2563eb',
  },
  mobile: {
    label: 'Mobile',
    color: '#60a5fa',
  },
};

export function Dashboard() {
  const { user } = useSessionStore();
  const permissions = user()?.roles?.[0]?.permissions ?? [];
  const hasPermissionToViewStats = permissions.some((permission) => permission.name === 'Ver Estadísticas');
  const isMedic = user()?.employeeProfile?.isMedic;

  const [statisticType, setStatisticType] = useState<StatisticType>();
  const [filteredByType, setFilteredByType] = useState<FilteredByType>();

  const { data: datalist } = useQuery({
    queryKey: ['FieldQuestions'],
    queryFn: () => statisticsHttp.getFieldQuestions({ type: FieldQuestionTypeEnum.SELECTION }),
  });

  console.log(datalist);

  console.log(statisticType, filteredByType);

  return (
    <div className='w-full h-full flex flex-row items-center bg-green-400 relative'>
      <Card className='h-full w-full flex flex-col px-8 sm:px-9 lg:px-10 pt-8 sm:pt-9 lg:pt-10 bg-green-600 border-none rounded-none rounded-l-xl'>
        <Card className='bg-white min-h-[60px] max-h-[60px] w-full mb-4 flex fles-row justify-end items-center px-5 sm:px-10 lg:px-20'>
          <SearchNav />
          <UserType />
        </Card>
        <Card className='bg-white w-full h-full overflow-auto flex flex-col p-6 sm:p-8 lg:p-10 gap-5'>
          <CardTitle className=' text-black font-montserrat font-bold text-[23px] text-center'>Bienvenido</CardTitle>

          <CardContent className='flex flex-col w-full space-y-5'>
            {isMedic && (
              <div className='space-y-5'>
                <CardTitle className=' text-green-400 font-montserrat font-bold text-[18px] text-left'>
                  CITAS MÉDICAS
                </CardTitle>
                <div className='flex flex-wrap sm:flex-row gap-5'>
                  <Link to={paths.myPendingAppintments} className='w-full grow flex flex-row sm:w-72 h-24'>
                    <Card className='w-full grow sm:w-72 h-24 bg-green-600 shadow-md hover:bg-green-100 border-none flex flex-row items-center p-5 gap-5'>
                      <Calendar className='fill-current text-green-400 h-[59px] w-[54px]'></Calendar>
                      <CardDescription className='font-roboto font-bold text-[18px] text-green-400'>
                        Citas Pendientes para Hoy
                      </CardDescription>
                    </Card>
                  </Link>
                  <Link to={paths.myCancelledAppointments} className='w-full grow flex flex-row sm:w-72 h-24'>
                    <Card className='w-full grow sm:w-72 h-24 bg-green-600 shadow-md hover:bg-green-100 border-none flex flex-row items-center p-5 gap-5'>
                      <Calendar className='fill-current text-green-400 h-[59px] w-[54px]'></Calendar>
                      <CardDescription className='font-roboto font-bold text-[18px] text-green-400'>
                        Citas Canceladas
                      </CardDescription>
                    </Card>
                  </Link>
                  <Link to={paths.myAttentedAppointments} className='w-full grow flex flex-row sm:w-72 h-24'>
                    <Card className='w-full grow sm:w-72 h-24 bg-green-600 shadow-md hover:bg-green-100 border-none flex flex-row items-center p-5 gap-5'>
                      <Calendar className='fill-current text-green-400 h-[59px] w-[54px]'></Calendar>
                      <CardDescription className='font-roboto font-bold text-[18px] text-green-400'>
                        Citas Atendidas
                      </CardDescription>
                    </Card>
                  </Link>
                </div>
              </div>
            )}

            {hasPermissionToViewStats && (
              <div className='space-y-5'>
                <CardTitle className=' text-green-400 font-montserrat font-bold text-[18px] text-left'>
                  ESTADÍSTICA
                </CardTitle>
                <div className='flex sm:flex-row flex-wrap gap-5'>
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
                  <Dialog>
                    <DialogTrigger asChild>
                      <Card className='w-full grow sm:w-72 h-24 bg-green-600 shadow-md hover:bg-green-100 border-none flex flex-row items-center p-5 gap-5'>
                        <Calendar className='fill-current text-green-400 h-[59px] w-[54px]' />
                        <CardDescription className='font-roboto font-bold text-[18px] text-green-400'>
                          Generar Grafica
                        </CardDescription>
                      </Card>
                    </DialogTrigger>
                    <CreateStatistics
                      statisticType={statisticType}
                      setStatisticType={setStatisticType}
                      filteredByType={filteredByType}
                      setFilteredByType={setFilteredByType}
                    />
                  </Dialog>
                </div>
              </div>
            )}

            <ChartContainer config={chartConfig} className='h-[200px] w-full'>
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey='month'
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <Bar dataKey='desktop' fill='var(--color-desktop)' radius={4} />
                <Bar dataKey='mobile' fill='var(--color-mobile)' radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </Card>
    </div>
  );
}
