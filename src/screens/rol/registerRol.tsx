/* eslint-disable prettier/prettier */
import { Plus } from 'lucide-react';

import { RegisterRoles } from 'src/components/modals/RegisterRoles';
import { UserType } from 'src/components/navbar/userType/userType';
import { Card, CardTitle, CardContent, CardHeader, CardFooter } from 'src/components/ui/card';
import { Dialog, DialogTrigger } from 'src/components/ui/dialog';
import { TableRow, TableBody, TableCell, Table, TableHeader, TableHead } from 'src/components/ui/table';

const rolName = [
  {
    name: 'Master',
    description: 'Rol de alto rango para pacientes con muchas cosas',
  },
  {
    name: 'Master',
    description: 'Rol de alto rango para pacientes con muchas cosas',
  },
  {
    name: 'Master',
    description: 'Rol de alto rango para pacientes con muchas cosas',
  },
  {
    name: 'Master',
    description: 'Rol de alto rango para pacientes con muchas cosas',
  },
  {
    name: 'Master',
    description: 'Rol de alto rango para pacientes con muchas cosas',
  },
  {
    name: 'Master',
    description: 'Rol de alto rango para pacientes con muchas cosas',
  },
  {
    name: 'Master',
    description: 'Rol de alto rango para pacientes con muchas cosas',
  },
  {
    name: 'Master',
    description: 'Rol de alto rango para pacientes con muchas cosas',
  },
  {
    name: 'Master',
    description: 'Rol de alto rango para pacientes con muchas cosas',
  },
  {
    name: 'Master',
    description: 'Rol de alto rango para pacientes con muchas cosas',
  },

  {
    name: 'Master',
    description: 'Rol de alto rango para pacientes con muchas cosas',
  },
  {
    name: 'Master',
    description: 'Rol de alto rango para pacientes con muchas cosas',
  },
  {
    name: 'Master',
    description: 'Rol de alto rango para pacientes con muchas cosas',
  },
  {
    name: 'Master',
    description: 'Rol de alto rango para pacientes con muchas cosas',
  },
  {
    name: 'Master',
    description: 'Rol de alto rango para pacientes con muchas cosas',
  },
  {
    name: 'Master',
    description: 'Rol de alto rango para pacientes con muchas cosas',
  },
];
export function registerRol() {
  return (
    <div className='w-full h-full flex flex-col items-center bg-green-400 relative'>
      <Card className='h-full w-full flex flex-col px-8 sm:px-9 lg:px-10 pt-8 sm:pt-9 lg:pt-10 bg-green-600 border-none rounded-none rounded-l-xl'>
        <Card className='bg-white min-h-[60px] max-h-[60px] w-full mb-4 flex fles-row justify-end items-center px-5 sm:px-10 lg:px-20'>
          <UserType></UserType>
        </Card>
        <Card className='bg-white w-full h-full rounded-b-none overflow-auto scrollbar-edit flex flex-col p-6 pb-0 sm:p-8 sm:pb-0 lg:p-10 lg:pb-0 space-y-5'>
          <CardHeader className='w-full flex p-3 flex-col space-y-5'>
            <CardTitle className=' text-green-400 font-montserrat font-bold text-[18px] text-left'>
              REGISTRAR ROL
            </CardTitle>
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
                {rolName.map((rolName) => (
                  <TableRow className='bg-green-600 border-b-2 border-white text-black font-roboto' key={rolName.name}>
                    <TableCell className='pl-4 text-left'>{rolName.name}</TableCell>
                    <TableCell className='pl-4 text-left'>{rolName.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className='h-20 flex flex-row-reverse'>
            <div className='bg-green-400 rounded-full mb-8 mt-16'>
              <Dialog>
                <DialogTrigger asChild>
                  <div className='bg-green-400 rounded-full'>
                    <Plus className='fill-current text-white w-[50px] h-[50px] cursor-pointer' />
                  </div>
                </DialogTrigger>
                <RegisterRoles />
              </Dialog>
            </div>
          </CardFooter>
        </Card>
      </Card>
    </div>
  );
}
