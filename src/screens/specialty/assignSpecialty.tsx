/* eslint-disable prettier/prettier */
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import { useState } from 'react';

import PaginationController from 'src/components/common/pagination';
import { ModalAssignSpecialty } from 'src/components/modals/Specialty/assignSpecialty';
import { Button } from 'src/components/ui/button';
import { Dialog, DialogTrigger } from 'src/components/ui/dialog';
import Edit from 'src/components/ui/icons/edit';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'src/components/ui/table';
import LoadingWrapper from 'src/components/wrappers/LoadingWrapper';
import { MainContentWrapper } from 'src/components/wrappers/mainContentWrapper';
import { userHttp } from 'src/services/api/User';
import { DEBOUNCE_DELAY } from 'src/utils/constants';

export function AssignSpecialty() {
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
    <MainContentWrapper>
      <MainContentWrapper.Header title='ASIGNAR ESPECIALIDAD EMPLEADO' />
      <MainContentWrapper.Body className='h-[500px] flex-none'>
        <LoadingWrapper  isLoading={isFetching}>
          <Table className='min-w-full text-sm mb-4 '>
            <TableHeader className='border-b-8 border-white bg-green-500 text-white'>
              <TableRow className='hover:bg-green-500'>
                <TableHead className='w-10 text-[12px] text-left'>Dni</TableHead>
                <TableHead className='w-10 text-[12px] text-left'>Nombre Completo</TableHead>
                <TableHead className='w-10 text-[12px] text-center'>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className='h-[35px]'>
              {getData?.data &&
                getData.data.map((user) => {
                  console.log(user);
                  return (
                    <TableRow className='bg-green-600 border-b-2 border-white text-black font-roboto' key={user.id}>
                      <TableCell className='pl-4 text-left'>{user.employeeProfile?.dni}</TableCell>
                      <TableCell className='pl-4 text-left'>{user.fullName}</TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant={'ghost'}>
                              <Edit className='fill-current text-green-400 h-4 w-4' />
                            </Button>
                          </DialogTrigger>
                          <ModalAssignSpecialty user={user} Recargar={refetch} />
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </LoadingWrapper>
      </MainContentWrapper.Body>
      <MainContentWrapper.Footer>
        <PaginationController totalPages={getData?.totalPages} setPage={setPage} />
      </MainContentWrapper.Footer>
    </MainContentWrapper>
  );
}
