import { DialogContent, DialogTitle } from 'src/components/ui/dialog';

import { CardTitle } from '../ui/card';
import { Checkbox } from '../ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

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

export function SeeAgenda() {
  return (
    <DialogContent className='min-w-[900px] max-w-[900px] min-h-[484px] max-h-[484px] rounded-lg bg-green-400 border-none px-0 pt-14 pb-0'>
      <div className='absolute flex w-full h-14 items-center justify-center px-20'>
        <DialogTitle className='font-bold text-white text-[16px] text-center'>AGENDA</DialogTitle>
      </div>
      <div className='relative w-full h-full flex flex-col rounded-b-lg bg-white px-10 py-6'>
        <div className='flex flex-col'>
          <CardTitle className=' text-green-400 font-montserrat font-bold text-[15px] text-left'>
            DÍAS LABORABLES
          </CardTitle>
          <div className='flex px-6 py-6 space-x-3 justify-center'>
            <div className='flex items-center justify-center'>
              <Checkbox disabled className='w-[18px] h-[20px] mr-4' checked={true} />
              <p className='text-green-400 font-montserrat font-bold text-[14px]'>Lunes</p>
            </div>
            <div className='flex items-center justify-center'>
              <Checkbox disabled className='w-[18px] h-[20px] mr-4' />
              <p className='text-green-400 font-montserrat font-bold text-[14px]'>Martes</p>
            </div>
            <div className='flex items-center justify-center'>
              <Checkbox disabled className='w-[18px] h-[20px] mr-4' checked={true} />
              <p className='text-green-400 font-montserrat font-bold text-[14px]'>Miercoles</p>
            </div>
            <div className='flex items-center justify-center'>
              <Checkbox disabled className='w-[18px] h-[20px] mr-4' />
              <p className='text-green-400 font-montserrat font-bold text-[14px]'>Jueves</p>
            </div>
            <div className='flex items-center justify-center'>
              <Checkbox disabled className='w-[18px] h-[20px] mr-4' checked={true} />
              <p className='text-green-400 font-montserrat font-bold text-[14px]'>Viernes</p>
            </div>
            <div className='flex items-center justify-center'>
              <Checkbox disabled className='w-[18px] h-[20px] mr-4' checked={true} />
              <p className='text-green-400 font-montserrat font-bold text-[14px]'>Sabado</p>
            </div>
            <div className='flex items-center justify-center'>
              <Checkbox disabled className='w-[18px] h-[20px] mr-4' />
              <p className='text-green-400 font-montserrat font-bold text-[14px]'>Domingo</p>
            </div>
          </div>
        </div>
        <div className='flex flex-col'>
          <CardTitle className=' text-green-400 font-montserrat font-bold text-[15px] text-left'>
            DÍAS NO LABORABLES
          </CardTitle>
          <div className='flex px-6 py-6'>
            <Table className='min-w-full text-sm'>
              <TableHeader className='border-b-8 border-white bg-green-500 text-white'>
                <TableRow className='hover:bg-green-500'>
                  <TableHead className='w-auto text-[12px] text-left'>Días</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className='h-[35px]'>
                {NonWorkingDays.map((nonWorkingDay) => (
                  <TableRow
                    className='bg-green-600 border-b-2 border-white text-black font-roboto'
                    key={nonWorkingDay.date}
                  >
                    <TableCell className='pl-4 text-left'>{nonWorkingDay.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

// Pendiente (1): Restaurar o crear un nuevo boton de cerrar en el modal (a la espera de andres).
// Pendiente (2):
