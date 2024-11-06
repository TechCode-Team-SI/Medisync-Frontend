import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import { useState } from 'react';

import PaginationController from 'src/components/common/pagination';
import { CardTitle } from 'src/components/ui/card';
import LoadingWrapper from 'src/components/wrappers/LoadingWrapper';
import { MainContentWrapper } from 'src/components/wrappers/mainContentWrapper';
import { RequestsHttp } from 'src/services/api/request';
import { cn } from 'src/utils';
import { DEBOUNCE_DELAY, RequestStatusEnum } from 'src/utils/constants';
import { calculateAge, formatDate, getGenderLabel, parseRequestStatus } from 'src/utils/utils';

export function ListMyCancelledAppointments() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, DEBOUNCE_DELAY);
  const [page, setPage] = useState(1);
  const { data: appointments, isFetching } = useQuery({
    queryKey: [debouncedSearchTerm, `${page}`, `get-all-my-pending-appointments`],
    queryFn: ({ queryKey }) =>
      RequestsHttp.getMyRequests({
        status: [RequestStatusEnum.CANCELLED],
        search: queryKey[0],
        page: queryKey[1],
      }),
  });

  return (
    <MainContentWrapper>
      <MainContentWrapper.Header withBrowser setSearchTerm={setSearchTerm} title='MIS CITAS CANCELADAS' />
      <MainContentWrapper.Body>
        <LoadingWrapper isLoading={!(appointments?.data && !isFetching)}>
          {appointments?.data.map((appointment) => (
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
              <span className='text-gray-100 absolute top-1 right-0 font-medium text-center px-2 py-2 bg-gray-500'>
                {parseRequestStatus(appointment.status)}
              </span>
            </div>
          ))}
        </LoadingWrapper>
      </MainContentWrapper.Body>
      <MainContentWrapper.Footer>
        <PaginationController
          totalPages={appointments?.totalPages || 1}
          currentPage={appointments?.currentPage || 1}
          goToPreviousPage={(newPage) => setPage(newPage)}
          goToNextPage={(newPage) => setPage(newPage)}
        />
      </MainContentWrapper.Footer>
    </MainContentWrapper>
  );
}
