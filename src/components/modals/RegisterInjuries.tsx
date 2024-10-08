/* eslint-disable prettier/prettier */
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from 'src/components/ui/dialog';

import { AlertCheck } from '../alerts/alertCheck';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface AlertName {
  title: string;
  alert: string;
}
export function RegisterInjuries({ title, alert }: AlertName) {
  return (
    <DialogContent className='min-w-[429px] max-w-[529px] min-h-[403px] max-h-[500px] rounded-lg bg-green-400 border-none px-0 pt-14 pb-0'>
      <div className='absolute flex w-full h-14 items-center justify-center px-20'>
        <DialogTitle className='flex font-bold text-white text-[16px] text-center'>{title}</DialogTitle>
      </div>
      <div className='relative w-full h-full flex flex-col rounded-b-lg bg-white px-10 py-6 '>
        <div className='flex flex-col w-full justify-center space-x-2'>
          <div className='flex  flex-col'>
            <Label htmlFor='name' className='text-green-400 font-roboto font-bold h-7 text-[14px]'>
              NOMBRE
            </Label>
            <Input id='name' className='w-full h-10 rounded-2 font-roboto text-base' />

            <Label htmlFor='description' className='text-green-400 font-roboto font-bold h-7 mt-5 text-[14px]'>
              DESCRIPCION
            </Label>
            <Input id='description' className='w-full  h-28 rounded-3 font-roboto text-base line-clamp-5 ' />
          </div>

          <div className='flex flex-row justify-center p-4'>
            <Dialog>
              <DialogTrigger asChild>
                <Button className='w-[136px] h-[46px] rounded-[10px] mr-6' variant={'btnGreen'}>
                  Guardar
                </Button>
              </DialogTrigger>
              <AlertCheck title={`¡${alert} Registrada Correctamente!`} />
            </Dialog>

            <DialogClose>
              <Button className='w-[136px] h-[46px] rounded-[10px]' variant={'btnGray'}>
                Cancelar
              </Button>
            </DialogClose>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}
