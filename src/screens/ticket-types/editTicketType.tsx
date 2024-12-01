import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import { useState } from 'react';

import PaginationController from 'src/components/common/pagination';
import { RegisterTicketTypes } from 'src/components/modals/ticket-type/RegisterTicketTypes';
import { Button } from 'src/components/ui/button';
import { Dialog, DialogTrigger } from 'src/components/ui/dialog';
import Edit from 'src/components/ui/icons/edit';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'src/components/ui/table';
import LoadingWrapper from 'src/components/wrappers/LoadingWrapper';
import { MainContentWrapper } from 'src/components/wrappers/mainContentWrapper';
import { ticketTypeHttp } from 'src/services/api/ticket-type';
import { DEBOUNCE_DELAY } from 'src/utils/constants';
import { formatDate } from 'src/utils/utils';

export function editTicketType() {
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

  return (
    <MainContentWrapper>
      <MainContentWrapper.Header title='EDITAR TIPO DE TICKET' withBrowser setSearchTerm={setSearchTerm} />
      <MainContentWrapper.Body>
        <LoadingWrapper isLoading={isFetching}>
          <Table className='min-w-full text-sm mb-4'>
            <TableHeader className='border-b-8 border-white bg-green-500 text-white'>
              <TableRow className='hover:bg-green-500'>
                <TableHead className='text-left'>Nombre</TableHead>
                <TableHead className=' text-left'>Creado en</TableHead>
                <TableHead className=' text-right px-8 '>Acciones</TableHead>
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
                            <Edit className='fill-current text-green-400 h-4 w-4' />
                          </Button>
                        </DialogTrigger>
                        <RegisterTicketTypes
                          title='EDITAR TIPO DE TICKET'
                          alert='Tipo de Ticket'
                          id={ticketType.id}
                          titleTicketType={ticketType.name}
                          description={ticketType.description}
                          Recargar={refetch}
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
