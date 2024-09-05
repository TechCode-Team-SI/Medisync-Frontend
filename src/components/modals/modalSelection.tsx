import { DialogClose, DialogContent, DialogTitle } from 'src/components/ui/dialog';

import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';

export function ModalSelection() {
  return (
    <DialogContent className='w-72 min-h-[600px] max-h-[600px] rounded-lg bg-green-400 border-none px-0 pt-14 pb-0'>
      <div className='absolute flex w-full h-14 items-center justify-center px-20'>
        <DialogTitle className='font-bold text-white text-[16px] text-center'>Seleccione las Patologias</DialogTitle>
      </div>
      <div className='relative w-full min-h-[545px] max-h-[545px] flex flex-col rounded-b-lg bg-white py-4'>
        <div className='w-full h-full overflow-y-auto scrollbar-edit space-y-3'>
          {/* checkbox */}
          <div className='flex  justify-center items-center px-4'>
            <p className='w-full h-12 flex rounded-lg bg-green-600 justify-center items-center'>Caracol</p>
            <Checkbox className='w-[25px] h-[25px] ml-3 border-2 border-green-400' />
          </div>
          {/* checkbox */}
          <div className='flex  justify-center items-center px-4'>
            <p className='w-full h-12 flex rounded-lg bg-green-600 justify-center items-center'>Caracol</p>
            <Checkbox className='w-[25px] h-[25px] ml-3 border-2 border-green-400' />
          </div>
          {/* checkbox */}
          <div className='flex  justify-center items-center px-4'>
            <p className='w-full h-12 flex rounded-lg bg-green-600 justify-center items-center'>Caracol</p>
            <Checkbox className='w-[25px] h-[25px] ml-3 border-2 border-green-400' />
          </div>
          {/* checkbox */}
          <div className='flex  justify-center items-center px-4'>
            <p className='w-full h-12 flex rounded-lg bg-green-600 justify-center items-center'>Caracol</p>
            <Checkbox className='w-[25px] h-[25px] ml-3 border-2 border-green-400' />
          </div>
          {/* checkbox */}
          <div className='flex  justify-center items-center px-4'>
            <p className='w-full h-12 flex rounded-lg bg-green-600 justify-center items-center'>Caracol</p>
            <Checkbox className='w-[25px] h-[25px] ml-3 border-2 border-green-400' />
          </div>
          {/* checkbox */}
          <div className='flex  justify-center items-center px-4'>
            <p className='w-full h-12 flex rounded-lg bg-green-600 justify-center items-center'>Caracol</p>
            <Checkbox className='w-[25px] h-[25px] ml-3 border-2 border-green-400' />
          </div>
          {/* checkbox */}
          <div className='flex  justify-center items-center px-4'>
            <p className='w-full h-12 flex rounded-lg bg-green-600 justify-center items-center'>Caracol</p>
            <Checkbox className='w-[25px] h-[25px] ml-3 border-2 border-green-400' />
          </div>
          {/* checkbox */}
          <div className='flex  justify-center items-center px-4'>
            <p className='w-full h-12 flex rounded-lg bg-green-600 justify-center items-center'>Caracol</p>
            <Checkbox className='w-[25px] h-[25px] ml-3 border-2 border-green-400' />
          </div>
          {/* checkbox */}
          <div className='flex  justify-center items-center px-4'>
            <p className='w-full h-12 flex rounded-lg bg-green-600 justify-center items-center'>Caracol</p>
            <Checkbox className='w-[25px] h-[25px] ml-3 border-2 border-green-400' />
          </div>
          {/* checkbox */}
          <div className='flex  justify-center items-center px-4'>
            <p className='w-full h-12 flex rounded-lg bg-green-600 justify-center items-center'>Caracol</p>
            <Checkbox className='w-[25px] h-[25px] ml-3 border-2 border-green-400' />
          </div>
          {/* checkbox */}
          <div className='flex  justify-center items-center px-4'>
            <p className='w-full h-12 flex rounded-lg bg-green-600 justify-center items-center'>Caracol</p>
            <Checkbox className='w-[25px] h-[25px] ml-3 border-2 border-green-400' />
          </div>
          {/* checkbox */}
          <div className='flex  justify-center items-center px-4'>
            <p className='w-full h-12 flex rounded-lg bg-green-600 justify-center items-center'>Caracol</p>
            <Checkbox className='w-[25px] h-[25px] ml-3 border-2 border-green-400' />
          </div>
        </div>
        <div className='flex w-full justify-center pt-4 space-x-2'>
          <DialogClose>
            <Button className='w-[122px] h-[33px]' variant={'btnGreen'}>
              Aceptar
            </Button>
          </DialogClose>
          <DialogClose>
            <Button className='w-[122px] h-[33px]' variant={'btnGray'}>
              Cancelar
            </Button>
          </DialogClose>
        </div>
      </div>
    </DialogContent>
  );
}
