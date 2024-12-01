import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import { Plus } from 'lucide-react';
import { useState } from 'react';

import PaginationController from 'src/components/common/pagination';
import { RegisterTicketTypes } from 'src/components/modals/ticket-type/RegisterTicketTypes';
import { Dialog, DialogTrigger } from 'src/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'src/components/ui/table';
import LoadingWrapper from 'src/components/wrappers/LoadingWrapper';
import { MainContentWrapper } from 'src/components/wrappers/mainContentWrapper';
import { ticketTypeHttp } from 'src/services/api/ticket-type';
import { DEBOUNCE_DELAY } from 'src/utils/constants';
import { formatDate } from 'src/utils/utils';

export function registerTicketType() {
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
      <MainContentWrapper.Header title='TIPOS DE TICKET' withBrowser setSearchTerm={setSearchTerm} />
      <MainContentWrapper.Body>
        <LoadingWrapper isLoading={isFetching}>
          <Table className='min-w-full text-sm mb-4'>
            <TableHeader className='border-b-8 border-white bg-green-500 text-white'>
              <TableRow className='hover:bg-green-500'>
                <TableHead className='w-10 text-[12px] text-left'>Nombre</TableHead>
                <TableHead className='w-10 text-[12px] text-left'>Creado en</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className='h-[35px]'>
              {getData &&
                getData.data.map((ticketType) => (
                  <TableRow className='bg-green-600 border-b-2 border-white text-black font-roboto' key={ticketType.id}>
                    <TableCell className='pl-4 text-left'>{ticketType.name}</TableCell>
                    <TableCell className='pl-4 text-left'> {formatDate(ticketType.createdAt)}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </LoadingWrapper>
      </MainContentWrapper.Body>
      <MainContentWrapper.Footer className='relative'>
        <PaginationController totalPages={getData?.totalPages} setPage={setPage} />
        <div className='bg-green-400 rounded-full mb-8 mt-18 absolute top-0 right-0'>
          <Dialog>
            <DialogTrigger asChild>
              <div className='bg-green-400 rounded-full'>
                <Plus className='fill-current text-white w-[50px] h-[50px] cursor-pointer' />
              </div>
            </DialogTrigger>
            <RegisterTicketTypes title='REGISTRAR TIPO DE TICKET' alert='Tipo de Ticket' Recargar={refetch} />
          </Dialog>
        </div>
        ;
      </MainContentWrapper.Footer>
    </MainContentWrapper>
  );
}
