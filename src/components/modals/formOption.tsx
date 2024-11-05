/* eslint-disable prettier/prettier */
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from 'src/components/ui/dialog';

import { AlertCheck } from '../alerts/alertCheck';
import { Button } from '../ui/button';
import { CardTitle } from '../ui/card';
import Search from '../ui/icons/search';
import { Input } from '../ui/input';

export function FormOption() {
  return (
    <DialogContent className='min-w-[529px] max-w-[429px] min-h-[599px] max-h-[600px] rounded-lg bg-green-400 border-none px-0 pt-14 pb-0'>
      <div className='absolute flex w-full h-14 items-center justify-center px-20'>
        <DialogTitle className='flex font-bold text-white text-[16px] text-center'>Opciones de Formulario</DialogTitle>
      </div>
      <div className='relative w-full h-full flex flex-col rounded-b-lg bg-white px-10 py-6'>
        <div className='flex flex-col w-full justify-center space-x-2'>
          <div className='flex pb-4'>
            <Search fill='#539091' className='h-[17px] w-[18px] absolute  mt-[14px] ' />
            <Input
              id='name'
              placeholder='Buscar'
              className='w-full h-10 rounded-2 font-roboto text-base pl-5 font-medium text-[#539091] hover:text-[#539091] placeholder:text-[#539091] '
            />
          </div>

          <div className='flex flex-col pt-2 w-full overflow-auto scrollbar-edit h-[420px] '>
            <Button className=' sm:w-[425px] bg-white h-20 shadow-lg border-none flex flex-col mt-3 pt-3 p-5 gap-5 hover:bg-[#CCEAE8]'>
              <CardTitle className='w-full h-10 rounded-2 font-roboto text-base pl-5 font-bold flex items-center pd-4 justify-items-center text-[#539091] hover:text-[#539091] placeholder:text-[#539091]'>
                {' '}
                Formulario 1
              </CardTitle>
            </Button>
            <Button className=' sm:w-[425px] bg-white h-20 shadow-lg border-none flex flex-col mt-3 pt-3 p-5 gap-5 hover:bg-[#CCEAE8]'>
              <CardTitle className='w-full h-10 rounded-2 font-roboto text-base pl-5 font-bold flex items-center pd-4 justify-items-center text-[#539091] hover:text-[#539091] placeholder:text-[#539091]'>
                {' '}
                Formulario 1
              </CardTitle>
            </Button>
            <Button className=' sm:w-[425px] bg-white h-20 shadow-lg border-none flex flex-col mt-3 pt-3 p-5 gap-5 hover:bg-[#CCEAE8]'>
              <CardTitle className='w-full h-10 rounded-2 font-roboto text-base pl-5 font-bold flex items-center pd-4 justify-items-center text-[#539091] hover:text-[#539091] placeholder:text-[#539091]'>
                {' '}
                Formulario 1
              </CardTitle>
            </Button>
            <Button className=' sm:w-[425px] bg-white h-20 shadow-lg border-none flex flex-col mt-3 pt-3 p-5 gap-5 hover:bg-[#CCEAE8]'>
              <CardTitle className='w-full h-10 rounded-2 font-roboto text-base pl-5 font-bold flex items-center pd-4 justify-items-center text-[#539091] hover:text-[#539091] placeholder:text-[#539091]'>
                {' '}
                Formulario 1
              </CardTitle>
            </Button>
            <Button className=' sm:w-[425px] bg-white h-20 shadow-lg border-none flex flex-col mt-3 pt-3 p-5 gap-5 hover:bg-[#CCEAE8]'>
              <CardTitle className='w-full h-10 rounded-2 font-roboto text-base pl-5 font-bold flex items-center pd-4 justify-items-center text-[#539091] hover:text-[#539091] placeholder:text-[#539091]'>
                {' '}
                Formulario 1
              </CardTitle>
            </Button>
          </div>
          <div className='flex flex-row justify-center pt-5 '>
            <Dialog>
              <DialogTrigger asChild>
                <Button className='w-[420px] h-[82px] rounded-[10px] text-[20px] ' variant={'btnGreen'}>
                  Seleccionar
                </Button>
              </DialogTrigger>
              <AlertCheck title='¡Formulario Seleccionado Exitosamente!' />
            </Dialog>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}
