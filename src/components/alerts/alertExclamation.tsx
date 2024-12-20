import { Button } from 'src/components/ui/button';
import { DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from 'src/components/ui/dialog';

import Exclamation from '../ui/icons/exclamation';

interface AlertType2Props {
  title: string;
  onClose?: () => void;
  deletePost?: () => void;
}

export function AlertExclamation({ title, onClose, deletePost }: AlertType2Props) {
  return (
    <DialogContent onCloseAutoFocus={onClose} className='sm:max-w-[345px] h-auto rounded-lg'>
      <DialogHeader>
        <div className='flex items-center justify-center'>
          <Exclamation className='h-14 w-14 text-white' />
        </div>

        <DialogTitle className='text-center text-[21px] font-bold'>{title}</DialogTitle>
      </DialogHeader>
      <DialogFooter className='flex justify-start pr-1 space-x-4 pt-[16px]'>
        <DialogClose>
          <Button
            className='bg-[#539091] text-white py-[10px] px-[60px] rounded-[5px] cursor-pointer text-[16px] font-bold'
            onClick={() => {
              if (deletePost) deletePost();
              if (onClose) onClose();
            }}
          >
            SI
          </Button>
        </DialogClose>
        <DialogClose>
          <Button
            className='bg-[#969696] text-white py-[10px] px-[60px] rounded-[5px] cursor-pointer text-[16px] font-bold'
            onClick={onClose}
          >
            NO
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
