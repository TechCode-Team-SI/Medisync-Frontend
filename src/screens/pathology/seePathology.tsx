/* eslint-disable prettier/prettier */
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import { useState } from 'react';

import PaginationController from 'src/components/common/pagination';
import { SeePathology } from 'src/components/modals/Pathology/seePathology';
import { UserType } from 'src/components/navbar/userType/userType';
import { Button } from 'src/components/ui/button';
import { Card, CardContent, CardFooter } from 'src/components/ui/card';
import { Dialog, DialogTrigger } from 'src/components/ui/dialog';
import Spinner from 'src/components/ui/icons/spinner';
import View from 'src/components/ui/icons/view';
import { TableRow, TableBody, TableCell, Table, TableHeader, TableHead } from 'src/components/ui/table';
import { MainContentWrapper } from 'src/components/wrappers/mainContentWrapper';
import { PathologyHttp } from 'src/services/api/pathology';
import { DEBOUNCE_DELAY } from 'src/utils/constants';

export function seePathology() {
  const [, setOpenModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const debouncedSearchTerm = useDebounce(searchTerm, DEBOUNCE_DELAY);
  const { data: getData, isFetching } = useQuery({
    queryKey: [debouncedSearchTerm, `${page}`, ``],
    queryFn: ({ queryKey }) =>
      PathologyHttp.getMyPathology({
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
          <MainContentWrapper.Header withBrowser setSearchTerm={setSearchTerm} title='VER PATOLOGIA' />
          <CardContent className=' h-[480px] overflow-auto scrollbar-edit'>
            {isFetching ? (
              <div className='w-full h-full flex justify-center items-center'>
                <Spinner />
              </div>
            ) : (
              <Table className='min-w-full text-sm mb-4'>
                <TableHeader className='border-b-8 border-white bg-green-500 text-white'>
                  <TableRow className='hover:bg-green-500'>
                    <TableHead className='text-left'>Nombre</TableHead>
                    <TableHead className=' text-left'>Descripcion</TableHead>
                    <TableHead className=' text-right px-8 '>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className='h-[35px]'>
                  {getData &&
                    getData.data.map((pathology) => (
                      <TableRow
                        className='bg-green-600 border-b-2 border-white text-black font-roboto'
                        key={pathology.id}
                      >
                        <TableCell className='pl-4 text-left'>{pathology.name}</TableCell>
                        <TableCell className='pl-4 text-left'>{pathology.description}</TableCell>
                        <TableCell className='flex justify-end items-center mr-9'>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                className='pr-5'
                                variant={'ghost'}
                                onClick={() => {
                                  setOpenModal(true);
                                }}
                              >
                                <View className='fill-current text-green-400 h-4 w-4' />
                              </Button>
                            </DialogTrigger>
                            <SeePathology
                              title='DETALLES DEL PATOLOGIA'
                              titleInjury={pathology.name}
                              descriptionInjury={pathology.description}
                              onClose={() => {
                                setOpenModal(false);
                              }}
                            />
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
          <CardFooter className='h-20 flex pb-4 mb-8 flex-row'>
            <PaginationController totalPages={getData?.totalPages} setPage={setPage} />
          </CardFooter>
        </Card>
      </Card>
    </div>
  );
}
