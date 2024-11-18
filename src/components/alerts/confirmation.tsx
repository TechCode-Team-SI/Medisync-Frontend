import { DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from 'src/components/ui/dialog';

import { Button } from '../ui/button';

interface AlertType2Props {
  title: string;
  description?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
}

export function Confirmation({ title, description, onCancel, onConfirm }: AlertType2Props) {
  return (
    <DialogContent className='w-fit h-auto rounded-lg'>
      <DialogHeader>
        <DialogTitle className='text-center text-xl font-bold'>{title}</DialogTitle>
        <span>{description}</span>
      </DialogHeader>
      <DialogFooter className='flex justify-center gap-4 pt-2'>
        <DialogClose asChild>
          <Button
            onClick={onConfirm}
            className='bg-green-400 text-white py-[10px] px-4 rounded-md cursor-pointer text-base font-medium'
          >
            confirmar
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button
            onClick={onCancel}
            className='bg-transparent text-black hover:bg-gray-200 py-[10px] px-4 rounded-md cursor-pointer text-base font-medium'
          >
            cancelar
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
