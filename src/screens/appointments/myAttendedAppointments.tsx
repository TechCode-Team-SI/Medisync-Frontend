import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import { ArrowBigRightDash } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PaginationController from 'src/components/common/pagination';
import { Button } from 'src/components/ui/button';
import { CardTitle } from 'src/components/ui/card';
import LoadingWrapper from 'src/components/wrappers/LoadingWrapper';
import { MainContentWrapper } from 'src/components/wrappers/mainContentWrapper';
import { paths } from 'src/paths';
import { RequestsHttp } from 'src/services/api/request';
import { cn } from 'src/utils';
import { DEBOUNCE_DELAY, RequestStatusEnum } from 'src/utils/constants';
import { calculateAge, formatDate, getGenderLabel, parseRequestStatus } from 'src/utils/utils';

export function ListMyAttendedAppointments() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, DEBOUNCE_DELAY);
  const [page, setPage] = useState(1);
  const { data: appointments, isFetching } = useQuery({
    queryKey: [debouncedSearchTerm, `${page}`, `get-all-my-pending-appointments`],
    queryFn: ({ queryKey }) =>
      RequestsHttp.getMyRequests({
        status: [RequestStatusEnum.COMPLETED],
        search: queryKey[0],
        page: queryKey[1],
      }),
  });

  const onclick = (appointmentId: string) => {
    navigate(paths.appointmentDetails, { state: appointmentId });
  };

  return (
    <MainContentWrapper>
      <MainContentWrapper.Header withBrowser setSearchTerm={setSearchTerm} title='MIS CITAS ATENDIDAS' />
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
              <div className='flex flex-row items-center space-x-4'>
                <Button
                  onClick={() => onclick(appointment.id)}
                  className='absolute right-4 top-1/2 -translate-y-1/2 p-3 drop-shadow-md hover:drop-shadow-lg h-fit rounded-full bg-green-100 hover:bg-green-200'
                >
                  <ArrowBigRightDash className='fill-current text-green-400 h-4 w-4' />
                </Button>
              </div>
              <span className='text-gray-600 text-sm font-medium'>
                {calculateAge(new Date(appointment.patientBirthday))} años | {getGenderLabel(appointment.patientGender)}
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
              <span className='text-gray-100 absolute top-1 right-0 font-medium text-center px-2 py-2 bg-green-500'>
                {parseRequestStatus(appointment.status)}
              </span>
            </div>
          ))}
        </LoadingWrapper>
      </MainContentWrapper.Body>
      <MainContentWrapper.Footer>
        <PaginationController totalPages={appointments?.totalPages} setPage={setPage} />
      </MainContentWrapper.Footer>
    </MainContentWrapper>
  );
}
