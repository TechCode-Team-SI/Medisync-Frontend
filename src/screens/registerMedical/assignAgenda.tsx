/* eslint-disable prettier/prettier */
import { Link } from 'react-router-dom';

import { UserType } from 'src/components/navbar/userType/userType';
import { Button } from 'src/components/ui/button';
import { Card, CardTitle, CardContent, CardHeader } from 'src/components/ui/card';
import Search from 'src/components/ui/icons/search';
import View from 'src/components/ui/icons/view';
import { Input } from 'src/components/ui/input';
import { TableRow, TableBody, TableCell, TableHead, TableHeader, Table } from 'src/components/ui/table';

const Usuario = [
  {
    Personal: 'Ricardo Mathias',
    Agenda: 'Agenda 1',
    Fecha: '2024-08-20 10:00 AM',
  },
  {
    Personal: 'Douglas Mathias',
    Agenda: 'Agenda 1',
    Fecha: '2024-08-20 10:00 AM',
  },
  {
    Personal: 'Douglas Mathias',
    Agenda: 'Agenda 1',
    Fecha: '2024-08-20 10:00 AM',
  },
  {
    Personal: 'Douglas Mathias',
    Agenda: 'Agenda 1',
    Fecha: '2024-08-20 10:00 AM',
  },
  {
    Personal: 'Douglas Mathias',
    Agenda: 'Agenda 1',
    Fecha: '2024-08-20 10:00 AM',
  },
];

export function AssignAgenda() {
  return (
    <div className='w-full h-full flex flex-col items-center bg-green-400 relative'>
      <Card className='h-full w-full flex flex-col px-8 sm:px-9 lg:px-10 pt-8 sm:pt-9 lg:pt-10 bg-green-600 border-none rounded-none rounded-l-xl'>
        <Card className='bg-white min-h-[60px] max-h-[60px] w-full mb-4 flex fles-row justify-end items-center px-5 sm:px-10 lg:px-20'>
          <UserType></UserType>
        </Card>
        <Card className='bg-white w-full h-full rounded-b-none overflow-auto scrollbar-edit flex flex-col p-6 pb-0 sm:p-8 sm:pb-0 lg:p-10 lg:pb-0 gap-5'>
          <CardHeader className='w-full flex p-3 flex-col gap-5'>
            <CardTitle className=' text-green-400 font-montserrat font-bold text-[15px] ml-2 text-left'>
              ASIGNAR AGENDA
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
          <CardContent className='h-full p-3 overflow-auto scrollbar-edit'>
            <Table className='min-w-full text-sm'>
              <TableHeader className='border-b-8 border-white bg-green-500 text-white'>
                <TableRow className='hover:bg-green-500'>
                  <TableHead>Personal</TableHead>
                  <TableHead>Agenda</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className='h-[35px]'>
                {Usuario.map((usuario) => (
                  <TableRow
                    className='bg-green-600 border-b-2 border-white text-black font-roboto'
                    key={usuario.Personal}
                  >
                    <TableCell>{usuario.Personal}</TableCell>
                    <TableCell>{usuario.Agenda}</TableCell>
                    <TableCell>{usuario.Fecha}</TableCell>
                    <TableCell className='flex justify-center items-center'>
                      <Link to='/assignAgendaEdit'>
                        <View className='fill-current text-green-400 h-4 w-4' />
                      </Link>
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
