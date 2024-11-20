/* eslint-disable prettier/prettier */
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
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
import { User } from 'src/services/api/interface';
import { userHttp } from 'src/services/api/User';
import { DEBOUNCE_DELAY } from 'src/utils/constants';

export function UserView() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const debouncedSearchTerm = useDebounce(searchTerm, DEBOUNCE_DELAY);
  const {
    data: getData,
    isFetching,
  } = useQuery({
    queryKey: [debouncedSearchTerm, `${page}`],
    queryFn: async ({ queryKey }) =>
      userHttp.getMyEmployees({
        search: queryKey[0],
        page: queryKey[1],
      }),
  });

  const onclick = (data: User) => {
    navigate(paths.userviewdetail, { state: data });
  };

  return (
    <div className='w-full h-full flex flex-row items-center bg-green-400 relative'>
      <Card className='h-full w-full flex flex-col px-8 sm:px-9 lg:px-10 pt-8 sm:pt-9 lg:pt-10 bg-green-600 border-none rounded-none rounded-l-xl'>
        <Card className='bg-white min-h-[60px] max-h-[60px] w-full mb-4 flex flex-row justify-end items-center px-5 sm:px-10 lg:px-20'>
          <UserType />
        </Card>
        <Card className='bg-white w-full h-full overflow-auto scrollbar-edit flex flex-col p-6 sm:p-8 lg:p-10 gap-5'>
        <MainContentWrapper.Header withBrowser setSearchTerm={setSearchTerm} title='USUARIOS' />
          <CardContent className=' h-[550px] '>
            {isFetching ? (
             <div className='w-full h-full flex justify-center items-center'>
             <Spinner />
           </div>
            ) : (
            <Table className='min-w-full text-sm'>
              <TableHeader className='border-b-8 border-white bg-green-500 text-white'>
                <TableRow className='hover:bg-green-500'>
                  <TableHead>Nombre Apellido</TableHead>
                  <TableHead>Correo</TableHead>
                  <TableHead>Teléfono</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className='h-[35px]'>
                {getData?.data.map((datalist) => (
                  <TableRow className='bg-green-600 border-b-2 border-white text-black font-roboto' key={datalist.id}>
                    <TableCell>{datalist.fullName}</TableCell>
                    <TableCell>{datalist.email}</TableCell>
                    <TableCell>{datalist.phone}</TableCell>
                    <TableCell className='flex justify-center items-center'>
                      <Button variant={'ghost'} type='button' onClick={() => onclick(datalist)}>
                        <View className='fill-current text-green-400 h-4 w-4' />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            )}
          </CardContent>
          <CardFooter className='h-20 flex '>
          <PaginationController totalPages={getData?.totalPages} setPage={setPage} />
          </CardFooter>
        </Card>
      </Card>
    </div>
  );
}
