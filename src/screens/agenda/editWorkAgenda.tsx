import { useQuery } from '@tanstack/react-query';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { UserType } from 'src/components/navbar/userType/userType';
import { Button } from 'src/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from 'src/components/ui/card';
import Edit from 'src/components/ui/icons/edit';
import Search from 'src/components/ui/icons/search';
import { Input } from 'src/components/ui/input';
import { Loading } from 'src/components/ui/loading';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'src/components/ui/table';
import { paths } from 'src/paths';
import { AgendaHttp } from 'src/services/api/agenda';
import { Agenda } from 'src/services/api/interface';

export function EditWorkAgenda() {
  const navigate = useNavigate();
  const { data: getData, isFetching } = useQuery({
    queryKey: ['agenda'],
    queryFn: AgendaHttp.getAgenda,
  });

  const onclick = (data: Agenda) => {
    navigate(paths.editagenda, { state: data });
  };

  if (isFetching) {
    return (
      <div className='w-full h-screen flex justify-center items-center relative'>
        <Loading />
      </div>
    );
  }

  return (
    <div className='w-full h-screen flex flex-row items-center bg-green-400 relative'>
      <Card className='h-full w-full flex flex-col px-8 sm:px-9 lg:px-10 pt-8 sm:pt-9 lg:pt-10 bg-green-600 border-none rounded-none rounded-l-xl'>
        <Card className='bg-white min-h-[60px] max-h-[60px] w-full mb-4 flex flex-row justify-end items-center px-5 sm:px-10 lg:px-20'>
          <UserType />
        </Card>
        <Card className='bg-white w-full h-full overflow-auto flex flex-col p-6 sm:p-8 lg:p-10'>
          <CardHeader className='w-full flex p-3 flex-col gap-5'>
            <CardTitle className=' text-green-400 font-montserrat font-bold text-[18px] text-left'>
              EDITAR AGENDA
            </CardTitle>
            <div className='w-full h-full flex flex-row gap-5'>
              <Input
                placeholder='Buscar'
                className='w-full h-[36px] bg-green-100/50 border-none rounded-md text-[15px] font-montserrat placeholder:text-green-400 placeholder:font-roboto placeholder:font-bold placeholder:text-[15px] focus-visible:ring-green-400'
              />
              <Button variant='btnGreen' className='h-[36px]'>
                <Search className='h-[17px] w-[17px] fill-current text-white mr-2' />
                Buscar
              </Button>
            </div>
          </CardHeader>
          <CardContent className='h-full p-3 overflow-auto scrollbar-edit'>
            <Table className='min-w-full text-sm'>
              <TableHeader className='border-b-8 border-white bg-green-500 text-white'>
                <TableRow className='hover:bg-green-500'>
                  <TableHead className='text-left'>Nombre</TableHead>
                  <TableHead className='text-right'>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className='h-[35px]'>
                {getData &&
                  getData.data.map((agenda) => (
                    <TableRow className='bg-green-600 border-b-2 border-white text-black font-roboto' key={agenda.id}>
                      <TableCell className='px-4 text-left'>{agenda.name}</TableCell>
                      <TableCell className='flex justify-end items-center mr-10'>
                        <Button variant={'ghost'} type='button' onClick={() => onclick(agenda)}>
                          <Edit className='fill-current text-green-400 h-4 w-4' />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Card>
    </div>
  );
}
