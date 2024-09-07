import { X } from 'lucide-react';

import { DialogClose, DialogContent, DialogTitle } from 'src/components/ui/dialog';

import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';

export function SelectDays() {
  return (
    <DialogContent className='min-w-[604px] max-w-[667px] min-h-[484px] max-h-[484px] rounded-lg bg-green-400 border-none px-0 pt-14 pb-0'>
      <div className='absolute flex w-full h-14 items-center justify-center px-20'>
        <DialogTitle className='font-bold text-white text-[16px] text-center'>Seleccionar DÍA (S)</DialogTitle>
      </div>
      <div className='relative w-full h-full flex flex-col rounded-b-lg bg-white px-10 py-6'>
        <div className='flex'>
          <Checkbox className='w-[18px] h-[20px] mr-4' />
          <p className='text-green-400 font-montserrat font-bold text-[14px]'>Seleccionar Rango</p>
        </div>
        <div className='flex w-full h-[300px] justify-center items-center'>
          <h2>Aqui va el calendario</h2>
        </div>
        <div className='flex w-full justify-center pt-4 space-x-2'>
          <DialogClose>
            <Button className='w-[122px] h-[33px]' variant={'btnGreen'}>
              Guardar
            </Button>
          </DialogClose>
          <DialogClose>
            <Button className='w-[122px] h-[33px]' variant={'btnGray'}>
              Cancelar
            </Button>
          </DialogClose>
        </div>
      </div>
      <DialogClose className='absolute flex flex-row-reverse w-full h-14 items-center'>
        <X className='w-[50px] h-10 text-white mr-2' />
      </DialogClose>
    </DialogContent>
  );
}

// Pendiente (1): Restaurar o crear un nuevo boton de cerrar en el modal (a la espera de andres).
// Pendiente (2):
