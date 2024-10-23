import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { LucideCamera } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { DialogClose, DialogContent, DialogTitle } from 'src/components/ui/dialog';
import { specialtiesHttp } from 'src/services/api/specialties';

import { AlertCheck } from '../alerts/alertCheck';
import { Button } from '../ui/button';
import { Form } from '../ui/form';
import Spinner from '../ui/icons/spinner';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { TextArea } from '../ui/textArea';

import { demoSchema, DemoSchema } from './schema';

export function ModalRegisterSpecialty({ id = '', name = '', description = '', onClose = () => {} }) {
  const [modalCheckOpen, setModalCheckOpen] = useState(false);

  const form = useForm<DemoSchema>({
    resolver: zodResolver(demoSchema),
  });

  form.control._defaultValues.name = name;
  form.control._defaultValues.description = description;

  const registerSpecialty = useMutation({
    mutationKey: [''],
    mutationFn: specialtiesHttp.post,
    onSuccess: () => {
      setModalCheckOpen(true);
      form.control._reset();
    },
  });

  const editSpecialty = useMutation({
    mutationKey: [''],
    mutationFn: specialtiesHttp.patch,
    onSuccess: () => {
      setModalCheckOpen(true);
    },
  });

  const onSubmit = (data: DemoSchema) => {
    if (id === '') {
      registerSpecialty.mutate(data);
    } else {
      editSpecialty.mutate({ id, name: data.name, description: data.description });
    }
  };

  console.log(modalCheckOpen);
  return (
    <DialogContent className='w-[429px] min-h-[424px] max-h-[424px] rounded-lg bg-green-400 border-none px-0 pt-14 pb-0'>
      <div className='absolute flex w-full h-14 items-center justify-center px-20'>
        <DialogTitle className='font-bold text-white text-[16px] text-center'>REGISTRAR ESPECIALIDAD</DialogTitle>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='relative w-full h-auto flex flex-col rounded-b-lg bg-white py-4 px-8'
        >
          <div className='flex flex-col'>
            <div className='flex justify-center items-center space-x-6 mb-3'>
              <div className='w-full flex-1'>
                <Label className='text-[12pxS]'>NOMBRE</Label>
                <Input
                  id='name'
                  disabled={registerSpecialty.isPending || editSpecialty.isPending}
                  {...form.register('name')}
                  className='h-11'
                />
                {form.formState.errors.name && (
                  <div className='flex column-flex'>
                    <span className='text-red-500 absolute'>{form.formState.errors.name.message}</span>
                  </div>
                )}
              </div>
              <button className='flex justify-center items-center bg-green-400 rounded-full w-[85px] h-[85px]'>
                <LucideCamera fill='white' className='w-[55px] h-[60px]' />
              </button>
            </div>
            <div className='w-full flex-1'>
              <Label className='text-[12pxS]'>DESCRIPCIÓN</Label>
              <TextArea
                disabled={registerSpecialty.isPending || editSpecialty.isPending}
                id='description'
                {...form.register('description')}
                className='h-32'
              />
              {form.formState.errors.description && (
                <div className='flex column-flex'>
                  <span className='text-red-500 absolute'>{form.formState.errors.description.message}</span>
                </div>
              )}
            </div>
          </div>
          <div className='flex w-full h-full justify-between items-center pt-4'>
            <Button
              disabled={registerSpecialty.isPending || editSpecialty.isPending}
              className='w-[163px] h-[46px]:'
              type='submit'
              variant={'btnGreen'}
            >
              {id === '' ? (
                registerSpecialty.isPending ? (
                  <Spinner />
                ) : (
                  'Registrar'
                )
              ) : editSpecialty.isPending ? (
                <Spinner />
              ) : (
                'Editar'
              )}
            </Button>
            {modalCheckOpen && (
              <DialogClose>
                <AlertCheck
                  title='¡Especialidad Editada con éxito!'
                  onClose={() => {
                    setModalCheckOpen(false);
                    onClose();
                  }}
                />
              </DialogClose>
            )}
            <DialogClose>
              <Button className='w-[163px] h-[46px]' type='button' variant={'btnGray'}>
                Cancelar
              </Button>
            </DialogClose>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
}
