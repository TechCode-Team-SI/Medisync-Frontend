/* eslint-disable prettier/prettier */
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import { useState } from 'react';

import PaginationController from 'src/components/common/pagination';
import { ModalAssignArea } from 'src/components/modals/area/modalAssignArea';
import { UserType } from 'src/components/navbar/userType/userType';
import { Button } from 'src/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from 'src/components/ui/card';
import { Dialog, DialogTrigger } from 'src/components/ui/dialog';
import Edit from 'src/components/ui/icons/edit';
import Spinner from 'src/components/ui/icons/spinner';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'src/components/ui/table';
import { userHttp } from 'src/services/api/User';
import { DEBOUNCE_DELAY } from 'src/utils/constants';

export function AssignArea() {
  const [searchTerm] = useState('');
  const [page, setPage] = useState(1);
  const debouncedSearchTerm = useDebounce(searchTerm, DEBOUNCE_DELAY);
  const {
    data: getData,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: [debouncedSearchTerm, `${page}`, ``],
    queryFn: ({ queryKey }) =>
      userHttp.getMyEmployees({
        search: queryKey[0],
        page: queryKey[1],
      }),
  });

  return (
    <div className='w-full h-full flex flex-row items-center bg-green-400 relative'>
      <Card className='h-full w-full flex flex-col px-8 sm:px-9 lg:px-10 pt-8 sm:pt-9 lg:pt-10 bg-green-600 border-none rounded-none rounded-l-xl'>
        <Card className='bg-white min-h-[60px] max-h-[60px] w-full mb-4 flex flex-row justify-end items-center px-5 sm:px-10 lg:px-20'>
          <UserType />
        </Card>
        <Card className='bg-white w-full h-full overflow-auto scrollbar-edit flex flex-col p-6 sm:p-8 lg:p-10 gap-5'>
          <CardHeader className='w-full flex p-3 flex-col gap-5'>
            <CardTitle className='text-green-400 font-montserrat font-bold text-[18px] text-left'>
              ASIGNAR ÁREA EMPLEADO
            </CardTitle>
          </CardHeader>
          <CardContent className=' h-[500px] overflow-auto scrollbar-edit'>
            {isFetching ? (
              <div className='w-full h-full flex justify-center items-center'>
                <Spinner />
              </div>
            ) : (
              <Table className='min-w-full text-sm'>
                <TableHeader className='border-b-8 border-white bg-green-500 text-white'>
                  <TableRow className='hover:bg-green-500'>
                    <TableHead className='w-10 text-[12px] text-left'>Dni</TableHead>
                    <TableHead className='w-10 text-[12px] text-left'>Nombre Completo</TableHead>
                    <TableHead className='w-10 text-[12px] text-center'>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className='h-[35px]'>
                  {getData &&
                    getData.data.map((user) => (
                      <TableRow className='bg-green-600 border-b-2 border-white text-black font-roboto' key={user.id}>
                        <TableCell className='pl-4 text-left'>{user.employeeProfile?.dni}</TableCell>
                        <TableCell className='pl-4 text-left'>{user.fullName}</TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button className='bg-transparent hover:bg-transparent'>
                                <Edit className='fill-current text-green-400 h-4 w-4' />
                              </Button>
                            </DialogTrigger>
                            <ModalAssignArea user={user} Recargar={() => refetch()} />
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
          <CardFooter className='flex pb-3 '>
            <PaginationController totalPages={getData?.totalPages} setPage={setPage} />
          </CardFooter>
        </Card>
      </Card>
    </div>
  );
}
