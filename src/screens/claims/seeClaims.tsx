/* eslint-disable prettier/prettier */
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useState } from 'react';

import PaginationController from 'src/components/common/pagination';
import { UserType } from 'src/components/navbar/userType/userType';
import { Button } from 'src/components/ui/button';
import { Card, CardContent, CardFooter } from 'src/components/ui/card';
import { Dialog, DialogTrigger } from 'src/components/ui/dialog';
import Spinner from 'src/components/ui/icons/spinner';
import View from 'src/components/ui/icons/view';
import { TableRow, TableBody, TableCell, Table, TableHeader, TableHead } from 'src/components/ui/table';
import { MainContentWrapper } from 'src/components/wrappers/mainContentWrapper';
import { claimHttp } from 'src/services/api/claims';
import { DEBOUNCE_DELAY } from 'src/utils/constants';

export function SeeClaims() {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const debouncedSearchTerm = useDebounce(searchTerm, DEBOUNCE_DELAY);
  const {
    data: getData,
    isFetching,
  } = useQuery({
    queryKey: [debouncedSearchTerm, `${page}`, ],
    queryFn: ({ queryKey }) =>
      claimHttp.getMyClaim({
        search: queryKey[0],
        page: queryKey[1],
      }),
  });

  return (
    <div className='w-full h-full flex flex-col items-center bg-green-400 relative'>
      <Card className='h-full w-full flex flex-col px-8 sm:px-9 lg:px-10 pt-8 sm:pt-9 lg:pt-10 bg-green-600 border-none rounded-none rounded-l-xl'>
        <Card className='bg-white min-h-[60px] max-h-[60px] w-full mb-4 flex fles-row justify-end items-center px-5 sm:px-10 lg:px-20'>
          <UserType></UserType>
        </Card>
        <Card className='bg-white w-full h-full  overflow-auto scrollbar-edit rounded-b-none  flex flex-col p-6 pb-0 sm:p-8 sm:pb-0 lg:p-10 lg:pb-0 space-y-5'>
        <MainContentWrapper.Header withBrowser setSearchTerm={setSearchTerm} title='VER RECLAMOS' />
          <CardContent className=' h-[550px] overflow-auto scrollbar-edit'>
            {isFetching ? (
             <div className='w-full h-full flex justify-center items-center'>
             <Spinner />
           </div>
            ) : (
            <Table className='min-w-full text-sm mb-0 overflow-hidden '>
              <TableHeader className='border-b-8 border-white bg-green-500 text-white'>
                <TableRow className='hover:bg-green-500'>
                  <TableHead className='w-10 text-[12px] text-left'>Titulo</TableHead>
                  <TableHead className='w-10 text-[12px] text-left'>Descripción</TableHead>
                  <TableHead className='w-10 text-[12px] text-left'>Usuario</TableHead>
                  <TableHead className='w-10 text-[12px] text-left'>Estado</TableHead>
                  <TableHead className='w-10 text-[12px] text-left'>Fecha</TableHead>
                  <TableHead className='w-10 text-[12px]'>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className='h-[35px]'>
                {getData &&
                  getData.data.map((claims) => (
                    <TableRow
                      className='bg-green-600 border-b-2 border-white text-black font-roboto'
                      key={claims.title}
                    >
                      <TableCell className='pl-4 text-left'>{claims.title}</TableCell>
                      <TableCell className='pl-4 text-left'>{claims.description}</TableCell>
                      <TableCell className='pl-4 text-left'>{claims.createdBy?.fullName}</TableCell>
                      <TableCell className='pl-4 text-left'>{claims.status}</TableCell>
                      <TableCell className='pl-4 text-left'>{format(claims.createdAt, 'P', { locale: es })}</TableCell>
                      <TableCell className='flex justify-center items-center'>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant={'ghost'}>
                              <View className='fill-current text-green-400 h-4 w-4' />
                            </Button>
                          </DialogTrigger>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            )}
          </CardContent>
          <CardFooter className='h-20 flex flex-row-reverse'>
          <PaginationController totalPages={getData?.totalPages} setPage={setPage} />
          </CardFooter>
        </Card>
      </Card>
    </div>
  );
}
