import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

import { CreateStatistics } from 'src/components/modals/statistics/CreateStatistics';
import { TopDays } from 'src/components/modals/Top/topDays';
import { TopDoctors } from 'src/components/modals/Top/topDoctors';
import { TopElementDiagnosis } from 'src/components/modals/Top/topElementDiagnosis';
import { TopSpecialties } from 'src/components/modals/Top/topSpecialties';
import { SearchNav } from 'src/components/navbar/search/search';
import { UserType } from 'src/components/navbar/userType/userType';
import { Card, CardContent, CardDescription, CardTitle } from 'src/components/ui/card';
import ChartGraph from 'src/components/ui/ChartGraph';
import { Dialog, DialogTrigger } from 'src/components/ui/dialog';
import Calendar from 'src/components/ui/icons/calendar';
import Graph from 'src/components/ui/icons/Graph';
import Injuries from 'src/components/ui/icons/injuries';
import MedicalStaff from 'src/components/ui/icons/medicalStaff';
import Specialties from 'src/components/ui/icons/specialties';
import { paths } from 'src/paths';
import { statisticsHttp } from 'src/services/api/statistics';
import { Chart } from 'src/services/api/statistics/interface';
import { useSessionStore } from 'src/store/sessionStore';
import { ChartConfig } from 'src/utils/constants';

export function Dashboard() {
  const { user } = useSessionStore();
  const permissions = user()?.roles?.flatMap((role) => role.permissions) ?? [];
  const hasPermissionToViewStats = permissions.some((permission) => permission.name === 'Ver Estadísticas');

  console.log(hasPermissionToViewStats);

  const isMedic = user()?.employeeProfile?.isMedic;

  const { data: datalist } = useQuery({
    queryKey: ['Statistics'],
    queryFn: statisticsHttp.getStatistics,
  });
  console.log(datalist);

  const getColor = (index: number): string => {
    const colors = [
      '#26A69A', // Teal
      '#FFA726', // Orange
      '#AB47BC', // Purple
      '#EF5350', // Red
      '#42A5F5', // Blue
      '#66BB6A', // Green
      '#80DEEA', // Cyan Light
      '#B39DDB', // Purple Light
      '#DCE775', // Green Light
      '#F48FB1', // Pink Light
      '#9FA8DA', // Blue Light
      '#FFF176', // Yellow Ligh
    ];

    return colors[index % colors.length];
  };

  const generateChartConfig = (data: Chart[] = []): ChartConfig => {
    const config: ChartConfig = {};
    let index = 0;

    data.forEach((chart) => {
      if (Array.isArray(chart.data)) {
        chart.data.forEach((item) => {
          if (!config[item.category]) {
            config[item.category] = {
              label: item.category,
              color: getColor(index),
            };
            index++;
          }
        });
      }
    });

    return config;
  };

  const chartConfig: ChartConfig = generateChartConfig(datalist || []);
  console.log(chartConfig);

  return (
    <div className='w-full h-full flex flex-row items-center bg-green-400 relative'>
      <Card className='h-full w-full flex flex-col px-8 sm:px-9 lg:px-10 pt-8 sm:pt-9 lg:pt-10 bg-green-600 border-none rounded-none rounded-l-xl'>
        <Card className='bg-white min-h-[60px] max-h-[60px] w-full mb-4 flex fles-row justify-end items-center px-5 sm:px-10 lg:px-20'>
          <SearchNav />
          <UserType />
        </Card>
        <Card className='bg-white w-full h-full overflow-auto scrollbar-edit flex flex-col p-6 sm:p-8 lg:p-10 gap-5'>
          <CardTitle className=' text-black font-montserrat font-bold text-[23px] text-center'>Bienvenido</CardTitle>

          <CardContent className='flex flex-col w-full space-y-5 pb-5 '>
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
                <div className='flex flex-wrap sm:flex-row gap-5'>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Card className='cursor-pointer w-full grow sm:w-72 h-24 bg-green-600 shadow-md hover:bg-green-100 border-none flex flex-row items-center p-5 gap-5'>
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
                      <Card className='cursor-pointer w-full grow sm:w-72 h-24 bg-green-600 shadow-md hover:bg-green-100 border-none flex flex-row items-center p-5 gap-5'>
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
                      <Card className='cursor-pointer w-full grow sm:w-72 h-24 bg-green-600 shadow-md hover:bg-green-100 border-none flex flex-row items-center p-5 gap-5'>
                        <Calendar className='fill-current text-green-400 h-[59px] w-[54px]' />
                        <CardDescription className='font-roboto font-bold text-[18px] text-green-400'>
                          Días más Concurridos
                        </CardDescription>
                      </Card>
                    </DialogTrigger>
                    <TopDays />
                  </Dialog>
                </div>
                <div className='flex flex-wrap sm:flex-row gap-5'>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Card className='cursor-pointer w-full grow sm:w-72 h-24 bg-green-600 shadow-md hover:bg-green-100 border-none flex flex-row items-center p-5 gap-5'>
                        <Injuries className='fill-current text-green-400 h-[59px] w-[54px]' />
                        <CardDescription className='font-roboto font-bold text-[18px] text-green-400'>
                          Ranking por Categorías de Diagnóstico Médico
                        </CardDescription>
                      </Card>
                    </DialogTrigger>
                    <TopElementDiagnosis />
                  </Dialog>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Card className='cursor-pointer w-full grow sm:w-72 h-24 bg-green-600 shadow-md hover:bg-green-100 border-none flex flex-row items-center p-5 gap-5'>
                        <Graph className=' h-[59px] w-[54px]' />
                        <CardDescription className='font-roboto font-bold text-[18px] text-green-400'>
                          Generar Grafica
                        </CardDescription>
                      </Card>
                    </DialogTrigger>
                    <CreateStatistics />
                  </Dialog>
                </div>
                <CardContent className='flex flex-col w-full h-full p-5 space-y-5 mb-10 shadow-md'>
                  <CardTitle className=' text-green-400 font-montserrat font-bold text-[18px] text-left'>
                    GRAFICOS
                  </CardTitle>
                  {datalist && (
                    <div className='w-full h-auto justify-center items-center gap-5'>
                      <ChartGraph dataChart={datalist} config={chartConfig} height='100%' width='100%' className='' />
                    </div>
                  )}
                </CardContent>
              </div>
            )}
          </CardContent>
        </Card>
      </Card>
    </div>
  );
}
