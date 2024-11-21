/* eslint-disable prettier/prettier */
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import { useState } from 'react';

import PaginationController from 'src/components/common/pagination';
import { ModalRegisterSpecialty } from 'src/components/modals/Specialty/modalRegisterSpecialty';
import { UserType } from 'src/components/navbar/userType/userType';
import { Button } from 'src/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardImg, CardTitle } from 'src/components/ui/card';
import { Dialog, DialogTrigger } from 'src/components/ui/dialog';
import Specialties from 'src/components/ui/icons/specialties';
import Spinner from 'src/components/ui/icons/spinner';
import { TableBody, TableCell, TableRow } from 'src/components/ui/table';
import { MainContentWrapper } from 'src/components/wrappers/mainContentWrapper';
import { specialtiesHttp } from 'src/services/api/specialties';
import { DEBOUNCE_DELAY } from 'src/utils/constants';

export function EditSpecialty() {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const debouncedSearchTerm = useDebounce(searchTerm, DEBOUNCE_DELAY);
  const {
    data: getData,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: [debouncedSearchTerm, `${page}`, '8'],
    queryFn: async ({ queryKey }) =>
      specialtiesHttp.getMySpecialty({
        search: queryKey[0],
        page: queryKey[1],
        limit: queryKey[2],
        isDisabled: false,
      }),
  });

  return (
    <div className='w-full h-screen flex flex-row items-center bg-green-400 relative'>
      <Card className='h-full w-full flex flex-col px-8 sm:px-9 lg:px-10 pt-8 sm:pt-9 lg:pt-10 bg-green-600 border-none rounded-none rounded-l-xl'>
        <Card className='bg-white min-h-[60px] max-h-[60px] w-full shadow-md mb-6 flex fles-row justify-end items-center px-5 sm:px-10 lg:px-20'>
          <UserType></UserType>
        </Card>
        <Card className='bg-white w-full h-full rounded-b-none overflow-auto scrollbar-edit flex flex-col p-6 pb-0 sm:pb-0 lg:p-10 lg:pb-0'>
        <MainContentWrapper.Header withBrowser setSearchTerm={setSearchTerm} title='EDITAR
         ESPECIALIDADES' />
          <CardContent className=' h-[700px] overflow-auto scrollbar-edit'>
            {isFetching ? (
             <div className='w-full h-full flex justify-center items-center'>
             <Spinner />
           </div>
            ) : (
    
            <TableBody className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 mb-0'>
              {getData &&
                getData.data.map((specialty) => (
                  <TableRow className='border-b-0' key={specialty.id}>
                    <TableCell>
                      <Card className='relative bg-green-50 shadow-md min-h-[310px] max-h-[310px] w-[227px] flex flex-col rounded-none border-spacing-0 border-0'>
                        <CardHeader className='bg-green-400 h-32 p-0 flex justify-center items-center rounded-none border-spacing-0'>
                          <CardImg
                            src={specialty.image ? specialty.image.path : ''}
                            fallback={<Specialties fill='white' className='h-24 w-24' />}
                            className='w-20 h-20'
                          />
                        </CardHeader>
                        <CardContent className='flex flex-col min-h-full max-h-full bg-green-50 px-2 py-1 overflow-y-auto text-center'>
                          <CardTitle className='text-black font-montserrat font-bold text-sm mt-2 mb-5'>
                            {specialty.name}
                          </CardTitle>
                          <CardDescription className='text-black text-justify font-roboto font-medium text-[9px]'>
                            {specialty.description}
                          </CardDescription>
                        </CardContent>
                        <CardFooter className='flex flex-col absolute self-center bottom-8 justify-center p-0'>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button className='bg-green-300 w-[90px] h-[30px] text-[12px]' variant={'btnGreen'}>
                                Editar
                              </Button>
                            </DialogTrigger>
                            <ModalRegisterSpecialty specialty={specialty} onClose={refetch} />
                          </Dialog>
                        </CardFooter>
                      </Card>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
              )}
          </CardContent>
          
          <CardFooter className='mb-4 h-20 flex '>
          <PaginationController totalPages={getData?.totalPages} setPage={setPage} />
          </CardFooter>
          
        </Card>
      </Card>
    </div>
  );
}
