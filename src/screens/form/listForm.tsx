/* eslint-disable prettier/prettier */
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import PaginationController from 'src/components/common/pagination';
import { UserType } from 'src/components/navbar/userType/userType';
import { Card, CardContent, CardFooter, } from 'src/components/ui/card';
import Spinner from 'src/components/ui/icons/spinner';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'src/components/ui/table';
import { MainContentWrapper } from 'src/components/wrappers/mainContentWrapper';
import { paths } from 'src/paths';
import { requestTemplateHttp } from 'src/services/api/requestTemplate';
import { DEBOUNCE_DELAY } from 'src/utils/constants';

export function listForm() {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const debouncedSearchTerm = useDebounce(searchTerm, DEBOUNCE_DELAY);
  const {
    data: getData,
    isFetching,
  } = useQuery({
    queryKey: [debouncedSearchTerm, `${page}`, ],
    queryFn: ({ queryKey }) =>
      requestTemplateHttp.getMyRequestTemplate({
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
        <Card className='bg-white w-full h-full rounded-b-none overflow-auto scrollbar-edit flex flex-col p-6 pb-0 sm:p-8 sm:pb-0 lg:p-10 lg:pb-0 space-y-5'>
        <MainContentWrapper.Header withBrowser setSearchTerm={setSearchTerm} title='FORMULARIOS' />
          <CardContent className=' h-[450px] overflow-auto scrollbar-edit'>
            {getData?.data && !isFetching ? (
              <Table className='min-w-full text-sm mb-4'>
                <TableHeader className='border-b-8 border-white bg-green-500 text-white'>
                  <TableRow className='hover:bg-green-500'>
                    <TableHead className='w-10 text-[12px] text-left'>Plantilla</TableHead>
                    <TableHead className='w-10 text-[12px] text-left'>Descripcion</TableHead>
                    <TableHead className='w-10 text-[12px] text-left'>Fecha</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className='h-[35px]'>
                  {getData.data.map((requestTemplate) => (
                    <TableRow
                      className='bg-green-600 border-b-2 border-white text-black font-roboto'
                      key={requestTemplate.id}
                    >
                      <TableCell className='pl-4 text-left'>{requestTemplate.name}</TableCell>
                      <TableCell className='pl-4 text-left line-clamp-1'>{requestTemplate.description || ''}</TableCell>
                      <TableCell className='pl-4 text-left'>
                        {format(requestTemplate.createdAt, 'P', { locale: es })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className='w-full flex justify-center'>
                <Spinner />
              </div>
            )}
          </CardContent>
          <CardFooter className='h-20 flex flex-row'>
          <PaginationController totalPages={getData?.totalPages} setPage={setPage} />
            <div className='bg-green-400 rounded-full mb-20 mt-16'>
              <Link to={paths.createform}>
                <Plus className='fill-current text-white w-[50px] h-[50px] cursor-pointer' />
              </Link>
            </div>
          </CardFooter>
        </Card>
      </Card>
    </div>
  );
}
