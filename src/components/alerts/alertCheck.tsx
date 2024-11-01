import { Button } from 'src/components/ui/button';
import { DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from 'src/components/ui/dialog';

import CheckMarkIcon from '../ui/icons/checkmark';

interface AlertType2Props {
  title: string;
  textButton?: string;
  onClose?: () => void;
}

export function AlertCheck({ title, textButton, onClose }: AlertType2Props) {
  return (
    <DialogContent onCloseAutoFocus={onClose} className='sm:max-w-[345px] h-auto rounded-lg'>
      <DialogHeader>
        <div className='flex justify-center mb-[5px]'>
          <div>
            <CheckMarkIcon />
          </div>
        </div>
        <DialogTitle className='text-center text-[21px] font-bold'>{title}</DialogTitle>
      </DialogHeader>
      <DialogFooter className='flex justify-start pr-14 space-x-4 pt-[16px]'>
        <DialogClose>
          <Button
            onClick={onClose}
            className='bg-[#539091] text-white py-[10px] px-[60px] rounded-[5px] cursor-pointer text-[16px] font-bold'
          >
            {textButton ? textButton : 'Continuar'}
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
