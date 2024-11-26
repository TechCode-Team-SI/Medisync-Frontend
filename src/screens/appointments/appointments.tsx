/* eslint-disable prettier/prettier */
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PaginationController from 'src/components/common/pagination';
import { UserType } from 'src/components/navbar/userType/userType';
import { Button } from 'src/components/ui/button';
import { Card, CardContent, CardFooter } from 'src/components/ui/card';
import Spinner from 'src/components/ui/icons/spinner';
import View from 'src/components/ui/icons/view';
import { TableCell, TableRow, TableBody, Table, TableHead, TableHeader } from 'src/components/ui/table';
import { MainContentWrapper } from 'src/components/wrappers/mainContentWrapper';
import { paths } from 'src/paths';
import { RequestsHttp } from 'src/services/api/request';
import { DEBOUNCE_DELAY } from 'src/utils/constants';

export function Appointments() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const debouncedSearchTerm = useDebounce(searchTerm, DEBOUNCE_DELAY);
  const {
    data: datalist,
    isFetching,
  } = useQuery({
    queryKey: [debouncedSearchTerm, `${page}`, ``],
    queryFn: ({ queryKey }) =>
      RequestsHttp.getSeeRequests({
        search: queryKey[0],
        page: queryKey[1],
      }),
  });

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
        <MainContentWrapper.Header withBrowser setSearchTerm={setSearchTerm} title='CITAS MÉDICAS' />
          <CardContent className=' h-[500px] overflow-auto scrollbar-edit'>
            {isFetching ? (
              <div className='w-full h-full flex justify-center items-center'>
                <Spinner />
              </div>
            ) : (
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
            )}
          </CardContent>
          <CardFooter className='h-20 flex flex-row'>
            <PaginationController totalPages={datalist?.totalPages} setPage={setPage} />
          </CardFooter>
        </Card>
      </Card>
    </div>
  );
}
