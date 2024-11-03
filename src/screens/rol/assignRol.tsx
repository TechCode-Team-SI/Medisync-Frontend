/* eslint-disable prettier/prettier */
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { SeeRol } from 'src/components/modals/Role/seeRol';
import { UserType } from 'src/components/navbar/userType/userType';
import { Button } from 'src/components/ui/button';
import { Card, CardTitle, CardContent, CardHeader, CardFooter } from 'src/components/ui/card';
import { Dialog, DialogTrigger } from 'src/components/ui/dialog';
import View from 'src/components/ui/icons/view';
import { Loading } from 'src/components/ui/loading';
import { TableRow, TableBody, TableCell, Table, TableHeader, TableHead } from 'src/components/ui/table';
import { userHttp } from 'src/services/api/User';

export function assignRol() {
  const [, setOpenModal] = useState(false);

  const {
    data: datalist,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: [''],
    queryFn: userHttp.get,
  });
  if (isFetching) {
    return (
      <div className='w-full h-screen flex justify-center items-center relative'>
        <Loading />
      </div>
    );
  }
  return (
    <div className='w-full h-full flex flex-col items-center bg-green-400 relative'>
      <Card className='h-full w-full flex flex-col px-8 sm:px-9 lg:px-10 pt-8 sm:pt-9 lg:pt-10 bg-green-600 border-none rounded-none rounded-l-xl'>
        <Card className='bg-white min-h-[60px] max-h-[60px] w-full mb-4 flex fles-row justify-end items-center px-5 sm:px-10 lg:px-20'>
          <UserType></UserType>
        </Card>
        <Card className='bg-white w-full h-full rounded-b-none overflow-auto scrollbar-edit flex flex-col p-6 pb-0 sm:p-8 sm:pb-0 lg:p-10 lg:pb-0 space-y-5'>
          <CardHeader className='w-full flex p-3 flex-col space-y-5'>
            <CardTitle className=' text-green-400 font-montserrat font-bold text-[18px] text-left'>
              DETALLES ROL
            </CardTitle>
          </CardHeader>
          <CardContent className='overflow-auto scrollbar-edit'>
            <Table className='min-w-full text-sm mb-4'>
              <TableHeader className='border-b-8 border-white bg-green-500 text-white'>
                <TableRow className='hover:bg-green-500'>
                  <TableHead className='w-10 text-[12px] text-left'>Dni</TableHead>
                  <TableHead className='w-10 text-[12px] text-left'>Nombre Completo</TableHead>
                  <TableHead className='w-10 text-[12px] text-center'>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className='h-[35px]'>
                {datalist &&
                  datalist.data.map((user) => (
                    <TableRow className='bg-green-600 border-b-2 border-white text-black font-roboto' key={user.id}>
                      <TableCell className='pl-4 text-left'>{user.employeeProfile?.dni}</TableCell>
                      <TableCell className='pl-4 text-left'>{user.fullName}</TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button className='bg-transparent hover:bg-transparent'>
                              <View className='fill-current text-green-400 h-4 w-4' />
                            </Button>
                          </DialogTrigger>
                          <SeeRol user={user} onClose={() => setOpenModal(false)} Recargar={() => refetch()} />
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className='h-20 flex flex-row-reverse'></CardFooter>
        </Card>
      </Card>
    </div>
  );
}
