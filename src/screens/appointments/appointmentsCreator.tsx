import { useQueries, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import PaginationController from 'src/components/common/pagination';
import { Button } from 'src/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardImg, CardTitle } from 'src/components/ui/card';
import { DialogContent, DialogHeader, DialogTitle } from 'src/components/ui/dialog';
import MedicalStaff from 'src/components/ui/icons/medicalStaff';
import Specialties from 'src/components/ui/icons/specialties';
import { Step, Stepper, useStepper } from 'src/components/ui/stepper';
import { TableBody, TableCell, TableRow } from 'src/components/ui/table';
import LoadingWrapper from 'src/components/wrappers/LoadingWrapper';
import { MainContentWrapper } from 'src/components/wrappers/mainContentWrapper';
import { AgendaHttp } from 'src/services/api/agenda';
import { Specialty, User } from 'src/services/api/interface';
import { registerMedicalHttp } from 'src/services/api/registerMedical';
import { requestTemplateHttp } from 'src/services/api/requestTemplate';
import { specialtiesHttp } from 'src/services/api/specialties';
import { userHttp } from 'src/services/api/User';
import { cn } from 'src/utils';

import { CreatePrivateAppointmentForm } from './createPrivateAppointmentsForm';

const steps = [{ label: 'Seleccione una especialidad' }, { label: 'Seleccione un medico' }, { label: 'Crea la cita' }];

interface AppointmentCreatorProps {
  userId: string;
}

export const AppointmentCreator = ({ userId }: AppointmentCreatorProps) => {
  const [selectedSpecialty, setSelectedSpecialty] = useState<Specialty | null>(null);
  const [selectedMedicId, setSelectedMedicId] = useState<string | null>(null);

  const onSelectSpecialty = (specialty: Specialty) => {
    setSelectedSpecialty(specialty);
  };

  const onSelectUserId = (userId: string) => {
    setSelectedMedicId(userId);
  };

  const renderStep = (id: number) => {
    switch (id) {
      case 1:
        return <SelectMedics onSelectUserId={onSelectUserId} specialtyId={selectedSpecialty?.id || ''} />;
      case 2:
        if (selectedSpecialty) {
          return (
            <CreateAppointmentPage
              isGroup={selectedSpecialty.isGroup}
              requestedDrId={selectedMedicId}
              specialtyId={selectedSpecialty.id}
              userId={userId}
            />
          );
        }
        return null;
      default:
        return <SelectActiveSpecialty onSelectSpecialty={onSelectSpecialty} />;
    }
  };

  return (
    <DialogContent className='bg-green-400 w-4/5 max-w-4xl px-0 pb-0 border-none rounded-xl overflow-hidden'>
      <DialogHeader>
        <DialogTitle className='text-center text-[21px] font-bold text-white'>Creador de Citas</DialogTitle>
      </DialogHeader>
      <div className='max-h-[500px] lg:max-h-[700px] 2xl:max-h-[900px] flex w-full flex-col gap-4 p-4 bg-white scrollbar-edit overflow-auto'>
        <Stepper
          initialStep={0}
          steps={steps}
          styles={{
            'step-button-container': cn(
              'text-purple-700',
              'data-[current=true]:border-purple-500 data-[current=true]:bg-purple-50',
              'data-[active=true]:bg-purple-500 data-[active=true]:border-purple-500',
            ),
            'horizontal-step': 'data-[completed=true]:[&:not(:last-child)]:after:bg-purple-500',
          }}
        >
          {steps.map((stepProps, idx) => {
            return (
              <Step key={stepProps.label} {...stepProps}>
                {renderStep(idx)}
              </Step>
            );
          })}
        </Stepper>
      </div>
    </DialogContent>
  );
};

interface SelectMedicsProps {
  specialtyId: string;
  onSelectUserId: (userId: string) => void;
}

export function SelectMedics({ specialtyId, onSelectUserId }: SelectMedicsProps) {
  const { nextStep } = useStepper();
  const [page, setPage] = useState(1);

  const { data: datalist, isFetching } = useQuery({
    queryKey: [page, specialtyId, 'active-medics'],
    queryFn: () => {
      return registerMedicalHttp.getListMedicsBySpecialty({
        specialtyId: specialtyId as string,
        page: `${page}`,
      });
    },
  });

  const onSelect = (user: User) => {
    onSelectUserId(user.id);
    nextStep();
  };

  return (
    <Card>
      <MainContentWrapper.Header title='Selecciona un médico' withBrowser />
      <MainContentWrapper.Body>
        <LoadingWrapper isLoading={!(datalist?.data && !isFetching)}>
          <TableBody className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 mb-20'>
            {datalist &&
              datalist.data.map((Persona) => (
                <TableRow className='border-b-0' key={Persona.id}>
                  <TableCell>
                    <Card className='bg-green-50 shadow-md h-52 w-52 flex flex-col rounded-none border-spacing-0 border-0'>
                      <CardHeader className='bg-green-400 h-32 p-0 flex justify-center items-center rounded-none border-spacing-0'>
                        <CardImg
                          src={''}
                          fallback={<MedicalStaff fill='white' className='h-24 w-24' />}
                          className='w-20 h-20'
                        />
                      </CardHeader>
                      <CardContent className='bg-green-50 px-2 py-1  text-center'>
                        <CardTitle className='text-black font-montserrat font-bold text-sm'>
                          {Persona.fullName}
                        </CardTitle>
                        <CardDescription className='text-black font-roboto font-medium text-xs '>
                          {'Especialidad'}
                        </CardDescription>
                        <Button
                          onClick={() => onSelect(Persona)}
                          className={`w-full rounded-sm text-black hover:text-white py-2 text-sm mt-4 bg-green-300`}
                        >
                          Seleccionar
                        </Button>
                      </CardContent>
                    </Card>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </LoadingWrapper>
      </MainContentWrapper.Body>
      <MainContentWrapper.Footer>
        <PaginationController setPage={setPage} totalPages={datalist?.totalPages} />
      </MainContentWrapper.Footer>
    </Card>
  );
}

interface SelectSpecialtiesProps {
  onSelectSpecialty: (specialty: Specialty) => void;
}

export function SelectActiveSpecialty({ onSelectSpecialty }: SelectSpecialtiesProps) {
  const { nextStep, setStep } = useStepper();
  const [page, setPage] = useState(1);
  const { data: datalist, isFetching } = useQuery({
    queryKey: [page, 'specialties'],
    queryFn: () => specialtiesHttp.getActive({ page: `${page}` }),
  });

  const onSelect = (specialty: Specialty) => {
    onSelectSpecialty(specialty);
    if (specialty.isGroup) {
      setStep(2);
    } else {
      nextStep();
    }
  };

  return (
    <Card>
      <MainContentWrapper.Header title='Selecciona una especialidad' withBrowser />
      <MainContentWrapper.Body>
        <LoadingWrapper isLoading={!(datalist?.data && !isFetching)}>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 mb-20'>
            {datalist &&
              datalist.data.map((specialty) => (
                <Card
                  key={specialty.id}
                  className='bg-green-50 shadow-md min-h-[268px] max-h-[268px] w-[227px] flex flex-col rounded-none border-spacing-0 border-0'
                >
                  <CardHeader className='bg-green-400 h-32 p-0 flex justify-center items-center rounded-none border-spacing-0'>
                    <CardImg
                      src=''
                      fallback={<Specialties fill='white' className='h-24 w-24' />}
                      className='w-20 h-20'
                    />
                  </CardHeader>
                  <CardContent className='bg-green-50 px-2 py-1 overflow-y-auto text-center'>
                    <CardTitle className='text-black font-montserrat font-bold text-sm mt-3 mb-5'>
                      {specialty.name}
                    </CardTitle>
                    <CardDescription className='text-black text-justify font-roboto line-clamp-1 font-medium text-[9px]'>
                      {specialty.description}
                    </CardDescription>
                    <Button
                      onClick={() => onSelect(specialty)}
                      className={`w-full rounded-sm text-black hover:text-white py-2 text-sm mt-4 bg-green-300`}
                    >
                      Seleccionar
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </LoadingWrapper>
      </MainContentWrapper.Body>
      <MainContentWrapper.Footer>
        <PaginationController setPage={setPage} totalPages={datalist?.totalPages} />
      </MainContentWrapper.Footer>
    </Card>
  );
}

interface CreateAppointmentPageProps {
  requestedDrId?: string | null;
  specialtyId: string;
  isGroup: boolean;
  userId: string;
}

const CreateAppointmentPage = (props: CreateAppointmentPageProps) => {
  const { requestedDrId, specialtyId, isGroup, userId } = props;

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
    requestTemplateQuery.isFetching ||
    timeSlotsQuery.isFetching ||
    agendaQuery.isFetching ||
    daysOffsQuery.isFetching ||
    userPatientQuery.isFetching;

  return (
    <Card>
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
              withReference={true}
              createdById={userId}
            />
          )}
        </LoadingWrapper>
      </MainContentWrapper.Body>
    </Card>
  );
};
