import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import { useState } from 'react';

import { CardTitle } from 'src/components/ui/card';
import LoadingWrapper from 'src/components/wrappers/LoadingWrapper';
import { MainContentWrapper } from 'src/components/wrappers/mainContentWrapper';
import { cn } from 'src/utils';
import { DEBOUNCE_DELAY, GenderEnum, RequestStatusEnum } from 'src/utils/constants';
import { formatDate, getGenderLabel, parseRequestStatus } from 'src/utils/utils';

const data = [
  {
    id: '1',
    fullName: 'kevin cheng',
    edad: 20,
    genero: GenderEnum.MALE,
    especialidad: 'cardiologia',
    hora: '10:00',
    updatedAt: new Date(),
    status: RequestStatusEnum.COMPLETED,
  },
  {
    id: '2',
    fullName: 'kevin cheng',
    edad: 20,
    genero: GenderEnum.MALE,
    especialidad: 'cardiologia',
    hora: '10:00',
    updatedAt: new Date(),
    status: RequestStatusEnum.COMPLETED,
  },
  {
    id: '3',
    fullName: 'kevin cheng',
    edad: 20,
    genero: GenderEnum.MALE,
    especialidad: 'cardiologia',
    hora: '10:00',
    updatedAt: new Date(),
    status: RequestStatusEnum.COMPLETED,
  },
];

export function ListMyAttendedAppointments() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, DEBOUNCE_DELAY);
  const { data: question, isFetching } = useQuery({
    queryKey: [debouncedSearchTerm, `get-my-completed-appointments`],
    queryFn: ({ queryKey }) => ({ data }),
  });

  return (
    <MainContentWrapper>
      <MainContentWrapper.Header withBrowser setSearchTerm={setSearchTerm} title='MIS CITAS ATENDIDAS' />
      <MainContentWrapper.Body>
        <LoadingWrapper isLoading={!(question?.data && !isFetching)}>
          {question?.data.map((appointment) => (
            <div
              key={appointment.id}
              className={cn(
                'w-full transition-all min-h-36 transform bg-white drop-shadow-md hover:drop-shadow-lg border-none rounded-md flex flex-col px-5 py-4 overflow-hidden items-start relative',
              )}
            >
              <CardTitle className='w-full font-roboto text-lg font-bold flex text-green-400 hover:text-green-400'>
                {appointment.fullName}
              </CardTitle>
              <span className='text-gray-600 text-sm font-medium'>
                {appointment.edad} años | {getGenderLabel(appointment.genero)}
              </span>
              <span className='text-green-400 text-wrap text-start line-clamp-1'>{appointment.especialidad}</span>
              <span className='text-gray-100 absolute bottom-0 left-0'>
                <span className={cn('font-medium text-center px-2 py-2 bg-green-500')}>
                  {formatDate(appointment.updatedAt)}
                </span>
                <span className=' font-semibold tracking-wider text-center px-3 py-2 bg-green-500'>
                  {appointment.hora}
                </span>
              </span>
              <span className='text-gray-100 absolute top-1 right-0 font-medium text-center px-2 py-2 bg-green-500'>
                {parseRequestStatus(appointment.status)}
              </span>
            </div>
          ))}
        </LoadingWrapper>
      </MainContentWrapper.Body>
    </MainContentWrapper>
  );
}
