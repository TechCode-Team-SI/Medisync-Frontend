/* eslint-disable prettier/prettier */
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PaginationController from 'src/components/common/pagination';
import { UserType } from 'src/components/navbar/userType/userType';
import { Button } from 'src/components/ui/button';
import { Card, CardTitle, CardContent, CardHeader, CardDescription, CardImg, CardFooter } from 'src/components/ui/card';
import MedicalStaff from 'src/components/ui/icons/medicalStaff';
import Spinner from 'src/components/ui/icons/spinner';
import { TableRow, TableBody, TableCell } from 'src/components/ui/table';
import { MainContentWrapper } from 'src/components/wrappers/mainContentWrapper';
import { paths } from 'src/paths';
import { registerMedicalHttp } from 'src/services/api/registerMedical';
import { DEBOUNCE_DELAY } from 'src/utils/constants';

export function EditMedical() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const debouncedSearchTerm = useDebounce(searchTerm, DEBOUNCE_DELAY);
  const { data: getData, isFetching } = useQuery({
    queryKey: [debouncedSearchTerm, `${page}`, ``],
    queryFn: ({ queryKey }) =>
      registerMedicalHttp.getMyMedical({
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
        <Card className='bg-white w-full h-full rounded-b-none overflow-auto scrollbar-edit flex flex-col p-6 pb-0 sm:p-8 sm:pb-0 lg:p-10 lg:pb-0 gap-5'>
          <MainContentWrapper.Header withBrowser setSearchTerm={setSearchTerm} title='EDITAR PERSONAL EMPLEADO' />
          <CardContent className='h-[460px] overflow-auto scrollbar-edit pb-0 mb-0 '>
            {isFetching ? (
              <div className='w-full h-full flex justify-center items-center'>
                <Spinner />
              </div>
            ) : (
              <TableBody className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-4 '>
                {getData &&
                  getData.data.map((Persona) => (
                    <TableRow className='border-b-0' key={Persona.id}>
                      <TableCell>
                        <Card className='bg-green-50 shadow-md h-52 w-52 flex flex-col rounded-none border-spacing-0 border-0'>
                          <CardHeader className='bg-green-400 h-32 p-0 flex justify-center items-center rounded-none border-spacing-0'>
                            <CardImg
                              src={Persona.photo ? Persona.photo.path : ''}
                              fallback={<MedicalStaff fill='white' className='h-24 w-24' />}
                              className='w-20 h-20'
                            />
                          </CardHeader>
                          <CardContent className='bg-green-50 px-2 py-1  text-center'>
                            <CardTitle className='text-black font-montserrat font-bold text-sm'>
                              {Persona.fullName}
                            </CardTitle>
                            <CardDescription className='text-black font-roboto font-medium text-xs '>
                              {'Especialidad'}
                            </CardDescription>
                            <div className='flex items-center justify-center mt-2 w-full'>
                              <Button
                                variant='btnGreen'
                                className='flex items-center justify-center w-[78px] h-[21px] text-[10px]'
                                onClick={() => {
                                  navigate(paths.editmedicalstaff, { state: Persona.id });
                                }}
                              >
                                Editar
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            )}
          </CardContent>
          <CardFooter className='h-20 flex flex-row pb-8 '>
            <PaginationController totalPages={getData?.totalPages} setPage={setPage} />
          </CardFooter>
        </Card>
      </Card>
    </div>
  );
}
