import { ModalDemoContent } from 'src/components/modals/modalDemo';
import { Button } from 'src/components/ui/button';
import { Dialog, DialogTrigger } from 'src/components/ui/dialog';

export function ModalsDemo() {
  return (
    <div className='bg-gray-800 w-full h-full flex justify-center items-center gap-4 flex-col p-5'>
      <h1 className='text-white text-2xl font-bold uppercase'>Modals Demo</h1>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant='outline'>Open Modal</Button>
        </DialogTrigger>
        <ModalDemoContent />
      </Dialog>
    </div>
  );
}
