/* eslint-disable prettier/prettier */
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from 'src/components/ui/dialog';

import { AlertCheck } from '../alerts/alertCheck';
import { Button } from '../ui/button';
import { Card, CardTitle } from '../ui/card';

interface AlertName {
  title: string;
  alert: string;
}
export function TypeForm({ title, alert }: AlertName) {
  return (
    <DialogContent className='min-w-[452px] max-w-[552px] min-h-[806px] max-h-[906px] rounded-lg bg-green-400 border-none px-0 pt-14 pb-0'>
      <div className='absolute flex w-full h-14 items-center justify-center px-20'>
        <DialogTitle className='flex font-bold text-white text-[16px] text-center'>{title}</DialogTitle>
      </div>
      <div className='relative w-full h-full flex flex-col rounded-b-lg bg-white px-10 py-6 '>
        <div className='flex flex-col w-full justify-center space-x-2'>
          <Card className='w-[444px] h-[82px]'>
            {' '}
            <CardTitle> Formulario 1</CardTitle>
          </Card>

          <div className='flex flex-row justify-center p-4'>
            <Dialog>
              <DialogTrigger asChild>
                <Button className='w-[136px] h-[46px] rounded-[10px] mr-6' variant={'btnGreen'}>
                  Guardar
                </Button>
              </DialogTrigger>
              <AlertCheck title={alert} />
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
