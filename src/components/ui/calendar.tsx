import dayjs, { Dayjs } from 'dayjs';
import React, { useState } from 'react';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';

import { generateDate, months } from '../../utils/calendarDay';
import { cn } from '../../utils/utils';
import { Label } from '../ui/label';

export default function Calendar() {
  const days = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
  const currentDate: Dayjs = dayjs();
  const [today, setToday] = useState<Dayjs>(currentDate);
  const [selectedDates, setSelectedDates] = useState<Dayjs[]>([]);
  const [isMultiSelectEnabled, setIsMultiSelectEnabled] = useState(false);

  const toggleDateSelection = (date: Dayjs) => {
    if (date.isBefore(currentDate, 'day')) return;

    if (isMultiSelectEnabled) {
      if (selectedDates.some((selectedDate) => selectedDate.isSame(date, 'day'))) {
        setSelectedDates(selectedDates.filter((selectedDate) => !selectedDate.isSame(date, 'day')));
      } else {
        setSelectedDates([...selectedDates, date]);
      }
    } else {
      setSelectedDates([date]);
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsMultiSelectEnabled(e.target.checked);
    if (!e.target.checked) {
      setSelectedDates([]); // Limpiar fechas seleccionadas si se desactiva la selección múltiple
    }
  };

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='flex justify-normal items-start pb-4 mr-[240px]'>
        {/* Usamos un input de tipo checkbox en lugar del componente Checkbox */}
        <input type='checkbox' className='w-[18px] h-[20px] border-green-900' onChange={handleCheckboxChange} />
        <Label className='text-green-400 font-montserrat font-bold text-[14px] pl-3 pb-10'>Seleccionar Rango</Label>
      </div>
      <div className='bg-[#539091] flex text-center flex-col items-center justify-center text-white text-xl rounded-[15px] w-[434px] h-[385px] pb-4'>
        <header className='bg-[#539091] flex text-center flex-col items-center justify-center text-white text-xl rounded-[15px] w-[434px] h-[385px] pb-4'>
          <div className='flex gap-10 sm:divide-x justify-center h-full items-center sm:flex-row flex-col'>
            <div className='w-full'>
              <div className='flex justify-between items-center'>
                <Label className='select-none font-semibold'>
                  {months[today.month()]}, {today.year()}
                </Label>
                <div className='flex gap-10 items-center'>
                  <GrFormPrevious
                    className='w-5 h-5 cursor-pointer hover:scale-105 transition-all text-[#5DA9A3]'
                    onClick={() => setToday(today.month(today.month() - 1))}
                  />
                  <Label
                    className='cursor-pointer hover:scale-105 transition-all font-bold'
                    onClick={() => setToday(currentDate)}
                  >
                    Hoy
                  </Label>
                  <GrFormNext
                    className='w-5 h-5 cursor-pointer hover:scale-105 transition-all text-[#5DA9A3]'
                    onClick={() => setToday(today.month(today.month() + 1))}
                  />
                </div>
              </div>
              <div className='grid grid-cols-7'>
                {days.map((day, index) => (
                  <Label
                    key={index}
                    className='text-sm text-center h-14 w-14 grid place-content-center text-[#FFFAFA] select-none'
                  >
                    {day}
                  </Label>
                ))}
              </div>
              <div className='grid grid-cols-7'>
                {generateDate(today.month(), today.year()).map(({ date, currentMonth, today: isToday }, index) => (
                  <div key={index} className='p-1 text-center h-14 grid place-content-center text-sm border-t'>
                    <Label
                      className={cn(
                        currentMonth ? 'text-white' : 'text-gray-400',
                        isToday ? 'bg-red-600 text-white' : '',
                        selectedDates.some((selectedDate) => selectedDate.isSame(date, 'day'))
                          ? 'bg-[#5551ff] text-white'
                          : '',
                        date.isBefore(currentDate, 'day') ? 'text-gray-400 cursor-not-allowed' : '',
                        'h-10 w-10 rounded-full grid place-content-center hover:bg-[#5551ff] hover:text-white transition-all cursor-pointer select-none',
                      )}
                      onClick={() => toggleDateSelection(date)}
                    >
                      {date.date()}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
}
