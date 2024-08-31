import { Button } from 'src/components/ui/button';
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from 'src/components/ui/dialog';

import Exclamation from '../ui/icons/exclamation';

interface AlertType1Props {
  title: string;
}

export function AlertExclamation({ title }: AlertType1Props) {
  return (
    <DialogContent className='sm:max-w-[345px] h-[215px] rounded-lg'>
      <DialogHeader>
        <div className='flex justify-center mb-[5px]'>
          <div>
            <Exclamation />
          </div>
        </div>
        <DialogTitle className='text-center text-[21px] font-bold'>{title}</DialogTitle>
      </DialogHeader>
      <DialogFooter className='flex justify-start pr-1 space-x-4 pt-[16px]'>
        <Button variant='btnGreen'>SI</Button>
        <Button variant='btnGray'>NO</Button>
      </DialogFooter>
    </DialogContent>
  );
}
