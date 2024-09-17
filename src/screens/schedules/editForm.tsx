/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from 'src/components/ui/button';
import { Input } from 'src/components/ui/input';

import { ScheduleUpdated } from './alertScheduleUpdate';

interface EditFormProps {
  onClose?: () => void;
  onSave?: () => void; // Agregamos la prop onSave
}

export function EditForm({ onClose, onSave }: EditFormProps) {
  const navigate = useNavigate();
  const [showScheduleUpdated, setShowScheduleUpdated] = useState(false);

  const handleSave = () => {
    if (onClose) onClose(); // Cierra el modal de EditForm
    if (onSave) onSave(); // Llama a la función onSave
    setShowScheduleUpdated(true); // Abre el modal de ScheduleUpdated
  };

  const handleCancel = () => {
    if (onClose) onClose(); // Cierra el modal de EditForm
    navigate('/edit-schedules'); // Redirige a la pantalla de horarios (EditSchedules)
  };

  const handleContinue = () => {
    navigate('/edit-schedules'); // Redirige de vuelta a la pantalla de horarios
  };

  return (
    <>
      {!showScheduleUpdated ? (
        <div className='w-full h-full flex flex-col items-center justify-center bg-gray-100'>
          {/* Contenedor ajustado */}
          <div className='bg-white rounded-lg w-auto p-4'>
            <div className='bg-green-400 text-white rounded-t-lg py-2 text-center'>
              <h2 className='text-lg font-bold'>EDITAR HORARIO</h2>
            </div>

            <div className='p-2 flex flex-col gap-3'>
              {/* Campo de Médico */}
              <div className='flex flex-col'>
                <label className='text-sm text-green-400 font-bold'>MÉDICO</label>
                <Input
                  defaultValue='Horario 1'
                  className='mt-1 w-full h-[35px] bg-green-100/50 border-none rounded-md text-[14px] placeholder:text-green-300 focus-visible:ring-green-400'
                />
              </div>

              {/* Horarios de Inicio y Fin */}
              <div className='flex justify-between gap-2'>
                <div className='flex flex-col w-1/2'>
                  <label className='text-sm text-green-400 font-bold'>HORA INICIO</label>
                  <Input
                    defaultValue='08:00 AM'
                    className='mt-1 w-full h-[35px] bg-green-100/50 border-none rounded-md text-[14px] placeholder:text-green-300 focus-visible:ring-green-400'
                  />
                </div>
                <div className='flex flex-col w-1/2'>
                  <label className='text-sm text-green-400 font-bold'>HORA FIN</label>
                  <Input
                    defaultValue='12:00 PM'
                    className='mt-1 w-full h-[35px] bg-green-100/50 border-none rounded-md text-[14px] placeholder:text-green-300 focus-visible:ring-green-400'
                  />
                </div>
              </div>

              {/* Botones Guardar y Cancelar */}
              <div className='flex justify-between mt-3'>
                <Button variant='btnGreen' className='w-1/2 h-[35px] mr-2' onClick={handleSave}>
                  Guardar
                </Button>
                <Button variant='btnGray' className='w-1/2 h-[35px] ml-2' onClick={handleCancel}>
                  Cancelar
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <ScheduleUpdated onContinue={handleContinue} />
      )}
    </>
  );
}
