import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

import { CreateStatistics } from 'src/components/modals/statistics/CreateStatistics';
import { TopDays } from 'src/components/modals/Top/topDays';
import { TopDoctors } from 'src/components/modals/Top/topDoctors';
import { TopSpecialties } from 'src/components/modals/Top/topSpecialties';
import { SearchNav } from 'src/components/navbar/search/search';
import { UserType } from 'src/components/navbar/userType/userType';
import { Card, CardContent, CardDescription, CardTitle } from 'src/components/ui/card';
import ChartGraph from 'src/components/ui/ChartGraph';
import { Dialog, DialogTrigger } from 'src/components/ui/dialog';
import Calendar from 'src/components/ui/icons/calendar';
import Graph from 'src/components/ui/icons/Graph';
import MedicalStaff from 'src/components/ui/icons/medicalStaff';
import Specialties from 'src/components/ui/icons/specialties';
import { paths } from 'src/paths';
import { statisticsHttp } from 'src/services/api/statistics';
import { useSessionStore } from 'src/store/sessionStore';
import { ChartConfig, Histogram, PieChart } from 'src/utils/constants';

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
    const colors = ['#539091', '#959da5', '#FF5733', '#33FF57', '#3357FF'];
    return colors[index % colors.length];
  };

  const generateChartConfig = (data: (Histogram | PieChart)[] = []): ChartConfig => {
    const config: ChartConfig = {};
    let index = 0;

    data.forEach((chart) => {
      if (Array.isArray(chart.data)) {
        chart.data.forEach((item) => {
          if (!config[item.label]) {
            config[item.label] = {
              label: item.label,
              color: getColor(index),
            };
            index++;
          }
        });
      }
    });

    return config;
  };

  const chartConfig: ChartConfig = generateChartConfig([...(datalist?.histograms || []), ...(datalist?.tarts || [])]);
  console.log(chartConfig);

  return (
    <div className='w-full h-full flex flex-row items-center bg-green-400 relative'>
      <Card className='h-full w-full flex flex-col px-8 sm:px-9 lg:px-10 pt-8 sm:pt-9 lg:pt-10 bg-green-600 border-none rounded-none rounded-l-xl'>
        <Card className='bg-white min-h-[60px] max-h-[60px] w-full mb-4 flex fles-row justify-end items-center px-5 sm:px-10 lg:px-20'>
          <SearchNav />
          <UserType />
        </Card>
        <Card className='bg-white w-full h-full overflow-auto flex flex-col p-6 sm:p-8 lg:p-10 gap-5 scrollbar-edit'>
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
                    <div className='flex flex-wrap w-full h-auto justify-center items-center p-5'>
                      <div className='flex-shrink-0 w-full sm:w-full lg:w-2/3 p-2'>
                        <ChartGraph
                          dataBar={datalist.histograms}
                          dataPie={datalist.tarts}
                          config={chartConfig}
                          height='100%'
                          width='100%'
                          className='rounded-lg bg-white max-w-full max-h-full'
                        />
                      </div>
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
