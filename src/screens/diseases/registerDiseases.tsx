/* eslint-disable prettier/prettier */
import { useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { useState } from 'react';

import { RegisterDisease } from 'src/components/modals/diseases/RegisterDiseases';
import { UserType } from 'src/components/navbar/userType/userType';
import { Button } from 'src/components/ui/button';
import { Card, CardTitle, CardContent, CardHeader, CardFooter } from 'src/components/ui/card';
import { Dialog, DialogTrigger } from 'src/components/ui/dialog';
import Search from 'src/components/ui/icons/search';
import { Input } from 'src/components/ui/input';
import { Loading } from 'src/components/ui/loading';
import { TableRow, TableBody, TableCell, Table, TableHeader, TableHead } from 'src/components/ui/table';
import { DiseaseHttp } from 'src/services/api/diseases';

export function registerDiseases() {
  const [, setOpenModal] = useState(false);

  const {
    data: getData,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: [''],
    queryFn: DiseaseHttp.getDisease,
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
              REGISTRAR ENFERMEDAD
            </CardTitle>
            <div className='w-full h-full flex flex-row gap-5'>
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
          <CardContent className='overflow-auto scrollbar-edit'>
            <Table className='min-w-full text-sm mb-4'>
              <TableHeader className='border-b-8 border-white bg-green-500 text-white'>
                <TableRow className='hover:bg-green-500'>
                  <TableHead className='w-10 text-[12px] text-left'>Nombre</TableHead>
                  <TableHead className='w-10 text-[12px] text-left'>Descripcion</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className='h-[35px]'>
                {getData &&
                  getData.data.map((diseases) => (
                    <TableRow
                      className='bg-green-600 border-b-2 border-white text-black font-roboto'
                      key={diseases.name}
                    >
                      <TableCell className='pl-4 text-left'>{diseases.name}</TableCell>
                      <TableCell className='pl-4 text-left'>{diseases.description}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className='h-20 flex flex-row-reverse'>
            <div className='bg-green-400 rounded-full mb-8 mt-18'>
              <Dialog>
                <DialogTrigger asChild>
                  <div className='bg-green-400 rounded-full'>
                    <Plus className='fill-current text-white w-[50px] h-[50px] cursor-pointer' />
                  </div>
                </DialogTrigger>
                <RegisterDisease
                  title='REGISTRAR ENFERMEDAD'
                  alert='Enfermedad'
                  onClose={() => setOpenModal(false)}
                  Recargar={() => refetch()}
                />
              </Dialog>
            </div>
          </CardFooter>
        </Card>
      </Card>
    </div>
  );
}
