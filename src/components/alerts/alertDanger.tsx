import { DialogDescription } from '@radix-ui/react-dialog';
import { AlertCircle } from 'lucide-react';

import { DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from 'src/components/ui/dialog';

interface AlertDangerProps {
  title: string;
  description: string;
  textButton?: string;
  onClose?: () => void;
}

export function AlertDanger({ title, description, textButton, onClose }: AlertDangerProps) {
  return (
    <DialogContent onCloseAutoFocus={onClose} className='sm:max-w-[345px] h-auto rounded-lg'>
      <DialogHeader>
        <div className='flex justify-center mb-[5px]'>
          <AlertCircle className='stroke-[#539091]' size={40} />
        </div>
        <DialogTitle className='text-center text-[21px] font-bold'>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogFooter className='flex justify-start space-x-4 pt-[16px]'>
        <DialogClose
          onClick={onClose}
          className='bg-[#539091] w-fit mx-auto text-white py-[10px] px-[60px] rounded-[5px] cursor-pointer text-[16px] font-bold'
        >
          {textButton ? textButton : 'Continuar'}
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
