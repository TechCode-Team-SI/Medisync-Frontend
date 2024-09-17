/* eslint-disable prettier/prettier */
import dayjs, { Dayjs } from 'dayjs';

interface DateObject {
  currentMonth: boolean;
  date: Dayjs;
  today?: boolean;
  disabled?: boolean; // Añadido para la validación de fechas anteriores
}

export const generateDate = (month: number = dayjs().month(), year: number = dayjs().year()): DateObject[] => {
  const firstDateOfMonth = dayjs().year(year).month(month).startOf('month');
  const lastDateOfMonth = dayjs().year(year).month(month).endOf('month');
  const today = dayjs();

  const arrayOfDate: DateObject[] = [];

  // Crear fechas de relleno al inicio del mes
  for (let i = 0; i < firstDateOfMonth.day(); i++) {
    const date = firstDateOfMonth.day(i);
    arrayOfDate.push({
      currentMonth: false,
      date,
    });
  }

  // Generar fechas del mes actual
  for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
    const date = firstDateOfMonth.date(i);
    arrayOfDate.push({
      currentMonth: true,
      date,
      today: date.toDate().toDateString() === today.toDate().toDateString(),
      disabled: date.isBefore(today, 'day'), // Fecha deshabilitada si es antes de hoy
    });
  }

  // Crear fechas de relleno al final del mes
  const remaining = 42 - arrayOfDate.length;
  for (let i = lastDateOfMonth.date() + 1; i <= lastDateOfMonth.date() + remaining; i++) {
    arrayOfDate.push({
      currentMonth: false,
      date: lastDateOfMonth.date(i),
    });
  }

  return arrayOfDate;
};

export const months: string[] = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];
