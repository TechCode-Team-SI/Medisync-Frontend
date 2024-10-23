import { useMutation, useQuery } from '@tanstack/react-query';
import { Key } from 'lucide-react';
import { useState } from 'react';

import { UserType } from 'src/components/navbar/userType/userType';
import { Button } from 'src/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardImg, CardTitle } from 'src/components/ui/card';
import Search from 'src/components/ui/icons/search';
import Specialties from 'src/components/ui/icons/specialties';
import Spinner from 'src/components/ui/icons/spinner';
import { Input } from 'src/components/ui/input';
import { Loading } from 'src/components/ui/loading';
import { Switch } from 'src/components/ui/switch';
import { TableBody, TableCell, TableRow } from 'src/components/ui/table';
import { specialtiesHttp } from 'src/services/api/specialties';

export function DisableSpecialty() {
  const [editId, setEditId] = useState('');
  const {
    data: specialties,
    isFetching,
    isRefetching,
    refetch,
    isPaused,
  } = useQuery({
    queryKey: [],
    queryFn: specialtiesHttp.get,
  });

  const disabledSpecialty = useMutation({
    mutationKey: [''],
    mutationFn: specialtiesHttp.disabled,
    onSuccess: () => {
      setEditId('');
      refetch();
    },
  });
  if (isFetching && !isRefetching) {
    return (
      <div className='w-full h-screen flex justify-center items-center relative'>
        <Loading />
      </div>
    );
  }

  return (
    <div className='flex flex-row w-full h-screen items-center bg-green-400 relative'>
      <Card className='flex flex-col h-full w-full px-8 sm:px-9 lg:px-10 pt-8 sm:pt-9 lg:pt-10 bg-green-600 border-none rounded-none rounded-l-xl'>
        <Card className='bg-white min-h-[60px] max-h-[60px] w-full shadow-md mb-6 flex fles-row justify-end items-center px-5 sm:px-10 lg:px-20'>
          <UserType></UserType>
        </Card>
        <Card className='flex flex-col bg-white w-full h-full rounded-b-none overflow-auto scrollbar-edit p-6 pb-0 sm:pb-0 lg:p-10 lg:pb-0'>
          <CardHeader className='w-full flex flex-col space-y-5 mb-5'>
            <CardTitle className=' text-green-400 font-montserrat font-bold text-[15px] text-left'>
              DESHABILITAR ESPECIALIDADES
            </CardTitle>
            <div className='w-full h-full flex flex-row space-x-5'>
              <Input
                placeholder='Buscar'
                className='w-full h-[36px] bg-green-100/50 border-none rounded-md text-[15px] font-montserrat placeholder:text-green-400 placeholder:font-roboto placeholder:font-bold placeholder:text-[15px] focus-visible:ring-green-400'
              ></Input>
              <Button variant='btnGreen' className='h-[36px]'>
                <Search className='h-[17px] w-[17px] fill-current text-white mr-2' />
                Buscar
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <TableBody className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 mb-20'>
              {specialties?.data &&
                specialties.data.map((specialty) => (
                  <TableRow className='border-b-0' key={specialty.id}>
                    <TableCell>
                      <Card className='relative bg-green-50 shadow-md min-h-[310px] max-h-[310px] w-[227px] flex flex-col rounded-none border-spacing-0 border-0'>
                        <div>
                          <CardHeader className='bg-green-400 h-32 p-0 flex justify-center items-center rounded-none border-spacing-0'>
                            <CardImg
                              src=''
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
                        </div>
                        <CardFooter className='absolute self-center bottom-8 flex flex-col justify-center p-0'>
                          {editId === specialty.id ? (
                            <Spinner />
                          ) : (
                            <Switch
                              disabled={editId !== ''}
                              checked={!specialty.isDisabled}
                              onClick={() => {
                                setEditId(specialty.id);
                                disabledSpecialty.mutate({ id: specialty.id, isDisabled: !specialty.isDisabled });
                              }}
                            />
                          )}
                        </CardFooter>
                      </Card>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </CardContent>
        </Card>
      </Card>
    </div>
  );
}

// Pendiente (1):
