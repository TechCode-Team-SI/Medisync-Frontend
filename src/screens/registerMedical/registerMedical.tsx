/* eslint-disable prettier/prettier */
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import PaginationController from 'src/components/common/pagination';
import { UserType } from 'src/components/navbar/userType/userType';
import { Card, CardTitle, CardContent, CardHeader, CardDescription, CardImg, CardFooter } from 'src/components/ui/card';
import MedicalStaff from 'src/components/ui/icons/medicalStaff';
import Spinner from 'src/components/ui/icons/spinner';
import { TableRow, TableBody, TableCell } from 'src/components/ui/table';
import { MainContentWrapper } from 'src/components/wrappers/mainContentWrapper';
import { registerMedicalHttp } from 'src/services/api/registerMedical';
import { DEBOUNCE_DELAY } from 'src/utils/constants';

export function RegisterMedical() {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const debouncedSearchTerm = useDebounce(searchTerm, DEBOUNCE_DELAY);
  const {
    data: getData,
    isFetching,
  } = useQuery({
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
        <Card className='bg-white w-full h-full rounded-b-none overflow-auto scrollbar-edit flex flex-col p-6 pb-0 sm:p-8 sm:pb-0 lg:p-10 lg:pb-0 space-y-5'>
        <MainContentWrapper.Header withBrowser setSearchTerm={setSearchTerm} title='PERSONAL' />
          <CardContent className='h-[480px] overflow-auto scrollbar-edit '>
            {isFetching ? (
             <div className='w-full h-full flex justify-center items-center'>
             <Spinner />
           </div>
            ) : (
            <TableBody className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-4 mb-1'>
              {getData &&
                getData?.data.map((Persona) => (
                  <TableRow className='border-b-0' key={Persona.id}>
                    <TableCell>
                      <Card className='bg-green-50 shadow-md h-52 w-52 flex flex-col rounded-none border-spacing-0 border-0'>
                        <CardHeader className='bg-green-400 h-32 p-0 flex justify-center items-center rounded-none border-spacing-0'>
                          <CardImg
                            src={''}
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
                        </CardContent>
                      </Card>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
            )}
          </CardContent>
          <CardFooter className='h-20 flex flex-row '>
          <PaginationController totalPages={getData?.totalPages} setPage={setPage} />
       
            <div className='bg-green-400 rounded-full mb-32 mt-16'>
              <Link to='/registerMedicalStaff'>
                <Plus className='fill-current text-white w-[50px] h-[50px] cursor-pointer' />
              </Link>
            </div>
          </CardFooter>
        </Card>
      </Card>
    </div>
  );
}
