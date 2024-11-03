import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { DialogClose, DialogContent, DialogTitle } from 'src/components/ui/dialog';
import { Schedules } from 'src/services/api/interface';
import { SchedulesHttp } from 'src/services/api/Schedules';

import { AlertCheck } from '../../alerts/alertCheck';
import { Button } from '../../ui/button';
import { Form } from '../../ui/form';
import Spinner from '../../ui/icons/spinner';
import { Input } from '../../ui/input';

import { demoSchema, DemoSchema } from './schema';

interface ScheduleData {
  schedule?: Schedules;
  onClose?: () => void;
}

export function ModalSchedule({
  schedule = { id: '', name: '', from: '', to: '', slotTime: '', createdAt: new Date(), updatedAt: new Date() },
  onClose = () => {},
}: ScheduleData) {
  const [modalCheckOpen, setModalCheckOpen] = useState(false);

  const form = useForm<DemoSchema>({
    resolver: zodResolver(demoSchema),
  });

  form.control._defaultValues.name = schedule.name;
  form.control._defaultValues.from = schedule.from;
  form.control._defaultValues.to = schedule.to;
  form.control._defaultValues.slotTime = schedule.slotTime.toString();

  const registerSchedule = useMutation({
    mutationKey: [''],
    mutationFn: SchedulesHttp.postSchedule,
    onSuccess: () => {
      setModalCheckOpen(true);
      form.control._reset();
    },
  });

  const editSchedule = useMutation({
    mutationKey: [''],
    mutationFn: SchedulesHttp.patchSchedule,
    onSuccess: () => {
      setModalCheckOpen(true);
    },
  });

  const onSubmit = (data: DemoSchema) => {
    if (schedule.id === '') {
      registerSchedule.mutate(data);
    } else {
      editSchedule.mutate({ id: schedule.id, ...data });
    }
  };

  console.log(modalCheckOpen);
  return (
    <DialogContent className='w-[429px] min-h-[424px] max-h-[424px] rounded-lg bg-green-400 border-none px-0 pt-14 pb-0'>
      <div className='absolute flex w-full h-14 items-center justify-center px-20'>
        <DialogTitle className='font-bold text-white text-[16px] text-center'>AÑADIR HORARIO</DialogTitle>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='relative w-full h-auto flex flex-col rounded-b-lg bg-white py-4 px-8'
        >
          <div className='p-2 flex flex-col gap-3'>
            {/* Nombre del identificador */}
            <div className='flex flex-col'>
              <label htmlFor='schedule-name' className='text-sm text-green-400 font-bold'>
                NOMBRE
              </label>
              <Input
                {...form.register('name')}
                id='schedule-name'
                placeholder='Ingrese el nombre'
                className='mt-1 w-full h-[35px] bg-green-100/50 border-none rounded-md text-[14px] placeholder:text-green-300 focus-visible:ring-green-400'
              />
              {form.formState.errors.name && (
                <div className='flex column-flex'>
                  <span className='text-red-500 absolute'>{form.formState.errors.name.message}</span>
                </div>
              )}
            </div>

            {/* Hora Inicio y Hora Fin */}
            <div className='flex justify-between gap-2'>
              <div className='flex flex-col w-1/2'>
                <label htmlFor='schedule-from' className='text-sm text-green-400 font-bold'>
                  HORA INICIO
                </label>
                <Input
                  {...form.register('from')}
                  id='schedule-from'
                  placeholder='HH:MM'
                  className='mt-1 w-full h-[35px] bg-green-100/50 border-none rounded-md text-[14px] placeholder:text-green-300 focus-visible:ring-green-400'
                />
                {form.formState.errors.from && (
                  <div className='flex column-flex'>
                    <span className='text-red-500 absolute'>{form.formState.errors.from.message}</span>
                  </div>
                )}
              </div>

              <div className='flex flex-col w-1/2'>
                <label htmlFor='schedule-to' className='text-sm text-green-400 font-bold'>
                  HORA FIN
                </label>
                <Input
                  {...form.register('to')}
                  id='schedule-to'
                  placeholder='HH:MM'
                  className='mt-1 w-full h-[35px] bg-green-100/50 border-none rounded-md text-[14px] placeholder:text-green-300 focus-visible:ring-green-400'
                />
                {form.formState.errors.to && (
                  <div className='flex column-flex'>
                    <span className='text-red-500 absolute'>{form.formState.errors.to.message}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Tiempo entre citas (minutos) */}
            <div className='flex flex-col'>
              <label htmlFor='schedule-slotTime' className='text-sm text-green-400 font-bold'>
                Tiempo entre citas (minutos)
              </label>
              <Input
                {...form.register('slotTime')}
                id='schedule-slotTime'
                placeholder='Ingrese el tiempo'
                className='mt-1 w-full h-[35px] bg-green-100/50 border-none rounded-md text-[14px] placeholder:text-green-300 focus-visible:ring-green-400'
              />
              {form.formState.errors.slotTime && (
                <div className='flex column-flex'>
                  <span className='text-red-500 absolute'>{form.formState.errors.slotTime.message}</span>
                </div>
              )}
            </div>
          </div>
          <div className='flex w-full h-full justify-between items-center pt-4'>
            <Button
              disabled={registerSchedule.isPending || editSchedule.isPending}
              className='w-[163px] h-[46px]:'
              type='submit'
              variant={'btnGreen'}
            >
              {schedule.id === '' ? (
                registerSchedule.isPending ? (
                  <Spinner />
                ) : (
                  'Guardar'
                )
              ) : editSchedule.isPending ? (
                <Spinner />
              ) : (
                'Editar'
              )}
            </Button>
            {modalCheckOpen && (
              <DialogClose>
                <AlertCheck
                  title='¡Horario Editado con éxito!'
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
