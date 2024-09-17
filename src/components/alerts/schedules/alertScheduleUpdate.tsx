import { Button } from 'src/components/ui/button';
import CheckMarkIcon from 'src/components/ui/icons/checkmark';

interface ScheduleUpdatedProps {
  onContinue: () => void; // Definimos la prop onContinue
}

export function ScheduleUpdated({ onContinue }: ScheduleUpdatedProps) {
  return (
    <div className='w-full h-full flex flex-col items-center justify-center bg-gray-100'>
      <div className='bg-white rounded-lg w-[350px] p-6 flex flex-col items-center'>
        <CheckMarkIcon />
        <h2 className='text-xl font-bold text-center my-4'>¡Horario Actualizado Exitosamente!</h2>
        <Button variant='btnGreen' className='w-full h-[40px]' onClick={onContinue}>
          Continuar
        </Button>
      </div>
    </div>
  );
}