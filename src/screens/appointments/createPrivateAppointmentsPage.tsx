import { useQueries } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';

import LoadingWrapper from 'src/components/wrappers/LoadingWrapper';
import { MainContentWrapper } from 'src/components/wrappers/mainContentWrapper';
import { AgendaHttp } from 'src/services/api/agenda';
import { requestTemplateHttp } from 'src/services/api/requestTemplate';
import { userHttp } from 'src/services/api/User';

import { CreatePrivateAppointmentForm } from './createPrivateAppointmentsForm';

const CreateAppointmentPage: React.FC = () => {
  const { state } = useLocation();
  const { requestedDrId, specialtyId, isGroup, userId } = state;

  const [requestTemplateQuery, timeSlotsQuery, agendaQuery, daysOffsQuery, userPatientQuery] = useQueries({
    queries: [
      {
        queryKey: [specialtyId, 'requestTemplate'],
        queryFn: ({ queryKey }) => requestTemplateHttp.getRequestTemplateDetails(queryKey[0] as string),
      },
      {
        queryKey: ['timeSlots', isGroup, specialtyId, requestedDrId],
        queryFn: ({ queryKey }) => {
          switch (queryKey[1]) {
            case true:
              return AgendaHttp.getTimeSlotted({ entityId: specialtyId as string, type: 'specialty' });
            default:
              return AgendaHttp.getTimeSlotted({ entityId: requestedDrId as string, type: 'user' });
          }
        },
      },
      {
        queryKey: ['agenda', isGroup, specialtyId, requestedDrId],
        queryFn: ({ queryKey }) => {
          switch (queryKey[1]) {
            case true:
              return AgendaHttp.getAgendaByEntity({ entityId: specialtyId as string, type: 'specialty' });
            default:
              return AgendaHttp.getAgendaByEntity({ entityId: requestedDrId as string, type: 'user' });
          }
        },
      },
      {
        queryKey: [specialtyId, requestedDrId, 'daysOffs'],
        queryFn: ({ queryKey }) =>
          AgendaHttp.getDaysOffs({
            userId: queryKey[1] as string,
            specialtyId: queryKey[0] as string,
            startDate: new Date().toISOString(),
            endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
          }),
      },
      {
        queryKey: [userId, 'userPatients'],
        queryFn: ({ queryKey }) => userHttp.getUserPatients({ id: queryKey[0] as string }),
      },
    ],
  });

  const isFetching =
    requestTemplateQuery.isFetching || timeSlotsQuery.isFetching || agendaQuery.isFetching || daysOffsQuery.isFetching;

  return (
    <MainContentWrapper>
      <MainContentWrapper.Header title='Solicitar consulta' />
      <MainContentWrapper.Body>
        <LoadingWrapper isLoading={isFetching}>
          {requestTemplateQuery.data && timeSlotsQuery.data && agendaQuery.data && daysOffsQuery.data && (
            <CreatePrivateAppointmentForm
              requestedDrId={requestedDrId}
              requestedSpecialtyId={specialtyId}
              requestTemplate={requestTemplateQuery.data}
              daysOffs={daysOffsQuery.data}
              timeSlots={timeSlotsQuery.data}
              workingDays={agendaQuery.data.weekdays}
              userPatients={userPatientQuery.data?.data}
            />
          )}
        </LoadingWrapper>
      </MainContentWrapper.Body>
    </MainContentWrapper>
  );
};

export default CreateAppointmentPage;
