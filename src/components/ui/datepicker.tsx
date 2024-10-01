'use client';

import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar as CalendarIcon } from 'lucide-react';
import * as React from 'react';

import { Button } from 'src/components/ui/button';
import { Calendar } from 'src/components/ui/calendar-shadcn';
import { Popover, PopoverContent, PopoverTrigger } from 'src/components/ui/popover';
import { cn } from 'src/utils/utils';

interface Props {
  initialDate?: Date;
  onChange?: (date?: Date) => void;
}

export function DatePicker({ initialDate, onChange = () => {} }: Props) {
  const [date, setDate] = React.useState<Date | undefined>(initialDate);

  const onSelectDate = (date?: Date) => {
    setDate(date);
    onChange(date);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn('w-[280px] justify-start text-left font-normal', !date && 'text-muted-foreground')}
        >
          <CalendarIcon className='mr-2 h-4 w-4' />
          {date ? format(date, 'PPP', { locale: es }) : <span>fecha</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0'>
        <Calendar locale={es} mode='single' selected={date} onSelect={onSelectDate} initialFocus />
      </PopoverContent>
    </Popover>
  );
}
