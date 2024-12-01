/* eslint-disable prettier/prettier */
import { useMutation, useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import { useState } from 'react';
import { toast } from 'sonner';

import { AlertExclamation } from 'src/components/alerts/alertExclamation';
import PaginationController from 'src/components/common/pagination';
import { Button } from 'src/components/ui/button';
import { Dialog, DialogTrigger } from 'src/components/ui/dialog';
import Trash from 'src/components/ui/icons/trash';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'src/components/ui/table';
import LoadingWrapper from 'src/components/wrappers/LoadingWrapper';
import { MainContentWrapper } from 'src/components/wrappers/mainContentWrapper';
import { ticketTypeHttp } from 'src/services/api/ticket-type';
import { DEBOUNCE_DELAY } from 'src/utils/constants';
import { formatDate } from 'src/utils/utils';

export function deleteTicketType() {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const debouncedSearchTerm = useDebounce(searchTerm, DEBOUNCE_DELAY);
  const {
    data: getData,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: [page, debouncedSearchTerm, 'ticket-type'],
    queryFn: ({ queryKey }) =>
      ticketTypeHttp.getTicketType({
        search: queryKey[1] as string,
        page: queryKey[0] as string,
      }),
  });

  const DeleteTicketType = useMutation({
    mutationKey: [''],
    mutationFn: ticketTypeHttp.deleteTicketType,
    onSuccess: () => {
      toast.success('Tipo de Ticket Eliminado Correctamente');
      console.log('Eliminado');
      refetch();
    },
    onError: () => {
      toast.error('Tipo de Ticket Eliminado Correctamente');
      console.log(DeleteTicketType.error?.message);
    },
  });

  return (
    <MainContentWrapper>
      <MainContentWrapper.Header title='ELIMINAR TIPO DE TICKET' withBrowser setSearchTerm={setSearchTerm} />
      <MainContentWrapper.Body>
        <LoadingWrapper isLoading={isFetching}>
          <Table className='min-w-full text-sm mb-4'>
            <TableHeader className='border-b-8 border-white bg-green-500 text-white'>
              <TableRow className='hover:bg-green-500'>
                <TableHead className='text-left'>Nombre</TableHead>
                <TableHead className=' text-left'>Creado en</TableHead>
                <TableHead className=' text-right '>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className='h-[35px]'>
              {getData &&
                getData.data.map((ticketType) => (
                  <TableRow className='bg-green-600 border-b-2 border-white text-black font-roboto' key={ticketType.id}>
                    <TableCell className='pl-4 text-left'>{ticketType.name}</TableCell>
                    <TableCell className='pl-4 text-left'> {formatDate(ticketType.createdAt)}</TableCell>
                    <TableCell className='flex justify-end items-center mr-5'>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant={'ghost'}>
                            <Trash className='fill-current text-green-400 h-4 w-4' />
                          </Button>
                        </DialogTrigger>
                        <AlertExclamation
                          title='¿Desea eliminar el tipo de ticket?'
                          deletePost={() => {
                            DeleteTicketType.mutate({
                              id: ticketType.id,
                              name: ticketType.name,
                              description: ticketType.description || '',
                            });
                            refetch();
                          }}
                        />
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
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
