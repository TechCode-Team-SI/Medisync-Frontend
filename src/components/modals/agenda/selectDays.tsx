import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { toast } from 'sonner';

import { DatePickerWithRange } from 'src/components/ui/datepicker-range';
import { DialogClose, DialogContent, DialogTitle } from 'src/components/ui/dialog';
import { Label } from 'src/components/ui/label';

import { Button } from '../../ui/button';

interface SelectDaysProps {
  onClose?: () => void;
  dateSelect?: (datePicked: DateRange) => void;
}

export function SelectDays({ onClose, dateSelect }: SelectDaysProps) {
  const [dateRange, setDateRange] = useState<DateRange>({ from: undefined, to: undefined });

  const onSubmit = () => {
    if (dateRange && dateRange.from) {
      if (!dateRange.to) {
        dateRange.to = dateRange.from;
      }
      dateSelect?.(dateRange);
      onClose?.();
      setDateRange({ from: undefined, to: undefined });
    } else {
      toast.error('Seleccione una Fecha');
      return;
    }
  };

  return (
    <DialogContent
      onCloseAutoFocus={onClose}
      className='min-w-[454px] max-w-[537px] min-h-[284px] max-h-[284px] rounded-lg bg-green-400 border-none px-0 pt-14 pb-0'
    >
      <div className='absolute flex w-full h-14 items-center justify-center px-20'>
        <DialogTitle className='flex font-bold text-white text-[16px] text-center'>SELECCIONAR DÍA</DialogTitle>
      </div>
      <div className='relative w-full h-full flex flex-col rounded-b-lg bg-white px-10 py-6'>
        <div className='flex items-center gap-4'>
          <Label className='font-bold'>Rango de Fechas</Label>
          <DatePickerWithRange
            initialDateRange={dateRange ?? undefined}
            onChange={(range) => setDateRange(range || { from: undefined, to: undefined })}
          />
        </div>
        <div className='flex w-full justify-center pt-4 space-x-2'>
          <DialogClose>
            <Button variant={'btnGreen'} type='button' onClick={onSubmit}>
              Guardar
            </Button>
          </DialogClose>
          <DialogClose>
            <Button variant={'btnGray'} type='button' onClick={onClose}>
              Cancelar
            </Button>
          </DialogClose>
        </div>
      </div>
    </DialogContent>
  );
}
