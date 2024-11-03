import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Button } from 'src/components/ui/button';
import { Form } from 'src/components/ui/form';
import { Input } from 'src/components/ui/input';
import { Schedules } from 'src/services/api/interface';
import { SchedulesHttp } from 'src/services/api/Schedules';

import { ScheduleAdded } from './alertScheduleAdd';
import { ScheduleSchema, scheduleSchema } from './schema';

interface AddScheduleProps {
  onClose?: () => void;
  onAdd?: () => void;
  onServerError?: (message: string) => void;
  scheduleUpdate?: Schedules;
}

export function AddSchedule({
  onClose,
  onAdd,
  onServerError,
  scheduleUpdate = {
    id: '',
    name: '',
    from: '',
    to: '',
    slotTime: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
}: AddScheduleProps) {
  const navigate = useNavigate();
  const [showScheduleAdded, setShowScheduleAdded] = useState(false);
  const schedule = useMutation({
    mutationFn: SchedulesHttp.postSchedule,
  });
  const form = useForm<ScheduleSchema>({
    resolver: zodResolver(scheduleSchema),
    defaultValues: scheduleUpdate,
  });

  const handleAdd = () => {
    if (onClose) onClose(); // Cierra el modal de AddSchedule
    if (onAdd) onAdd();
    setShowScheduleAdded(true); // Abre el modal de ScheduleAdded
  };

  const handleCancel = () => {
    if (onClose) onClose(); // Cierra el modal de AddSchedule
    navigate('/register-schedules'); // Redirige a la pantalla de horarios (Schedules)
  };

  const handleContinue = () => {
    navigate('/register-schedules'); // Redirige de vuelta a la pantalla de horarios
  };

  const handleSubmit = async (data: ScheduleSchema) => {
    schedule.mutate(
      {
        name: data.name,
        from: data.from,
        to: data.to,
        slotTime: data.slotTime,
      },
      {
        onSuccess: handleAdd,
        onError: (error) => {
          if (onServerError) onServerError(error?.message || 'ocurrió un error');
        },
      },
    );
  };

  return (
    <>
      {!showScheduleAdded ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className='rounded-lg w-auto overflow-hidden'>
              <div className='bg-green-400 text-white py-2 text-center'>
                <h2 className='text-lg font-bold'>AÑADIR HORARIO</h2>
              </div>

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

                {/* Botones Añadir y Cancelar */}
                <div className='flex justify-between mt-3'>
                  <Button variant='btnGreen' className='w-1/2 h-[35px] mr-2' type='submit'>
                    {scheduleUpdate.id !== '' ? 'Añadir' : 'Editar'}
                  </Button>
                  <Button variant='btnGray' className='w-1/2 h-[35px] ml-2' onClick={handleCancel}>
                    Cancelar
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </Form>
      ) : (
        <ScheduleAdded onContinue={handleContinue} />
      )}
    </>
  );
}
