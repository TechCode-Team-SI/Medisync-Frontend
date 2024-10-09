/* eslint-disable prettier/prettier */
import { RegisterInjuries } from 'src/components/modals/RegisterInjuries';
import { UserType } from 'src/components/navbar/userType/userType';
import { Button } from 'src/components/ui/button';
import { Card, CardTitle, CardContent, CardHeader, CardFooter } from 'src/components/ui/card';
import { Dialog, DialogTrigger } from 'src/components/ui/dialog';
import Edit from 'src/components/ui/icons/edit';
import Search from 'src/components/ui/icons/search';
import { Input } from 'src/components/ui/input';
import { TableRow, TableBody, TableCell, Table, TableHeader, TableHead } from 'src/components/ui/table';

const symptom = [
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
export function editSymptom() {
  return (
    <div className='w-full h-full flex flex-col items-center bg-green-400 relative'>
      <Card className='h-full w-full flex flex-col px-8 sm:px-9 lg:px-10 pt-8 sm:pt-9 lg:pt-10 bg-green-600 border-none rounded-none rounded-l-xl'>
        <Card className='bg-white min-h-[60px] max-h-[60px] w-full mb-4 flex fles-row justify-end items-center px-5 sm:px-10 lg:px-20'>
          <UserType></UserType>
        </Card>
        <Card className='bg-white w-full h-full rounded-b-none overflow-auto scrollbar-edit flex flex-col p-6 pb-0 sm:p-8 sm:pb-0 lg:p-10 lg:pb-0 space-y-5'>
          <CardHeader className='w-full flex p-3 flex-col space-y-5'>
            <CardTitle className=' text-green-400 font-montserrat font-bold text-[18px] text-left'>
              EDITAR SINTOMA
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
                  <TableHead className='text-left'>Nombre</TableHead>
                  <TableHead className=' text-left'>Descripcion</TableHead>
                  <TableHead className=' text-right '>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className='h-[35px]'>
                {symptom.map((symptom) => (
                  <TableRow className='bg-green-600 border-b-2 border-white text-black font-roboto' key={symptom.name}>
                    <TableCell className='pl-4 text-left'>{symptom.name}</TableCell>
                    <TableCell className='pl-4 text-left'>{symptom.description}</TableCell>
                    <TableCell className='flex justify-end items-center mr-5'>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className='bg-transparent hover:bg-transparent'>
                            <Edit className='fill-current text-green-400 h-4 w-4' />
                          </Button>
                        </DialogTrigger>
                        <RegisterInjuries title='REGISTRAR SINTOMA' alert='Sintoma' />
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