/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from 'src/components/ui/button';
import { Input } from 'src/components/ui/input';

import { ScheduleAdded } from './alertScheduleAdd';

interface AddScheduleProps {
  onClose?: () => void;
  onAdd?: () => void;
}

export function AddSchedule({ onClose, onAdd }: AddScheduleProps) {
  const navigate = useNavigate();
  const [showScheduleAdded, setShowScheduleAdded] = useState(false);

  const handleAdd = () => {
    if (onClose) onClose(); // Cierra el modal de AddSchedule
    if (onAdd) onAdd(); // Llama a la función onAdd
    setShowScheduleAdded(true); // Abre el modal de ScheduleAdded
  };

  const handleCancel = () => {
    if (onClose) onClose(); // Cierra el modal de AddSchedule
    navigate('/register-schedules'); // Redirige a la pantalla de horarios (Schedules)
  };

  const handleContinue = () => {
    navigate('/register-schedules'); // Redirige de vuelta a la pantalla de horarios
  };

  return (
    <>
      {!showScheduleAdded ? (
        <div className='w-full h-full flex flex-col items-center justify-center bg-gray-100'>
          {/* Contenedor reducido */}
          <div className='bg-white rounded-lg w-auto p-4'>
            <div className='bg-green-400 text-white rounded-t-lg py-2 text-center'>
              <h2 className='text-lg font-bold'>AÑADIR HORARIO</h2>
            </div>

            <div className='p-2 flex flex-col gap-3'>
              {/* Nombre del Doctor */}
              <div className='flex flex-col'>
                <label className='text-sm text-green-400 font-bold'>NOMBRE</label>
                <Input
                  placeholder='Ingrese el nombre'
                  className='mt-1 w-full h-[35px] bg-green-100/50 border-none rounded-md text-[14px] placeholder:text-green-300 focus-visible:ring-green-400'
                />
              </div>

              {/* Hora Inicio y Hora Fin */}
              <div className='flex justify-between gap-2'>
                <div className='flex flex-col w-1/2'>
                  <label className='text-sm text-green-400 font-bold'>HORA INICIO</label>
                  <Input
                    placeholder='HH:MM AM'
                    className='mt-1 w-full h-[35px] bg-green-100/50 border-none rounded-md text-[14px] placeholder:text-green-300 focus-visible:ring-green-400'
                  />
                </div>

                <div className='flex flex-col w-1/2'>
                  <label className='text-sm text-green-400 font-bold'>HORA FIN</label>
                  <Input
                    placeholder='HH:MM AM'
                    className='mt-1 w-full h-[35px] bg-green-100/50 border-none rounded-md text-[14px] placeholder:text-green-300 focus-visible:ring-green-400'
                  />
                </div>
              </div>

              {/* Botones Añadir y Cancelar */}
              <div className='flex justify-between mt-3'>
                <Button variant='btnGreen' className='w-1/2 h-[35px] mr-2' onClick={handleAdd}>
                  Añadir
                </Button>
                <Button variant='btnGray' className='w-1/2 h-[35px] ml-2' onClick={handleCancel}>
                  Cancelar
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <ScheduleAdded onContinue={handleContinue} />
      )}
    </>
  );
}
