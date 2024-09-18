import { LucideCamera } from 'lucide-react';

import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from 'src/components/ui/dialog';

import { AlertCheck } from '../alerts/alertCheck';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { TextArea } from '../ui/textArea';

export function ModalRegisterSpecialty() {
  return (
    <DialogContent className='w-[429px] min-h-[424px] max-h-[424px] rounded-lg bg-green-400 border-none px-0 pt-14 pb-0'>
      <div className='absolute flex w-full h-14 items-center justify-center px-20'>
        <DialogTitle className='font-bold text-white text-[16px] text-center'>REGISTRAR ESPECIALIDAD</DialogTitle>
      </div>
      <div className='relative w-full h-auto flex flex-col rounded-b-lg bg-white py-4 px-8'>
        <div className='flex flex-col'>
          <div className='flex justify-center items-center space-x-6 mb-2'>
            <div className='w-full flex-1'>
              <Label className='text-[12pxS]'>NOMBRE</Label>
              <Input className='h-11' />
            </div>
            <button className='flex justify-center items-center bg-green-400 rounded-full w-[85px] h-[85px]'>
              <LucideCamera fill='white' className='w-[55px] h-[60px]' />
            </button>
          </div>
          <div className='w-full flex-1'>
            <Label className='text-[12pxS]'>DESCRIPCIÓN</Label>
            <TextArea className='h-32' />
          </div>
        </div>
        <div className='flex w-full h-full justify-between items-center pt-4'>
          <Dialog>
            <DialogTrigger asChild>
              <Button className='w-[163px] h-[46px]' variant={'btnGreen'}>
                Registrar
              </Button>
            </DialogTrigger>
            <AlertCheck title='¡Especialidad Registrada con éxito!' />
          </Dialog>
          <DialogClose>
            <Button className='w-[163px] h-[46px]' variant={'btnGray'}>
              Cancelar
            </Button>
          </DialogClose>
        </div>
      </div>
    </DialogContent>
  );
}
