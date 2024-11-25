import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Control, Controller, useForm, useWatch } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

import { AlertCheck } from 'src/components/alerts/alertCheck';
import { SelectElements } from 'src/components/modals/appointments/SelectElements';
import { UserType } from 'src/components/navbar/userType/userType';
import { Badge } from 'src/components/ui/badge';
import { Button } from 'src/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from 'src/components/ui/card';
import { Checkbox } from 'src/components/ui/checkbox';
import { DatePicker } from 'src/components/ui/datepicker';
import { Dialog, DialogTrigger } from 'src/components/ui/dialog';
import { Input } from 'src/components/ui/input';
import { Label } from 'src/components/ui/label';
import { Loading } from 'src/components/ui/loading';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from 'src/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'src/components/ui/tabs';
import { TextArea } from 'src/components/ui/textArea';
import { paths } from 'src/paths';
import { DiseaseHttp } from 'src/services/api/diseases';
import { injuryHttp } from 'src/services/api/injury';
import { Field, getLista, GlossaryType, WithSearch } from 'src/services/api/interface';
import { PathologyHttp } from 'src/services/api/pathology';
import { RequestsHttp } from 'src/services/api/request';
import { SymptomHttp } from 'src/services/api/symptom';
import { TreatmentHttp } from 'src/services/api/treatment';
import { FieldQuestionTypeEnum, GenderEnum, genderLabel } from 'src/utils/constants';

import { AppointmentCreator } from './appointmentsCreator';
import { FormSchema, formSchema } from './schema2';

export function AttendeAppointments() {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  const [modalCheckOpen, setModalCheckOpen] = useState(false);
  const mutation = useMutation({
    mutationFn: RequestsHttp.postAttendRequest,
    onSuccess: () => {
      setModalCheckOpen(true);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { data: appointment, isFetching } = useQuery({
    queryKey: ['appointment'],
    queryFn: () => RequestsHttp.getRequestsByID({ id: data }),
  });

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: '',
      instructions: '',
      injuries: [],
      symptoms: [],
      illnesses: [],
      treatments: [],
      pathologies: [],
    },
  });
  const values = useWatch({ control: form.control });

  const onSubmit = (data: FormSchema) => {
    mutation.mutate({
      diagnostic: {
        description: data.description,
        illnesses: data.illnesses.map((item) => item.id),
        injuries: data.injuries.map((item) => item.id),
        treatments: data.treatments.map((item) => item.id),
        symptoms: data.symptoms.map((item) => item.id),
        pathologies: data.pathologies.map((item) => item.id),
      },
      instructions: data.instructions,
      id: location.state,
    });
  };

  if (isFetching) {
    return (
      <div className='w-full h-screen flex justify-center items-center relative'>
        <Loading />
      </div>
    );
  }

  console.log(appointment);

  return (
    <div className='w-full h-full flex flex-col items-center bg-green-400 relative'>
      {modalCheckOpen && (
        <Dialog open={modalCheckOpen}>
          <AlertCheck
            title={`Cita atendida con exito!`}
            onClose={() => {
              setModalCheckOpen(false);
              navigate(paths.myPendingAppintments);
            }}
          />
        </Dialog>
      )}
      <Card className='h-full w-full flex flex-col px-8 sm:px-9 lg:px-10 pt-8 sm:pt-9 lg:pt-10 bg-green-600 border-none rounded-none rounded-l-xl'>
        <Card className='bg-white min-h-[60px] max-h-[60px] w-full mb-4 flex fles-row justify-end items-center px-5 sm:px-10 lg:px-20'>
          <UserType />
        </Card>
        <Card className='bg-white w-full h-full rounded-b-none overflow-auto scrollbar-edit flex flex-col p-6 pb-0 sm:p-8 sm:pb-0 lg:p-10 lg:pb-0 space-y-5'>
          <CardTitle className=' text-green-400 font-montserrat font-bold text-[18px] text-left'>
            ATENDER CITAS MÉDICAS
          </CardTitle>
          <form className='space-y-5' onSubmit={form.handleSubmit(onSubmit)}>
            {appointment && (
              <>
                <Card>
                  <CardContent>
                    <div className='flex gap-2 m-2'>
                      <div className='w-full'>
                        <Label htmlFor='fullName' className='text-green-400 font-roboto font-bold h-7 text-[14px]'>
                          Nombre Completo
                        </Label>
                        <Input
                          value={appointment.patient.fullName}
                          disabled={true}
                          id='fullName'
                          className='w-full h-10 rounded-2 font-roboto text-base'
                        />
                      </div>

                      <div className='w-1/3'>
                        <Label htmlFor='dni' className='text-green-400 font-roboto font-bold h-7 text-[14px] mt-2'>
                          Cedula
                        </Label>
                        <Input
                          value={appointment.patient.dni}
                          id='dni'
                          disabled={true}
                          className='w-full h-10 rounded-2 font-roboto text-base'
                        />
                      </div>
                    </div>
                    <div className='m-2'>
                      <div>
                        <Label
                          htmlFor='patientAddress'
                          className='text-green-400 font-roboto font-bold h-7 text-[14px]'
                        >
                          Direccion
                        </Label>
                        <TextArea
                          disabled={true}
                          value={appointment.patient.address}
                          id='patientAddress'
                          rows={4}
                          className='w-full rounded-2 font-roboto text-base scrollbar-edit'
                        />
                      </div>
                    </div>
                    <div className='flex flex-row m-2 gap-4'>
                      <div className='flex flex-col gap-1'>
                        <Label htmlFor='fullName' className='text-green-400 font-roboto font-bold h-7 text-[14px]'>
                          Genero
                        </Label>
                        <Select disabled={true} value={appointment.patient.gender}>
                          <SelectTrigger
                            id='patientGender'
                            value={appointment.patient.gender}
                            className='placeholder:text-gray-300 h-10 w-48 rounded-2 font-roboto text-sm'
                          >
                            <SelectValue placeholder='Seleccione un genero' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Genero</SelectLabel>
                              {Object.values(GenderEnum).map((key) => (
                                <SelectItem key={key} value={key}>
                                  {genderLabel[key]}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className='flex flex-col gap-1'>
                        <Label className='text-green-400 font-roboto font-bold h-7 text-[14px]'>
                          Fecha de Nacimiento
                        </Label>
                        <DatePicker initialDate={new Date(appointment.patient.birthday)} isDisabled={true} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {appointment.fields.map((question, idx) => (
                  <FieldRenderer key={`field-${idx}`} idx={idx} fieldQuestion={question} />
                ))}
                {appointment.referredContent && (
                  <div className='m-2'>
                    <Label htmlFor='patientAddress' className='text-green-400 font-roboto font-bold h-7 text-[14px]'>
                      Observaciones del dr. {appointment.referredBy?.fullName}
                    </Label>
                    <TextArea
                      id='referredContent'
                      value={appointment.referredContent}
                      disabled={true}
                      rows={4}
                      className='w-full rounded-2 font-roboto text-base scrollbar-edit'
                    />
                  </div>
                )}
              </>
            )}
            <div className='flex flex-col border-t-2 p-5'>
              <div className='w-full flex-1 space-y-2'>
                <Label className='text-[12pxS]'>Descripción del Diagnóstico</Label>
                <TextArea id='description' {...form.register('description')} className='h-32' />
                {form.formState.errors.description && (
                  <div className='flex column-flex'>
                    <span className='text-red-500'>{form.formState.errors.description.message}</span>
                  </div>
                )}
              </div>
              <div className='w-full flex-1 space-y-2 mt-2'>
                <Label className='text-[12pxS]'>Descripción de las Instrucciones</Label>
                <TextArea id='instructions' {...form.register('instructions')} className='h-32' />
                {form.formState.errors.instructions && (
                  <div className='flex column-flex'>
                    <span className='text-red-500'>{form.formState.errors.instructions.message}</span>
                  </div>
                )}
              </div>
            </div>
            <Tabs defaultValue='injuries' className='w-full'>
              <TabsList className='grid w-full grid-cols-5'>
                <TabsTrigger value='injuries'>Lesiones</TabsTrigger>
                <TabsTrigger value='illnesses'>Enfermedades</TabsTrigger>
                <TabsTrigger value='symptoms'>Sintomas</TabsTrigger>
                <TabsTrigger value='pathologies'>Patologias</TabsTrigger>
                <TabsTrigger value='treatments'>Tratamientos</TabsTrigger>
              </TabsList>
              <TabContentRenderer
                tabId='injuries'
                values={values.injuries}
                control={form.control}
                title='Lesiones'
                description='Registre aqui las lesiones que presenta el paciente.'
                badgeColor='green'
                queryFn={injuryHttp.getInjury}
              />
              <TabContentRenderer
                tabId='illnesses'
                values={values.illnesses}
                control={form.control}
                title='Enfermedades'
                description='Registre aqui las enfermedades que presenta el paciente.'
                badgeColor='blue'
                queryFn={DiseaseHttp.getDisease}
              />
              <TabContentRenderer
                tabId='symptoms'
                values={values.symptoms}
                control={form.control}
                title='Sintomas'
                description='Registre aqui los sintomas que presenta el paciente.'
                badgeColor='default'
                queryFn={SymptomHttp.getSymptoms}
              />
              <TabContentRenderer
                tabId='pathologies'
                values={values.pathologies}
                control={form.control}
                title='Patologias'
                description='Registre aqui las patologias que presenta el paciente.'
                badgeColor='purple'
                queryFn={PathologyHttp.getPathology}
              />
              <TabContentRenderer
                tabId='treatments'
                values={values.treatments}
                control={form.control}
                title='Tratamientos'
                description='Registre aqui los tratamientos aplicables para el paciente.'
                badgeColor='blue'
                queryFn={TreatmentHttp.getTreatment}
              />
            </Tabs>
            <div className='mt-1 w-full flex flex-row justify-center items-center pb-4 pt-2 space-x-5'>
              <Button variant='btnGray' type='button' onClick={() => navigate(-1)}>
                Volver
              </Button>
              {appointment?.createdBy && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className='py-1 w-fit px-2' variant='btnGreen' type='button'>
                      Crear referencia medica
                    </Button>
                  </DialogTrigger>
                  <AppointmentCreator userId={appointment.createdBy.id} />
                </Dialog>
              )}
              <Button disabled={mutation.isPending} variant='btnGreen' type='submit'>
                Terminar
              </Button>
            </div>
          </form>
        </Card>
      </Card>
    </div>
  );
}

const FieldRenderer = ({ fieldQuestion }: { fieldQuestion: Field; idx: number }) => {
  const renderer = (fieldQuestion: Field) => {
    switch (fieldQuestion.type) {
      case FieldQuestionTypeEnum.TEXT:
      case FieldQuestionTypeEnum.NUMBER:
        return <TextFieldRenderer fieldQuestion={fieldQuestion} />;
      case FieldQuestionTypeEnum.SELECTION:
        if (fieldQuestion?.selectionConfig?.isMultiple) {
          return <SelectionMultipleFieldRenderer fieldQuestion={fieldQuestion} />;
        } else {
          return <SelectionSimpleFieldRenderer fieldQuestion={fieldQuestion} />;
        }
      default:
        return (
          <div className='w-full rounded-md border border-red-500 bg-red-300 flex justify-center items-center h-48'>
            <span className='text-red-500 font-bold text-2xl'>Error renderizando textfield</span>
          </div>
        );
    }
  };

  return (
    <Card className=' sm:w-364 h-137 shadow-md border-none flex flex-col p-8 pt-16 gap-2 relative'>
      <div className='absolute top-4 right-4 flex w-fit gap-2'></div>
      <h4 className='font-roboto text-base font-bold text-gray-600'>{fieldQuestion.label}</h4>
      <span className='font-roboto text-lg font-bold flex text-gray-400'>{fieldQuestion.description}</span>
      {renderer(fieldQuestion)}
    </Card>
  );
};

const TextFieldRenderer = (props: { fieldQuestion: Field }) => {
  return (
    <Input
      disabled={true}
      value={props.fieldQuestion.value}
      className='border-b-2 rounded-none border-solid bg-white border-green-500'
    />
  );
};

const SelectionSimpleFieldRenderer = (props: { fieldQuestion: Field }) => {
  return (
    <>
      {props?.fieldQuestion?.selections?.map((selection) => (
        <div key={selection.id} className='flex flex-row items-center gap-5'>
          <Checkbox checked={selection.isSelected} disabled={true} className='h-5 w-5 rounded-full' />
          <span className='font-roboto text-sm text-gray-400'>{selection.value}</span>
        </div>
      ))}
    </>
  );
};

const SelectionMultipleFieldRenderer = (props: { fieldQuestion: Field }) => {
  return (
    <>
      {props?.fieldQuestion?.selections?.map((selection) => (
        <div key={selection.id} className='flex flex-row items-center gap-5'>
          <Checkbox checked={selection.isSelected} disabled={true} className='h-5 w-5' />
          <span className='font-roboto text-gray-400'>{selection.value}</span>
        </div>
      ))}
    </>
  );
};

interface TabContentRendererProps {
  values?: Partial<{ name: string; id: string }>[];
  control: Control<FormSchema>;
  title: string;
  description: string;
  badgeColor: 'default' | 'secondary' | 'purple' | 'green' | 'blue' | 'destructive' | 'outline';
  tabId: keyof FormSchema;
  queryFn: (props: WithSearch) => Promise<getLista<Pick<GlossaryType, 'id' | 'name'>>>;
}
const TabContentRenderer = (props: TabContentRendererProps) => {
  return (
    <TabsContent value={props.tabId}>
      <Card>
        <CardHeader>
          <CardTitle>{props.title}</CardTitle>
          <CardDescription>{props.description}</CardDescription>
        </CardHeader>
        <CardContent className='flex flex-wrap gap-5 p-4'>
          {props.values?.map((item) => (
            <Badge key={item.id} variant={props.badgeColor} className='flex items-center gap-2'>
              <span>{item.name}</span>
            </Badge>
          ))}
        </CardContent>
        <CardFooter>
          <Controller
            control={props.control}
            name={props.tabId}
            render={({ field }) => (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant='btnGreen' type='button'>
                    {props.title}
                  </Button>
                </DialogTrigger>
                <SelectElements
                  onSelect={field.onChange}
                  queryFn={props.queryFn}
                  queryKey={props.tabId}
                  title={props.title}
                />
              </Dialog>
            )}
          />
        </CardFooter>
      </Card>
    </TabsContent>
  );
};
