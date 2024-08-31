import { Button } from 'src/components/ui/button';
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from 'src/components/ui/dialog';

import CheckMarkIcon from '../ui/icons/checkmark';

interface AlertType2Props {
  title: string;
}

export function AlertCheck({ title }: AlertType2Props) {
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
        <Button variant='btnGreen'>Continuar</Button>
      </DialogFooter>
    </DialogContent>
  );
}
