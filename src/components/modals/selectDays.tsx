import { DialogClose, DialogContent, DialogTitle } from 'src/components/ui/dialog';

import { Button } from '../ui/button';
import Calendar from '../ui/calendar';

export function SelectDays() {
  return (
    <DialogContent className='min-w-[604px] max-w-[667px] min-h-[484px] max-h-[484px] rounded-lg bg-green-400 border-none px-0 pt-14 pb-0'>
      <div className='absolute flex w-full h-14 items-center justify-center px-20'>
        <DialogTitle className='flex font-bold text-white text-[16px] text-center'>SELECCIONAR DÍA (S)</DialogTitle>
      </div>
      <div className='relative w-full h-full flex flex-col rounded-b-lg bg-white px-10 py-6'>
        <Calendar></Calendar>

        <div className='flex w-full justify-center pt-4 space-x-2'>
          <DialogClose>
            <Button className='w-[122px] h-[33px] rounded-[10px] ' variant={'btnGreen'}>
              Guardar
            </Button>
          </DialogClose>
          <DialogClose>
            <Button className='w-[122px] h-[33px] rounded-[10px]' variant={'btnGray'}>
              Cancelar
            </Button>
          </DialogClose>
        </div>
      </div>
    </DialogContent>
  );
}

// Pendiente (1): Restaurar o crear un nuevo boton de cerrar en el modal (a la espera de andres).
// Pendiente (2):
