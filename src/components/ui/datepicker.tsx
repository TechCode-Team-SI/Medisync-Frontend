'use client';

import { format, getMonth, getYear, setMonth, setYear } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar as CalendarIcon } from 'lucide-react';
import * as React from 'react';
import { Matcher } from 'react-day-picker';

import { Button } from 'src/components/ui/button';
import { Calendar } from 'src/components/ui/calendar-shadcn';
import { Popover, PopoverContent, PopoverTrigger } from 'src/components/ui/popover';
import { months } from 'src/utils/calendarDay';
import { cn } from 'src/utils/utils';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';

interface Props {
  initialDate?: Date;
  onChange?: (date?: Date) => void;
  startYear?: number;
  endYear?: number;
  disabled?: Matcher | Matcher[];
  isDisabled?: boolean;
}

export function DatePicker({
  initialDate,
  startYear = getYear(new Date()) - 50,
  endYear = getYear(new Date()),
  disabled,
  isDisabled = false,
  onChange = () => {},
}: Props) {
  const [date, setDate] = React.useState<Date | undefined>(initialDate);
  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);

  const handleMonthChange = (month: string) => {
    if (!date) {
      setDate(setMonth(new Date(), months.indexOf(month)));
    } else {
      setDate(setMonth(date, months.indexOf(month)));
    }
  };

  const handleYearsChange = (year: string) => {
    if (!date) {
      setDate(setYear(new Date(), parseInt(year)));
    } else {
      setDate(setYear(date, parseInt(year)));
    }
  };

  const onSelectDate = (date?: Date) => {
    if (date) {
      setDate(date);
      onChange(date);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          disabled={isDisabled}
          variant={'outline'}
          className={cn(
            'w-[250px] justify-start text-left font-normal',
            !date && 'text-muted-foreground',
            isDisabled ? 'cursor-not-allowed' : '',
          )}
        >
          <CalendarIcon className='mr-2 h-4 w-4' />
          {date ? format(date, 'PPP', { locale: es }) : <span>fecha</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0'>
        <div className='flex justify-between items-center p-2'>
          <Select onValueChange={handleMonthChange} value={date ? months[getMonth(date)] : ''}>
            <SelectTrigger className='w-[130px] bg-transparent text-black border border-gray-300 hover:bg-white focus:ring-2 focus:ring-offset-2 focus:ring-gray-400'>
              <SelectValue placeholder='Mes' />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month} value={month} className='hover:bg-gray-100 text-black'>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={handleYearsChange} value={date ? getYear(date).toString() : ''}>
            <SelectTrigger className='w-[110px] bg-transparent text-black border border-gray-300 hover:bg-white focus:ring-2 focus:ring-offset-2 focus:ring-gray-400'>
              <SelectValue placeholder='Año' />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()} className='hover:bg-gray-100 text-black'>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Calendar
          locale={es}
          mode='single'
          selected={date}
          onSelect={onSelectDate}
          initialFocus
          month={date}
          disabled={disabled}
          onMonthChange={setDate}
        />
      </PopoverContent>
    </Popover>
  );
}
