/* eslint-disable prettier/prettier */
import { DialogContent, DialogTitle } from 'src/components/ui/dialog';

import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface AlertName {
  title: string;
}
export function SeeInjuries({ title }: AlertName) {
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
            <Input readOnly id='name' className='w-full h-10 rounded-2 font-roboto text-base bg-[#E8E8E8]' />

            <Label htmlFor='description' className='text-green-400 font-roboto font-bold h-7 mt-5 text-[14px]'>
              DESCRIPCION
            </Label>
            <Input
              readOnly
              id='description'
              className='w-full  min-h-40 rounded-3 font-roboto text-base line-clamp-5 bg-[#E8E8E8] '
            />
          </div>
        </div>
      </div>
    </DialogContent>
  );
}
