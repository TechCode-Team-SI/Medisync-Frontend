import { Button } from 'src/components/ui/button';
import { DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from 'src/components/ui/dialog';

import CheckMarkIcon from '../ui/icons/checkmark';

interface AlertType1Props {
  title: string;
}

export function AlertExclamation({ title }: AlertType1Props) {
  return (
    <DialogContent className='sm:max-w-[345px] h-auto rounded-lg'>
      <DialogHeader>
        <div className='flex justify-center mb-[5px]'>
          <div>
            <CheckMarkIcon />
          </div>
        </div>
        <DialogTitle className='text-center text-[21px] font-bold'>{title}</DialogTitle>
      </DialogHeader>
      <DialogFooter className='flex justify-start pr-1 space-x-4 pt-[16px]'>
        <DialogClose>
          <Button className='bg-[#539091] text-white py-[10px] px-[60px] rounded-[5px] cursor-pointer text-[16px] font-bold'>
            SI
          </Button>
        </DialogClose>
        <DialogClose>
          <Button className='bg-[#969696] text-white py-[10px] px-[60px] rounded-[5px] cursor-pointer text-[16px] font-bold'>
            NO
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
