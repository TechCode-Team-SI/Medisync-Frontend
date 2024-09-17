/* eslint-disable prettier/prettier */
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

import { UserType } from 'src/components/navbar/userType/userType';
import { Button } from 'src/components/ui/button';
import { Card, CardTitle, CardContent, CardHeader, CardDescription, CardImg, CardFooter } from 'src/components/ui/card';
import MedicalStaff from 'src/components/ui/icons/medicalStaff';
import Search from 'src/components/ui/icons/search';
import { Input } from 'src/components/ui/input';
import { TableRow, TableBody, TableCell } from 'src/components/ui/table';

const invoices = [
  {
    Persona: 'Persona 1',
    Especialidad: 'Especialidad',
    src: '',
  },
  {
    Persona: 'Persona 2',
    Especialidad: 'Especialidad',
    src: '',
  },
  {
    Persona: 'Persona 3',
    Especialidad: 'Especialidad',
    src: '',
  },
  {
    Persona: 'Persona 4',
    Especialidad: 'Especialidad',
    src: '',
  },
  {
    Persona: 'Persona 5',
    Especialidad: 'Especialidad',
    src: '',
  },
  {
    Persona: 'Persona 1',
    Especialidad: 'Especialidad',
    src: '',
  },
  {
    Persona: 'Persona 2',
    Especialidad: 'Especialidad',
    src: '',
  },
  {
    Persona: 'Persona 3',
    Especialidad: 'Especialidad',
    src: '',
  },
  {
    Persona: 'Persona 4',
    Especialidad: 'Especialidad',
    src: '',
  },
  {
    Persona: 'Persona 5',
    Especialidad: 'Especialidad',
    src: '',
  },
  {
    Persona: 'Persona 1',
    Especialidad: 'Especialidad',
    src: '',
  },
  {
    Persona: 'Persona 2',
    Especialidad: 'Especialidad',
    src: '',
  },
  {
    Persona: 'Persona 3',
    Especialidad: 'Especialidad',
    src: '',
  },
  {
    Persona: 'Persona 4',
    Especialidad: 'Especialidad',
    src: '',
  },
  {
    Persona: 'Persona 5',
    Especialidad: 'Especialidad',
    src: '',
  },
  {
    Persona: 'Persona 1',
    Especialidad: 'Especialidad',
    src: '',
  },
  {
    Persona: 'Persona 2',
    Especialidad: 'Especialidad',
    src: '',
  },
  {
    Persona: 'Persona 3',
    Especialidad: 'Especialidad',
    src: '',
  },
  {
    Persona: 'Persona 4',
    Especialidad: 'Especialidad',
    src: '',
  },
  {
    Persona: 'Persona 5',
    Especialidad: 'Especialidad',
    src: '',
  },
];
export function RegisterMedical() {
  return (
    <div className='w-full h-full flex flex-col items-center bg-green-400 relative'>
      <Card className='h-full w-full flex flex-col px-8 sm:px-9 lg:px-10 pt-8 sm:pt-9 lg:pt-10 bg-green-600 border-none rounded-none rounded-l-xl'>
        <Card className='bg-white min-h-[60px] max-h-[60px] w-full mb-4 flex fles-row justify-end items-center px-5 sm:px-10 lg:px-20'>
          <UserType></UserType>
        </Card>
        <Card className='bg-white w-full h-full rounded-b-none overflow-auto scrollbar-edit flex flex-col p-6 pb-0 sm:p-8 sm:pb-0 lg:p-10 lg:pb-0 space-y-5'>
          <CardHeader className='w-full flex p-3 flex-col space-y-5'>
            <CardTitle className=' text-green-400 font-montserrat font-bold text-[18px] text-left'>Personal</CardTitle>
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
            <TableBody className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4'>
              {invoices.map((Persona) => (
                <TableRow className='border-b-0' key={Persona.Persona}>
                  <TableCell>
                    <Card className='bg-green-50 shadow-md h-52 w-52 flex flex-col rounded-none border-spacing-0 border-0'>
                      <CardHeader className='bg-green-400 h-32 p-0 flex justify-center items-center rounded-none border-spacing-0'>
                        <CardImg
                          src={Persona.src}
                          fallback={<MedicalStaff fill='white' className='h-24 w-24' />}
                          className='w-20 h-20'
                        />
                      </CardHeader>
                      <CardContent className='bg-green-50 px-2 py-1  text-center'>
                        <CardTitle className='text-black font-montserrat font-bold text-sm'>
                          {Persona.Persona}
                        </CardTitle>
                        <CardDescription className='text-black font-roboto font-medium text-xs '>
                          {Persona.Especialidad}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </CardContent>
          <CardFooter className='h-20 flex flex-row-reverse'>
            <div className='bg-green-400 rounded-full mb-8 mt-16'>
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
