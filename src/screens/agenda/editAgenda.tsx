import { Link } from 'react-router-dom';

import { AlertCheck } from 'src/components/alerts/alertCheck';
import { SelectDays } from 'src/components/modals/selectDays';
import { UserType } from 'src/components/navbar/userType/userType';
import { Button } from 'src/components/ui/button';
import { Card, CardTitle, CardHeader, CardContent } from 'src/components/ui/card';
import { Checkbox } from 'src/components/ui/checkbox';
import { DialogTrigger, Dialog } from 'src/components/ui/dialog';
import Edit from 'src/components/ui/icons/edit';
import { Input } from 'src/components/ui/input';
import { Label } from 'src/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'src/components/ui/table';
const NonWorkingDays = [
  {
    date: '10/05/2025',
  },
  {
    date: '08/06/2025',
  },
  {
    date: '08/12/2025',
  },
];

export function EditAgenda() {
  return (
    <div className='w-full h-screen flex flex-col sm:flex-row items-center bg-green-400 relative'>
      <Card className='h-full w-full flex flex-col px-6 sm:px-8 lg:px-10 pt-6 sm:pt-8 lg:pt-10 bg-green-600 border-none rounded-none rounded-l-xl'>
        <Card className='bg-white min-h-[60px] max-h-[60px] w-full mb-4 flex flex-row justify-end items-center px-5 sm:px-10 lg:px-20'>
          <UserType></UserType>
        </Card>
        <Card className='bg-white w-full h-full overflow-auto flex flex-col p-4 sm:p-6 lg:p-10'>
          <CardHeader className='w-full flex flex-col'>
            <CardTitle className='text-green-400 font-montserrat font-bold text-[18px] text-left'>
              REGISTRAR AGENDA
            </CardTitle>
          </CardHeader>
          <CardContent className='w-full flex flex-col overflow-auto scrollbar-edit space-y-5'>
            <div className='w-full space-y-[2px]'>
              <Label className='text-green-400 font-roboto text-base'>Nombre</Label>
              <Input className='w-full h-[36px] bg-green-100/50 border-none rounded-none text-[15px] font-montserrat placeholder:text-green-400 placeholder:font-roboto placeholder:font-bold placeholder:text-[15px] focus-visible:ring-green-400' />
            </div>
            <CardTitle className='text-green-400 font-montserrat font-bold text-[15px] text-left'>
              DÍAS LABORABLES
            </CardTitle>
            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-7 gap-4 p-4 justify-center'>
              <div className='flex items-center justify-center'>
                <Checkbox className='w-[18px] h-[20px] mr-4' />
                <p className='text-green-400 font-montserrat font-bold text-[14px]'>Lunes</p>
              </div>
              <div className='flex items-center justify-center'>
                <Checkbox className='w-[18px] h-[20px] mr-4' />
                <p className='text-green-400 font-montserrat font-bold text-[14px]'>Martes</p>
              </div>
              <div className='flex items-center justify-center'>
                <Checkbox className='w-[18px] h-[20px] mr-4' />
                <p className='text-green-400 font-montserrat font-bold text-[14px]'>Miércoles</p>
              </div>
              <div className='flex items-center justify-center'>
                <Checkbox className='w-[18px] h-[20px] mr-4' />
                <p className='text-green-400 font-montserrat font-bold text-[14px]'>Jueves</p>
              </div>
              <div className='flex items-center justify-center'>
                <Checkbox className='w-[18px] h-[20px] mr-4' />
                <p className='text-green-400 font-montserrat font-bold text-[14px]'>Viernes</p>
              </div>
              <div className='flex items-center justify-center'>
                <Checkbox className='w-[18px] h-[20px] mr-4' />
                <p className='text-green-400 font-montserrat font-bold text-[14px]'>Sábado</p>
              </div>
              <div className='flex items-center justify-center'>
                <Checkbox className='w-[18px] h-[20px] mr-4' />
                <p className='text-green-400 font-montserrat font-bold text-[14px]'>Domingo</p>
              </div>
            </div>
            <div className='flex flex-col mt-6'>
              <CardTitle className='text-green-400 font-montserrat font-bold text-[15px] text-left'>
                DÍAS NO LABORABLES
              </CardTitle>

              <div className='px-4 sm:px-6 py-4 sm:py-6 overflow-x-auto'>
                <Table className='min-w-full text-sm'>
                  <TableHeader className='border-b-8 border-white bg-green-500 text-white'>
                    <TableRow className='hover:bg-green-500'>
                      <TableHead className='w-auto text-[12px] text-left'>Días</TableHead>
                      <TableHead className='text-right'>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {NonWorkingDays.map((nonWorkingDay) => (
                      <TableRow
                        className='bg-green-600 border-b-2 border-white text-black font-roboto'
                        key={nonWorkingDay.date}
                      >
                        <TableCell className='pl-4 text-left'>{nonWorkingDay.date}</TableCell>
                        <TableCell className='flex justify-end items-center mr-10'>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Edit className='fill-current text-green-400 h-4 w-4' />
                            </DialogTrigger>
                            <SelectDays />
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
          <div className='mt-1 w-full flex flex-row justify-center space-x-20'>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant={'btnGreen'}>Guardar</Button>
              </DialogTrigger>
              <AlertCheck title='¡Agenda Guardada Exitosamente!' />
            </Dialog>
            <Link to='/editWorkAgenda'>
              <Button variant='btnGray'>Cancelar</Button>
            </Link>
          </div>
        </Card>
      </Card>
    </div>
  );
}
