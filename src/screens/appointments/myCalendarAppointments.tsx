import { useQuery } from '@tanstack/react-query';

import { Button } from 'src/components/ui/button';
import Calendar from 'src/components/ui/calendar';
import { CardTitle } from 'src/components/ui/card';
import Edit from 'src/components/ui/icons/edit';
import LoadingWrapper from 'src/components/wrappers/LoadingWrapper';
import { MainContentWrapper } from 'src/components/wrappers/mainContentWrapper';
import { cn } from 'src/utils';
import { GenderEnum, RequestStatusEnum } from 'src/utils/constants';
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
    status: RequestStatusEnum.ATTENDING,
  },
  {
    id: '2',
    fullName: 'kevin cheng',
    edad: 20,
    genero: GenderEnum.MALE,
    especialidad: 'cardiologia',
    hora: '10:00',
    updatedAt: new Date(),
    status: RequestStatusEnum.PENDING,
  },
  {
    id: '3',
    fullName: 'kevin cheng',
    edad: 20,
    genero: GenderEnum.MALE,
    especialidad: 'cardiologia',
    hora: '10:00',
    updatedAt: new Date(),
    status: RequestStatusEnum.PENDING,
  },
];

export function MyCalendarAppointments() {
  const { data: question, isFetching } = useQuery({
    queryKey: [`get-all-my-pending-appointments`],
    queryFn: ({ queryKey }) => ({ data }),
  });

  return (
    <MainContentWrapper>
      <MainContentWrapper.Header title='MIS CITAS ATENDIDAS' />
      <MainContentWrapper.Body>
        <LoadingWrapper isLoading={!(question?.data && !isFetching)}>
          <Calendar />
        </LoadingWrapper>
      </MainContentWrapper.Body>
    </MainContentWrapper>
  );
}
