/* eslint-disable prettier/prettier */
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { DialogContent, DialogTitle } from 'src/components/ui/dialog';
import { Form } from 'src/components/ui/form';

import { Input } from '../../ui/input';
import { Label } from '../../ui/label';

import { InjurySchema } from './schema';

interface AlertName {
  title: string;
  titleInjury: string;
  descriptionInjury: string;
  onClose?: () => void;
}
export function SeePathology({ title, titleInjury, descriptionInjury, onClose }: AlertName) {
  const form = useForm<InjurySchema>({
    resolver: zodResolver(InjurySchema),
    defaultValues: { name: titleInjury, description: descriptionInjury },
  });
  return (
    <DialogContent
      onCloseAutoFocus={onClose}
      className='min-w-[429px] max-w-[529px] min-h-[403px] max-h-[500px] rounded-lg bg-green-400 border-none px-0 pt-14 pb-0'
    >
      <div className='absolute flex w-full h-14 items-center justify-center px-20'>
        <DialogTitle className='flex font-bold text-white text-[16px] text-center'>{title}</DialogTitle>
      </div>
      <div className='relative w-full h-full flex flex-col rounded-b-lg bg-white px-10 py-6 '>
        <Form {...form}>
          <form className='space-y-4 '>
            <div className='flex flex-col w-full justify-center space-x-2'>
              <div className='flex  flex-col'>
                <Label className='text-green-400 font-roboto font-bold h-7 text-[14px]'>NOMBRE</Label>
                <Input
                  id='name'
                  readOnly
                  className='w-full h-11 rounded-2 font-roboto text-base'
                  {...form.register('name')}
                />
                {form.formState.errors.name && (
                  <span className='text-red-500'>{form.formState.errors.name.message}</span>
                )}
                <Label className='text-green-400 font-roboto font-bold h-7 mt-5 text-[14px]'>DESCRIPCION</Label>
                <Input
                  id='description'
                  readOnly
                  className='w-full  h-28 rounded-3 font-roboto text-base line-clamp-5 '
                  {...form.register('description')}
                />
                {form.formState.errors.description && (
                  <span className='text-red-500'>{form.formState.errors.description.message}</span>
                )}
              </div>
            </div>
          </form>
        </Form>
      </div>
    </DialogContent>
  );
}
