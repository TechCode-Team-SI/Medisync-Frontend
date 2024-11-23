/* eslint-disable prettier/prettier */
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import PaginationController from 'src/components/common/pagination';
import { UserType } from 'src/components/navbar/userType/userType';
import { Card, CardContent, CardFooter } from 'src/components/ui/card';
import Spinner from 'src/components/ui/icons/spinner';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'src/components/ui/table';
import { MainContentWrapper } from 'src/components/wrappers/mainContentWrapper';
import { AgendaHttp } from 'src/services/api/agenda';
import { DEBOUNCE_DELAY } from 'src/utils/constants';

export function WorkAgenda() {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const debouncedSearchTerm = useDebounce(searchTerm, DEBOUNCE_DELAY);
  const {
    data: getData,
    isFetching,
  } = useQuery({
    queryKey: [debouncedSearchTerm, `${page}`, ``],
    queryFn: ({ queryKey }) =>
      AgendaHttp.getMyAgenda({
        search: queryKey[0],
        page: queryKey[1],
      }),
  });

  return (
    <div className='w-full h-screen flex flex-row items-center bg-green-400 relative'>
      <Card className='h-full w-full flex flex-col px-8 sm:px-9 lg:px-10 pt-8 sm:pt-9 lg:pt-10 bg-green-600 border-none rounded-none rounded-l-xl'>
        <Card className='bg-white min-h-[60px] max-h-[60px] w-full mb-4 flex flex-row justify-end items-center px-5 sm:px-10 lg:px-20'>
          <UserType />
        </Card>
        <Card className='bg-white w-full h-full overflow-auto flex flex-col p-6 sm:p-8 lg:p-10'>
          <MainContentWrapper.Header withBrowser setSearchTerm={setSearchTerm} title='REGISTRAR AGENDA' />
          <CardContent className=' h-[480px] overflow-auto scrollbar-edit'>
            {isFetching ? (
              <div className='w-full h-full flex justify-center items-center'>
                <Spinner />
              </div>
            ) : (
            <Table className='min-w-full text-sm'>
              <TableHeader className='border-b-8 border-white bg-green-500 text-white'>
                <TableRow className='hover:bg-green-500'>
                  <TableHead className='text-left'>Nombre</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className='h-[35px]'>
                {getData &&
                  getData.data.map((agenda) => (
                    <TableRow className='bg-green-600 border-b-2 border-white text-black font-roboto' key={agenda.id}>
                      <TableCell className='px-4 text-left'>{agenda.name}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            )}
              </CardContent>
             <CardFooter className='h-20 flex flex-row'>
             <PaginationController totalPages={getData?.totalPages} setPage={setPage} />
            <div className='flex justify-end mt-4'>
              <Link to='/registerAgenda'>
                <div className='flex items-center justify-center h-[50px] w-[50px] rounded-full bg-green-400'>
                  <Plus className='fill-current text-white w-[50px] h-[50px] cursor-pointer' />
                </div>
              </Link>
            </div>
            </CardFooter>
        

        </Card>
      </Card>
    </div>
  );
}
