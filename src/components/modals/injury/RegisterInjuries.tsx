/* eslint-disable prettier/prettier */
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { DialogClose, DialogContent, DialogTitle } from 'src/components/ui/dialog';
import { Form } from 'src/components/ui/form';
import { injuryHttp } from 'src/services/api/injury';

import { AlertCheck } from '../../alerts/alertCheck';
import { Button } from '../../ui/button';
import Spinner from '../../ui/icons/spinner';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';

import { InjurySchema } from './schema';

interface AlertName {
  title: string;
  titleInjury?: string;
  descriptionInjury?: string;
  alert: string;
  id?: string;
  onClose?: () => void;
  Recargar?: () => void;
}
export function RegisterInjuries({
  title,
  titleInjury,
  descriptionInjury,
  alert,
  id,
  onClose,
  Recargar = () => {},
}: AlertName) {
  const [modalCheckOpen, setModalCheckOpen] = useState(false);

  const form = useForm<InjurySchema>({
    resolver: zodResolver(InjurySchema),
    defaultValues: { name: titleInjury, description: descriptionInjury },
  });
  const handleClose = () => {
    form.reset(); // Resetea el formulario
    if (onClose) onClose(); // Llama a la función onClose si se pasó una
  };

  const registreInjury = useMutation({
    mutationKey: [''],
    mutationFn: injuryHttp.postInjury,
    onSuccess: () => {
      console.log('creado');
      setModalCheckOpen(true);
    },
    onError: () => {
      console.log(registreInjury.error?.message);
    },
  });

  const EditInjury = useMutation({
    mutationKey: [''],
    mutationFn: injuryHttp.patchInjury,
    onSuccess: () => {
      console.log('Editado');
      setModalCheckOpen(true);
    },
    onError: () => {
      console.log(EditInjury.error?.message);
    },
  });

  const onSubmit = (data: InjurySchema) => {
    if (!id) {
      registreInjury.mutate({
        name: data.name,
        description: data.description,
      });
    } else {
      EditInjury.mutate({
        id: id,
        name: data.name,
        description: data.description,
      });
    }
  };
  return (
    <DialogContent
      onCloseAutoFocus={handleClose}
      className='min-w-[429px] max-w-[529px] min-h-[403px] max-h-[500px] rounded-lg bg-green-400 border-none px-0 pt-14 pb-0'
    >
      <div className='absolute flex w-full h-14 items-center justify-center px-20'>
        <DialogTitle className='flex font-bold text-white text-[16px] text-center'>{title}</DialogTitle>
      </div>
      <div className='relative w-full h-full flex flex-col rounded-b-lg bg-white px-10 py-6 '>
        <div className='flex flex-col w-full justify-center space-x-2'>
          <Form {...form}>
            <form className='space-y-4 ' onSubmit={form.handleSubmit(onSubmit)}>
              <div className='flex  flex-col'>
                <Label className='text-green-400 font-roboto font-bold h-7 text-[14px]'>NOMBRE</Label>
                <Input id='name' className='w-full h-11 rounded-2 font-roboto text-base' {...form.register('name')} />
                {form.formState.errors.name && (
                  <span className='text-red-500'>{form.formState.errors.name.message}</span>
                )}
                <Label className='text-green-400 font-roboto font-bold h-7 mt-5 text-[14px]'>DESCRIPCION</Label>
                <Input
                  id='description'
                  className='w-full  h-28 rounded-3 font-roboto text-base line-clamp-5 '
                  {...form.register('description')}
                />
                {form.formState.errors.description && (
                  <span className='text-red-500'>{form.formState.errors.description.message}</span>
                )}
              </div>
              <div className='flex flex-row justify-center p-4'>
                <Button
                  className='w-[163px] h-[46px] mr-4'
                  type='submit'
                  variant={'btnGreen'}
                  disabled={registreInjury.isPending || EditInjury.isPending}
                >
                  {id === undefined ? (
                    registreInjury.isPending ? (
                      <Spinner />
                    ) : (
                      'Guardar'
                    )
                  ) : EditInjury.isPending ? (
                    <Spinner />
                  ) : (
                    'Editar'
                  )}
                </Button>

                {modalCheckOpen && (
                  <DialogClose>
                    <AlertCheck
                      title={`¡${alert} Registrada Correctamente!`}
                      onClose={() => {
                        setModalCheckOpen(false);
                        Recargar();
                      }}
                    />
                  </DialogClose>
                )}
              </div>
            </form>
          </Form>
        </div>
      </div>
    </DialogContent>
  );
}
