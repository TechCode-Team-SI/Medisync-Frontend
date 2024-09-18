import { Plus } from 'lucide-react';

import { AlertCheck } from 'src/components/alerts/alertCheck';
import { SeeAgenda } from 'src/components/modals/seeAgenda';
import { SelectDays } from 'src/components/modals/selectDays';
import { UserType } from 'src/components/navbar/userType/userType';
import { Button } from 'src/components/ui/button';
import { Card, CardTitle } from 'src/components/ui/card';
import { Dialog, DialogTrigger } from 'src/components/ui/dialog';
import Edit from 'src/components/ui/icons/edit';
import View from 'src/components/ui/icons/view';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'src/components/ui/table';

const Agendas = [
  {
    agenda: 'Agenda 1',
  },
];

const NonWorkingDays = [
  {
    date: 'Día Mes Año',
  },
  {
    date: 'Día Mes Año',
  },
  {
    date: 'Día Mes Año',
  },
];

export function Agenda() {
  return (
    <div className='w-full h-screen flex flex-row items-center bg-green-400 relative'>
      <Card className='h-full w-full flex flex-col px-8 sm:px-9 lg:px-10 pt-8 sm:pt-9 lg:pt-10 bg-green-600 border-none rounded-none rounded-l-xl'>
        <Card className='bg-white min-h-[60px] max-h-[60px] w-full mb-4 flex fles-row justify-end items-center px-5 sm:px-10 lg:px-20'>
          <UserType></UserType>
        </Card>
        <Card className='bg-white w-full h-full rounded-b-none overflow-auto scrollbar-edit flex flex-col p-6 pb-0 sm:p-8 sm:pb-0 lg:p-10 lg:pb-0 gap-5'>
          <div className='flex flex-col mb-6'>
            <CardTitle className=' text-green-400 font-montserrat font-bold text-[15px] text-left mb-6'>
              AGENDA
            </CardTitle>
            <div className='flex'>
              <Table className='min-w-full text-sm'>
                <TableHeader className='border-b-8 border-white bg-green-500 text-white'>
                  <TableRow className='hover:bg-green-500'>
                    <TableHead className='w-auto text-[12px] text-left'>Nombre</TableHead>
                    <TableHead className='w-32 text-[12px]'>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className='h-[35px]'>
                  {Agendas.map((agenda) => (
                    <TableRow
                      className='bg-green-600 border-b-2 border-white text-black font-roboto'
                      key={agenda.agenda}
                    >
                      <TableCell className='pl-4 text-left'>{agenda.agenda}</TableCell>
                      <TableCell className='flex justify-center items-center'>
                        <Dialog>
                          <DialogTrigger asChild>
                            <View className='fill-current text-green-400 h-4 w-4 cursor-pointer' />
                          </DialogTrigger>
                          <SeeAgenda />
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          <div className='flex flex-col mb-6'>
            <CardTitle className=' text-green-400 font-montserrat font-bold text-[15px] text-left mb-6'>
              AGREGAR DIAS NO LABORABLES ADICIONALES
            </CardTitle>
            <div className='flex flex-col'>
              <Table className='min-w-full text-sm mb-4'>
                <TableHeader className='border-b-8 border-white bg-green-500 text-white'>
                  <TableRow className='hover:bg-green-500'>
                    <TableHead className='w-auto text-[12px] text-left'>Días</TableHead>
                    <TableHead className='w-32 text-[12px]'>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className='h-[35px]'>
                  {NonWorkingDays.map((nonWorkingDay) => (
                    <TableRow
                      className='bg-green-600 border-b-2 border-white text-black font-roboto'
                      key={nonWorkingDay.date}
                    >
                      <TableCell className='pl-4 text-left'>{nonWorkingDay.date}</TableCell>
                      <TableCell className='flex justify-center items-center'>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Edit className='fill-current text-green-400 h-4 w-4 cursor-pointer' />
                          </DialogTrigger>
                          <SelectDays />
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className='flex flex-row-reverse'>
                <Dialog>
                  <DialogTrigger asChild>
                    <div className='bg-green-400 rounded-full'>
                      <Plus className='fill-current text-white w-[50px] h-[50px] cursor-pointer' />
                    </div>
                  </DialogTrigger>
                  <SelectDays />
                </Dialog>
              </div>
            </div>
          </div>
          <div className='flex justify-center space-x-8 pt-2 pb-8'>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant={'btnGreen'}>Guardar</Button>
              </DialogTrigger>
              <AlertCheck title='¡Agenda Guardada Exitosamente!' />
            </Dialog>
            <Button variant={'btnGray'}>Cancelar</Button>
          </div>
        </Card>
      </Card>
    </div>
  );
}
