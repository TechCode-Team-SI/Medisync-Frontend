'use client';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar as CalendarIcon } from 'lucide-react';
import * as React from 'react';
import { DateRange } from 'react-day-picker';

import { Button } from 'src/components/ui/button';
import { Calendar } from 'src/components/ui/calendar-shadcn';
import { Popover, PopoverContent, PopoverTrigger } from 'src/components/ui/popover';
import { cn } from 'src/utils/utils';

interface Props extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  initialDateRange?: DateRange;
  onChange?: (date?: DateRange) => void;
}

export function DatePickerWithRange({ className, initialDateRange, onChange = () => {} }: Props) {
  const [date, setDate] = React.useState<DateRange | undefined>(initialDateRange);

  const selectDate = (date?: DateRange) => {
    setDate(date);
    onChange(date);
  };

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id='date'
            variant={'outline'}
            className={cn('w-[300px] justify-start text-left font-normal', !date && 'text-muted-foreground')}
          >
            <CalendarIcon className='mr-2 h-4 w-4' />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y', { locale: es })} - {format(date.to, 'LLL dd, y', { locale: es })}
                </>
              ) : (
                format(date.from, 'LLL dd, y', { locale: es })
              )
            ) : (
              <span>fecha</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <Calendar
            initialFocus
            mode='range'
            defaultMonth={date?.from}
            selected={date}
            onSelect={selectDate}
            numberOfMonths={2}
            locale={es}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
