import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { UserType } from 'src/components/navbar/userType/userType';
import { Button } from 'src/components/ui/button';
import { Card, CardTitle, CardContent, CardHeader } from 'src/components/ui/card';
import Search from 'src/components/ui/icons/search';
import View from 'src/components/ui/icons/view';
import { Input } from 'src/components/ui/input';
import { Loading } from 'src/components/ui/loading';
import { TableCell, TableRow, TableBody, Table, TableHead, TableHeader } from 'src/components/ui/table';
import { paths } from 'src/paths';
import { RequestsHttp } from 'src/services/api/request';

export function Appointments() {
  const navigate = useNavigate();
  const { data: datalist, isFetching } = useQuery({
    queryKey: ['requests-global'],
    queryFn: RequestsHttp.getRequests,
  });

  if (isFetching) {
    return (
      <div className='w-full h-screen flex justify-center items-center relative'>
        <Loading />
      </div>
    );
  }

  const onclick = (data: string) => {
    navigate(paths.appointmentDetails, { state: data });
  };

  return (
    <div className='w-full h-full flex flex-row items-center bg-green-400 relative'>
      <Card className='h-full w-full flex flex-col px-8 sm:px-9 lg:px-10 pt-8 sm:pt-9 lg:pt-10 bg-green-600 border-none rounded-none rounded-l-xl'>
        <Card className='bg-white min-h-[60px] max-h-[60px] w-full mb-4 flex fles-row justify-end items-center px-5 sm:px-10 lg:px-20'>
          <UserType />
        </Card>
        <Card className='bg-white w-full h-full overflow-auto flex flex-col p-6 sm:p-8 lg:p-10'>
          <CardHeader className='w-full flex p-3 flex-col gap-5'>
            <CardTitle className=' text-green-400 font-montserrat font-bold text-[18px] text-left'>
              CITAS MÉDICAS
            </CardTitle>
            <div className='w-full h-full flex flex-row space-x-5'>
              <Input
                placeholder='Buscar'
                className='w-full h-[36px] bg-green-100/50 border-none rounded-md text-[15px] font-montserrat placeholder:text-green-400 placeholder:font-roboto placeholder:font-bold placeholder:text-[15px] focus-visible:ring-green-400'
              ></Input>
              <Button variant='btnGreen' className='h-[36px]'>
                <Search className='h-[17px] w-[17px] fill-current text-white mr-2' />
                Buscar
              </Button>
            </div>
          </CardHeader>
          <CardContent className='h-full p-3 overflow-auto scrollbar-edit'>
            <Table className='min-w-full text-sm overflow-hidden'>
              <TableHeader className='border-b-8 border-white bg-green-500   text-white'>
                <TableRow className='hover:bg-green-500'>
                  <TableHead>Cedula</TableHead>
                  <TableHead>Nombre Completo</TableHead>
                  <TableHead>Direccion</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Hora</TableHead>
                  <TableHead>Estatus</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className='h-[35px]'>
                {datalist &&
                  datalist.data.map((quotes) => (
                    <TableRow className='bg-green-600 border-b-2 border-white text-black font-roboto' key={quotes.id}>
                      <TableCell>{quotes.patientDNI}</TableCell>
                      <TableCell>{quotes.patientFullName}</TableCell>
                      <TableCell>{quotes.patientAddress}</TableCell>
                      <TableCell>
                        {quotes.appointmentDate ? format(quotes.appointmentDate, 'P', { locale: es }) : 'Sin fecha'}
                      </TableCell>
                      <TableCell>{quotes.appointmentHour}</TableCell>
                      <TableCell>{quotes.status}</TableCell>
                      <TableCell className='flex justify-center items-center'>
                        <Button variant={'ghost'} onClick={() => onclick(quotes.id)}>
                          <View className='fill-current text-green-400 h-4 w-4' />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Card>
    </div>
  );
}
