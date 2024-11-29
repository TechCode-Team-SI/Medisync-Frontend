import { useQueries } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';

import LoadingWrapper from 'src/components/wrappers/LoadingWrapper';
import { MainContentWrapper } from 'src/components/wrappers/mainContentWrapper';
import { paths } from 'src/paths';
import { AgendaHttp } from 'src/services/api/agenda';
import { requestTemplateHttp } from 'src/services/api/requestTemplate';
import { userHttp } from 'src/services/api/User';

import { CreatePrivateAppointmentForm } from './createPrivateAppointmentsForm';

const CreateAppointmentPage: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [requestTemplateQuery, timeSlotsQuery, agendaQuery, daysOffsQuery, userPatientQuery] = useQueries({
    queries: [
      {
        queryKey: [state?.specialtyId, 'requestTemplate'],
        queryFn: ({ queryKey }) => requestTemplateHttp.getRequestTemplateDetails(queryKey[0] as string),
      },
      {
        queryKey: ['timeSlots', state?.isGroup, state?.specialtyId, state?.requestedDrId],
        queryFn: ({ queryKey }) => {
          switch (queryKey[1]) {
            case true:
              return AgendaHttp.getTimeSlotted({ entityId: state?.specialtyId as string, type: 'specialty' });
            default:
              return AgendaHttp.getTimeSlotted({ entityId: state?.requestedDrId as string, type: 'user' });
          }
        },
      },
      {
        queryKey: ['agenda', state?.isGroup, state?.specialtyId, state?.requestedDrId],
        queryFn: ({ queryKey }) => {
          switch (queryKey[1]) {
            case true:
              return AgendaHttp.getAgendaByEntity({ entityId: state?.specialtyId as string, type: 'specialty' });
            default:
              return AgendaHttp.getAgendaByEntity({ entityId: state?.requestedDrId as string, type: 'user' });
          }
        },
      },
      {
        queryKey: [state?.specialtyId, state?.requestedDrId, 'daysOffs'],
        queryFn: ({ queryKey }) =>
          AgendaHttp.getDaysOffs({
            userId: queryKey[1] as string,
            specialtyId: queryKey[0] as string,
            startDate: new Date().toISOString(),
            endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
          }),
      },
      {
        queryKey: [state?.userId, 'userPatients'],
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
              requestedDrId={state?.requestedDrId}
              requestedSpecialtyId={state?.specialtyId}
              requestTemplate={requestTemplateQuery.data}
              daysOffs={daysOffsQuery.data}
              timeSlots={timeSlotsQuery.data}
              workingDays={agendaQuery.data.weekdays}
              userPatients={userPatientQuery.data?.data}
              onAppointmentCreated={() => navigate(paths.getactivespecialties)}
            />
          )}
        </LoadingWrapper>
      </MainContentWrapper.Body>
    </MainContentWrapper>
  );
};

export default CreateAppointmentPage;
