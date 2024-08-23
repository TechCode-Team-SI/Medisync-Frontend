import { Button } from 'src/components/ui/button';
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from 'src/components/ui/dialog';

import CheckMarkIcon from '../ui/icons/checkmark';

interface AlertType2Props {
  title: string;
}

export function AlertType2({ title }: AlertType2Props) {
  return (
    <DialogContent className='sm:max-w-[345px] h-[215px] rounded-lg'>
      <DialogHeader>
        <div className='flex justify-center mb-[5px]'>
          <div>
            <CheckMarkIcon />
          </div>
        </div>
        <DialogTitle className='text-center text-[21px] font-bold'>{title}</DialogTitle>
      </DialogHeader>
      <DialogFooter className='flex justify-start pr-14 space-x-4 pt-[16px]'>
        <Button className='bg-[#539091] text-white py-[10px] px-[60px] rounded-[5px] cursor-pointer text-[16px] font-bold'>
          ACEPTAR
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
