import { useQuery } from '@tanstack/react-query';
import { endOfDay, startOfDay } from 'date-fns';
import { es } from 'date-fns/locale';
import { useState } from 'react';

import { Calendar } from 'src/components/ui/calendar-shadcn';
import { CardTitle } from 'src/components/ui/card';
import LoadingWrapper from 'src/components/wrappers/LoadingWrapper';
import { MainContentWrapper } from 'src/components/wrappers/mainContentWrapper';
import { RequestsHttp } from 'src/services/api/request';
import { cn } from 'src/utils';
import { RequestStatusEnum } from 'src/utils/constants';
import { calculateAge, formatDate, getGenderLabel, parseRequestStatus } from 'src/utils/utils';

export function CalendarAppointments() {
  const [date, setDate] = useState<Date | undefined>();

  const { data: appointments, isFetching } = useQuery({
    queryKey: [`get-all-my-pending-appointments-today-onwards`],
    queryFn: () =>
      RequestsHttp.getRequestsCalendar({
        status: [RequestStatusEnum.PENDING, RequestStatusEnum.ATTENDING],
        limit: '100',
        startDate: new Date(),
      }),
  });
  const { data: appointmentsOneDay, isFetching: isFetchingAppointmentsOneday } = useQuery({
    queryKey: [date?.toISOString() || '', `get-all-pending-appointments-one-day`],
    queryFn: async ({ queryKey }) => {
      const date = queryKey[0] ? new Date(queryKey[0] as string) : undefined;
      if (date) {
        return RequestsHttp.getRequestsCalendar({
          status: [RequestStatusEnum.PENDING, RequestStatusEnum.ATTENDING],
          limit: '100',
          startDate: startOfDay(date),
          endDate: endOfDay(date),
        });
      }
      return Promise.resolve({
        data: [],
        currentPage: 1,
        totalPages: 1,
      });
    },
  });

  console.log(appointmentsOneDay);

  const renderStatusColor = (status: RequestStatusEnum) => {
    switch (status) {
      case RequestStatusEnum.PENDING:
        return 'bg-orange-400';
      case RequestStatusEnum.ATTENDING:
        return 'bg-red-500';
      case RequestStatusEnum.COMPLETED:
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <MainContentWrapper>
      <MainContentWrapper.Header title='CALENDARIO DE CITAS' />
      <MainContentWrapper.Body className='p-0 pb-5 overflow-hidden'>
        <LoadingWrapper isLoading={!(appointments?.data && !isFetching)}>
          <div className='w-full flex gap-2'>
            <Calendar
              className='w-1/2'
              classNames={{
                cell: 'aspect-square w-full border text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-slate-100/50 [&:has([aria-selected])]:bg-slate-100 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 dark:[&:has([aria-selected].day-outside)]:bg-slate-800/50 dark:[&:has([aria-selected])]:bg-slate-800',
                caption_end: 'w-full',
                head_cell: 'text-slate-500 rounded-md w-9 font-normal text-[0.8rem] dark:text-slate-400 w-full',
                day: 'w-full text-sm h-full',
              }}
              onDayClick={(date) => setDate(date)}
              modifiers={{
                appointments: [
                  ...(appointments?.data.map((appointment) => new Date(appointment.appointmentDate)) || []),
                ],
              }}
              modifiersClassNames={{
                appointments:
                  'relative after:w-1.5 after:rounded-full after:h-1.5 after:bg-red-500 after:absolute after:bottom-1 after:left-1/2 after:transform after:-translate-x-1/2 after:-translate-y-1/2',
              }}
              disabled={{
                before: new Date(),
              }}
              locale={es}
              mode='single'
              selected={date}
              onSelect={setDate}
            />
            <div className='w-1/2 border text-center'>
              <h3 className='py-3 font-roboto text-xl font-bold text-green-400 hover:text-green-400'>CITAS</h3>
              <LoadingWrapper isLoading={isFetchingAppointmentsOneday}>
                <div className='px-2 min-h-[300px] max-h-[500px] overflow-auto scrollbar-edit flex flex-col items-center gap-5 '>
                  {appointmentsOneDay?.data.map((appointment) => (
                    <div
                      key={appointment.id}
                      className={cn(
                        'w-full transition-all min-h-36 transform bg-white drop-shadow-md hover:drop-shadow-lg border-none rounded-md flex flex-col px-5 py-4 overflow-hidden items-start relative',
                      )}
                    >
                      <CardTitle className='w-full font-roboto text-lg font-bold flex text-green-400 hover:text-green-400'>
                        {appointment.patientFullName}
                      </CardTitle>
                      <span className='text-gray-600 text-sm font-medium'>
                        {calculateAge(appointment.madeFor.birthday)} años | {getGenderLabel(appointment.madeFor.gender)}
                      </span>
                      <span className='text-green-400 text-wrap text-start line-clamp-1'>
                        {appointment.requestedSpecialty.name}
                      </span>
                      <span className='text-gray-100 absolute bottom-0 left-0'>
                        <span className={cn('font-medium text-center px-2 py-2 bg-green-500')}>
                          {formatDate(appointment.appointmentDate)}
                        </span>
                        <span className=' font-semibold tracking-wider text-center px-3 py-2 bg-green-500'>
                          {appointment.appointmentHour}
                        </span>
                      </span>
                      <span
                        className={cn(
                          'text-gray-100 absolute top-1 right-0 font-medium text-center px-2 py-2 bg-green-500',
                          renderStatusColor(appointment.status),
                        )}
                      >
                        {parseRequestStatus(appointment.status)}
                      </span>
                    </div>
                  ))}
                </div>
              </LoadingWrapper>
            </div>
          </div>
        </LoadingWrapper>
      </MainContentWrapper.Body>
    </MainContentWrapper>
  );
}
