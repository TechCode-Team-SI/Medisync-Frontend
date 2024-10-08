/* eslint-disable prettier/prettier */
import { DialogContent, DialogTitle } from 'src/components/ui/dialog';

import { Checkbox } from '../ui/checkbox';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export function SeeRol() {
  return (
    <DialogContent className='min-w-[529px] max-w-[429px] min-h-[599px] max-h-[700px] rounded-lg bg-green-400 border-none px-0 pt-14 pb-0'>
      <div className='absolute flex w-full h-14 items-center justify-center px-20'>
        <DialogTitle className='flex font-bold text-white text-[16px] text-center'>DETALLES DEL ROL</DialogTitle>
      </div>
      <div className='relative w-full h-full flex flex-col rounded-b-lg bg-white px-10 py-6'>
        <div className='flex flex-col w-full justify-center space-x-2'>
          <div className='flex  flex-col'>
            <Label htmlFor='name' className='text-green-400 font-roboto font-bold h-7 text-[14px]'>
              NOMBRE
            </Label>
            <Input readOnly id='name' className='w-full h-10 rounded-2 font-roboto text-base bg-[#E8E8E8]' />

            <Label htmlFor='description' className='text-green-400 font-roboto font-bold h-7 mt-5 text-[14px]'>
              DESCRIPCION
            </Label>
            <Input readOnly id='description' className='w-full  h-28 rounded-3 font-roboto text-base bg-[#E8E8E8]  ' />
          </div>
          <Label htmlFor='description' className='text-green-400 font-roboto font-bold h-7 mt-5 text-[14px]'>
            PERMISOS
          </Label>
          <div className='flex flex-col pt-2 w-full overflow-auto h-48'>
            <div className='flex  pt-2 '>
              <div className='flex px-4 w-[223px] '>
                <Checkbox className='flex text-center justify-center w-[20px] h-[20px] mr-1 border-2 border-green-400' />
                <Label className='text-green-400 font-roboto font-bold h-5 text-[14px] justify-center flex text-center'>
                  Permiso
                </Label>
              </div>
              <div className='flex px-4 w-[218px] '>
                <Checkbox className='flex text-center justify-center w-[20px] h-[20px] mr-1 border-2 border-green-400' />
                <Label className='text-green-400 font-roboto font-bold h-5 text-[14px] justify-center flex text-center'>
                  Permiso
                </Label>
              </div>
            </div>
            <div className='flex  pt-2 '>
              <div className='flex px-4 w-[223px] '>
                <Checkbox className='flex text-center justify-center w-[20px] h-[20px] mr-1 border-2 border-green-400' />
                <Label className='text-green-400 font-roboto font-bold h-5 text-[14px] justify-center flex text-center'>
                  Permiso
                </Label>
              </div>
              <div className='flex px-4 w-[218px] '>
                <Checkbox className='flex text-center justify-center w-[20px] h-[20px] mr-1 border-2 border-green-400' />
                <Label className='text-green-400 font-roboto font-bold h-5 text-[14px] justify-center flex text-center'>
                  Permiso
                </Label>
              </div>
            </div>
            <div className='flex  pt-2 '>
              <div className='flex px-4 w-[223px] '>
                <Checkbox className='flex text-center justify-center w-[20px] h-[20px] mr-1 border-2 border-green-400' />
                <Label className='text-green-400 font-roboto font-bold h-5 text-[14px] justify-center flex text-center'>
                  Permiso
                </Label>
              </div>
              <div className='flex px-4 w-[218px] '>
                <Checkbox className='flex text-center justify-center w-[20px] h-[20px] mr-1 border-2 border-green-400' />
                <Label className='text-green-400 font-roboto font-bold h-5 text-[14px] justify-center flex text-center'>
                  Permiso
                </Label>
              </div>
            </div>
            <div className='flex  pt-2 '>
              <div className='flex px-4 w-[223px] '>
                <Checkbox className='flex text-center justify-center w-[20px] h-[20px] mr-1 border-2 border-green-400' />
                <Label className='text-green-400 font-roboto font-bold h-5 text-[14px] justify-center flex text-center'>
                  Permiso
                </Label>
              </div>
              <div className='flex px-4 w-[218px] '>
                <Checkbox className='flex text-center justify-center w-[20px] h-[20px] mr-1 border-2 border-green-400' />
                <Label className='text-green-400 font-roboto font-bold h-5 text-[14px] justify-center flex text-center'>
                  Permiso
                </Label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}
