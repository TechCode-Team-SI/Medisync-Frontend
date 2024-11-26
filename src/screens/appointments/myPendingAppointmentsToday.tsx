import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import PaginationController from 'src/components/common/pagination';
import { Button } from 'src/components/ui/button';
import { CardTitle } from 'src/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'src/components/ui/dropdown-menu';
import Points from 'src/components/ui/icons/Points';
import { Loading } from 'src/components/ui/loading';
import LoadingWrapper from 'src/components/wrappers/LoadingWrapper';
import { MainContentWrapper } from 'src/components/wrappers/mainContentWrapper';
import { paths } from 'src/paths';
import { RequestsHttp } from 'src/services/api/request';
import { cn } from 'src/utils';
import { DEBOUNCE_DELAY, RequestStatusEnum } from 'src/utils/constants';
import { calculateAge, formatDate, getGenderLabel, parseRequestStatus } from 'src/utils/utils';

export function ListMyPendingAppointmentsToday() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, DEBOUNCE_DELAY);
  const [page, setPage] = useState(1);
  const {
    data: appointment,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: [debouncedSearchTerm, `${page}`, `get-all-my-pending-appointments`],
    queryFn: ({ queryKey }) =>
      RequestsHttp.getMyRequests({
        status: [RequestStatusEnum.PENDING, RequestStatusEnum.ATTENDING],
        today: true,
        search: queryKey[0],
        page: queryKey[1],
      }),
  });
  const attendRequest = useMutation({
    mutationFn: RequestsHttp.attendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-all-my-pending-appointments'] });
      //TODO: move to the attend request screen
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const CancelRequest = useMutation({
    mutationFn: RequestsHttp.cancelRequest,
    onSuccess: () => {
      toast.success('Cita Cancelada Correctamente');
      refetch;
    },
    onError: (error) => {
      toast.success('La Cita no Fue Cancelada Correctamente');
      console.log(error);
    },
  });

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

  if (isFetching) {
    return (
      <div className='w-full h-screen flex justify-center items-center relative'>
        <Loading />
      </div>
    );
  }

  return (
    <MainContentWrapper>
      <MainContentWrapper.Header withBrowser setSearchTerm={setSearchTerm} title='MIS CITAS PENDIENTES HOY' />
      <MainContentWrapper.Body>
        <LoadingWrapper isLoading={!(appointment?.data && !isFetching)}>
          {appointment?.data.map((appointment) => (
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
                <div className='absolute right-[45px] top-1/2 -translate-y-1/2 w-[45px] h-[45px] rounded-ful flex items-center justify-center drop-shadow-md hover:drop-shadow-lg rounded-full bg-green-100 hover:bg-green-200'>
                  <DropdownMenu>
                    <DropdownMenuTrigger className='flex items-center justify-center text-center w-full h-full text-[40px] leading-none'>
                      <Points className='fill-current text-green-400 h-9 w-9' />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <Button
                          disabled={attendRequest.isPending}
                          onClick={() => {
                            if (appointment.status === RequestStatusEnum.PENDING) {
                              attendRequest.mutate({ id: appointment.id });
                              navigate(paths.attendappointment, { state: appointment.id });
                            } else {
                              navigate(paths.attendappointment, { state: appointment.id });
                            }
                          }}
                          className='bg-green-300 hover:bg-green-500 w-full h-full text-sm rounded-md'
                        >
                          Atender
                        </Button>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Button
                          disabled={CancelRequest.isPending}
                          onClick={() => {
                            if (appointment.status === RequestStatusEnum.PENDING) {
                              CancelRequest.mutate({ requestId: appointment.id });
                            }
                          }}
                          className='bg-red-400 hover:bg-red-500 w-full h-full text-sm rounded-md'
                        >
                          Cancelar
                        </Button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
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
              <span
                className={cn(
                  'text-gray-100 absolute top-1 right-0 font-medium text-center px-2 py-2 ',
                  renderStatusColor(appointment.status),
                )}
              >
                {parseRequestStatus(appointment.status)}
              </span>
            </div>
          ))}
        </LoadingWrapper>
      </MainContentWrapper.Body>
      <MainContentWrapper.Footer>
        <PaginationController totalPages={appointment?.totalPages} setPage={setPage} />
      </MainContentWrapper.Footer>
    </MainContentWrapper>
  );
}
