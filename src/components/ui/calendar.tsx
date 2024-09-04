/* eslint-disable prettier/prettier */

import dayjs, { Dayjs } from 'dayjs';
import React, { useState } from 'react';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';

import { generateDate, months } from '../../utils/calendarDay';
import cd from '../../utils/utils';
import { Label } from '../ui/label';

import { Button } from './button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './dialog';
import Add from './icons/add';

export default function Calendar() {
  const days = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
  const currentDate: Dayjs = dayjs();
  const [today, setToday] = useState<Dayjs>(currentDate);
  const [selectedDates, setSelectedDates] = useState<Dayjs[]>([]);
  const [isMultiSelectEnabled, setIsMultiSelectEnabled] = useState(false); // Estado para el checkbox

  const toggleDateSelection = (date: Dayjs) => {
    // Verificar si la fecha es menor a la actual
    if (date.isBefore(currentDate, 'day')) {
      return; // Si es menor, no permite la selección
    }

    // Lógica para seleccionar múltiples fechas o una única fecha
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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='rounded-full items-center justify-center  w-[68px] h-[68px] bg-[#539091]'>
          <Add fill='#ffffff' className=' flex w-[116px] h-[36px] text-[14px] '></Add>
        </Button>
      </DialogTrigger>
      <DialogContent className=' flex items-center flex-col fixed '>
        <DialogHeader className='bg-[#539091] flex '>
          <DialogTitle className='text-[#ffffff] flex '>SELECCIONAR DIA(S)</DialogTitle>
        </DialogHeader>

        <div className='text-center  grid w-[450px]'>
          <div className='flex text-[#969696] text-[14px] font-medium '>
            <input
              type='checkbox'
              id='multiSelect'
              className='flex form-checkbox h-5 w-5 rounded-lg border-4 border-green-300 focus:ring-blue-500 mr-2 accent-green-500 bg-green-500'
              checked={isMultiSelectEnabled}
              onChange={() => setIsMultiSelectEnabled(!isMultiSelectEnabled)}
            />
            <Label className='text-[#539091] font-roboto font-bold justify-center flex' htmlFor='multiSelect'>
              Seleccionar
            </Label>
          </div>

          <header className='bg-[#539091] flex flex-col items-center justify-center text-white text-xl rounded-[15px] h-[437px]'>
            <div className='flex gap-10 sm:divide-x justify-center h-full items-center sm:flex-row flex-col mt-[-20px]'>
              <div className='w-96 h-96'>
                <div className='flex justify-between items-center'>
                  <Label className='select-none font-semibold'>
                    {months[today.month()]}, {today.year()}
                  </Label>
                  <div className='flex gap-10 items-center'>
                    <GrFormPrevious
                      className='w-5 h-5 cursor-pointer hover:scale-105 transition-all'
                      onClick={() => setToday(today.month(today.month() - 1))}
                    />
                    <Label
                      className='cursor-pointer hover:scale-105 transition-all font-bold'
                      onClick={() => setToday(currentDate)}
                    >
                      Hoy
                    </Label>
                    <GrFormNext
                      className='w-5 h-5 cursor-pointer hover:scale-105 transition-all'
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
                    <div key={index} className='p-2 text-center h-15 grid place-content-center text-sm border-t'>
                      <Label
                        className={cd(
                          currentMonth ? '' : 'text-gray-400',
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
        <DialogFooter>
          <Button
            type='submit'
            variant='btnGreen'
            className='h-[46px] rounded-[6px] w-[163px] font-montserrat text-[#fff] text-[16px] '
          >
            Guardar
          </Button>
          <DialogClose>
            <Button
              type='submit'
              className='h-[46px] w-[163px] font-montserrat font-bold text-[#fff] text-[16px] bg-[#969696] '
            >
              Cancelar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}