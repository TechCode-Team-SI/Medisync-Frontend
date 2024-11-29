import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Control, Controller, useFieldArray, useForm, UseFormReturn } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { AlertCheck } from 'src/components/alerts/alertCheck';
import { Button } from 'src/components/ui/button';
import { Card, CardContent } from 'src/components/ui/card';
import { Checkbox } from 'src/components/ui/checkbox';
import { DatePicker } from 'src/components/ui/datepicker';
import { Dialog } from 'src/components/ui/dialog';
import { FormField, FormItem } from 'src/components/ui/form';
import { Input } from 'src/components/ui/input';
import { Label } from 'src/components/ui/label';
import { RadioGroup, RadioGroupItem } from 'src/components/ui/radioGroup';
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
import FieldWrapper from 'src/components/wrappers/fieldWrapper';
import { FieldQuestion, RequestTemplateFormatted, UserPatient, WeekDayEnum } from 'src/services/api/interface';
import { RequestsHttp } from 'src/services/api/request';
import { FieldQuestionTypeEnum, GenderEnum, genderLabel } from 'src/utils/constants';
import { getNonWorkingDaysOfWeek, getWeekDayNumber } from 'src/utils/utils';

import { createAppointmentSchema, CreateAppointmentSchema } from './createAppointmentSchema';

interface CreateAppointmentFormProps {
  requestedDrId?: string | null;
  requestedSpecialtyId: string;
  requestTemplate: RequestTemplateFormatted;
  daysOffs: string[];
  timeSlots: string[];
  workingDays: WeekDayEnum[];
  userPatients?: UserPatient[];
  defaultTab?: 'blank' | 'withPatients';
  withReference?: boolean;
  createdById?: string;
  onAppointmentCreated?: () => void;
}

export function CreatePrivateAppointmentForm(props: CreateAppointmentFormProps) {
  const navigate = useNavigate();
  const [selectedUserPatientId, setSelectedUserPatientId] = useState<string | null>(null);
  const [modalCheckOpen, setModalCheckOpen] = useState(false);
  const mutation = useMutation({
    mutationFn: RequestsHttp.postCreatePrivateRequest,
    onSuccess: () => {
      setModalCheckOpen(true);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const form = useForm<CreateAppointmentSchema>({
    resolver: zodResolver(createAppointmentSchema),
    defaultValues: {
      requestValues: props.requestTemplate.fields.map(({ fieldQuestion }) => {
        if (fieldQuestion.type === FieldQuestionTypeEnum.SELECTION) {
          const selections = fieldQuestion.selections || [];
          const selectionId = selections.length > 0 ? selections[0].id : '';
          return {
            fieldQuestion: {
              id: fieldQuestion.id,
            },
            selections: [{ id: selectionId }],
          };
        } else {
          return {
            fieldQuestion: {
              id: fieldQuestion.id,
            },
            value: '',
          };
        }
      }),
    },
  });
  const { fields } = useFieldArray({
    control: form.control,
    name: 'requestValues',
  });

  const onSubmit = (data: CreateAppointmentSchema) => {
    mutation.mutate({
      ...data,
      medicId: props.requestedDrId,
      specialtyId: props.requestedSpecialtyId,
      requestTemplateId: props.requestTemplate.id,
      referredContent: data.referredContent == '' ? undefined : data.referredContent,
      createdById: props.createdById,
    });
  };

  const onChangeUserPatient = (userPatientId: string) => {
    setSelectedUserPatientId(userPatientId);
    const selectedUserPatient = props.userPatients?.find((up) => up.id === userPatientId);
    if (selectedUserPatient) {
      form.setValue('patientFullName', selectedUserPatient.fullName, { shouldValidate: true });
      form.setValue('patientDNI', selectedUserPatient.dni, { shouldValidate: true });
      form.setValue('patientAddress', selectedUserPatient.address || '', { shouldValidate: true });
      form.setValue('patientGender', selectedUserPatient.gender, { shouldValidate: true });
      form.setValue('patientBirthday', new Date(selectedUserPatient.birthday), { shouldValidate: true });
    }
  };

  return (
    <form className='space-y-5' onSubmit={form.handleSubmit(onSubmit)}>
      {modalCheckOpen && (
        <Dialog open={modalCheckOpen}>
          <AlertCheck
            title='Cita Creada Exitosamente!'
            onClose={() => {
              setModalCheckOpen(false);
              form.reset();
              props.onAppointmentCreated && props.onAppointmentCreated();
            }}
          />
        </Dialog>
      )}

      <Tabs defaultValue={props.defaultTab || 'blank'}>
        <TabsList className='grid w-full grid-cols-5'>
          <TabsTrigger value='blank'>Nuevo</TabsTrigger>
          <TabsTrigger value='withPatients'>Existente</TabsTrigger>
        </TabsList>
        <TabsContent value='blank'>
          <Card>
            <CardContent>
              <UserPatientForm form={form} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='withPatients'>
          <Card>
            <CardContent>
              <Select onValueChange={onChangeUserPatient} value={selectedUserPatientId || undefined}>
                <SelectTrigger className='placeholder:text-gray-300 my-4 h-10 w-48 rounded-2 font-roboto text-sm'>
                  <SelectValue placeholder='Seleccione un paciente' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Seleccione un paciente</SelectLabel>
                    {props.userPatients?.map((patient) => (
                      <SelectItem key={patient.id} value={patient.id}>
                        {patient.fullName}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <UserPatientForm disabled={true} form={form} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {props.requestTemplate.fields.map((field, idx) => {
        const currentField = fields[idx];
        const errorStates = form.formState.errors.requestValues;
        const errorState = errorStates && errorStates[idx];

        if ('value' in currentField) {
          return (
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            <FieldWrapper key={field.id} errorState={errorState?.value}>
              <FieldRenderer
                field={field.fieldQuestion}
                fieldIndex={idx}
                control={form.control}
                value={currentField.value}
              />
            </FieldWrapper>
          );
        }
        return (
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          <FieldWrapper key={field.id} errorState={errorState?.selections}>
            <FieldRenderer
              field={field.fieldQuestion}
              fieldIndex={idx}
              control={form.control}
              value={currentField.selections[0].id}
            />
          </FieldWrapper>
        );
      })}
      <div className='flex flex-row m-2 gap-4'>
        <FormField
          control={form.control}
          name='appointmentDate'
          render={({ field }) => (
            <FieldWrapper className='flex flex-col gap-1' errorState={form.formState.errors.appointmentDate}>
              <Label className='text-green-400 font-roboto font-bold h-7 text-[14px]'>Fecha de la cita</Label>
              <DatePicker
                disabled={[
                  { before: new Date() },
                  new Date(),
                  {
                    dayOfWeek: getNonWorkingDaysOfWeek(props.workingDays).map((workDay) => getWeekDayNumber(workDay)),
                  },
                ]}
                onChange={field.onChange}
              />
            </FieldWrapper>
          )}
        />

        <FormField
          control={form.control}
          name='appointmentHour'
          render={({ field }) => (
            <FormItem>
              <FieldWrapper className='flex flex-col gap-1' errorState={form.formState.errors.patientGender}>
                <Label htmlFor='fullName' className='text-green-400 font-roboto font-bold h-7 text-[14px]'>
                  Bloque Horario
                </Label>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                  }}
                  value={field.value}
                >
                  <SelectTrigger
                    id='appointmentHour'
                    className='placeholder:text-gray-300 h-10 w-48 rounded-2 font-roboto text-sm'
                  >
                    <SelectValue placeholder='Seleccione una hora' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Seleccione una hora</SelectLabel>
                      {props.timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FieldWrapper>
            </FormItem>
          )}
        />
      </div>
      {props.withReference && (
        <div className='m-2'>
          <FieldWrapper errorState={form.formState.errors.patientAddress}>
            <Label htmlFor='patientAddress' className='text-green-400 font-roboto font-bold h-7 text-[14px]'>
              Observaciones del medico
            </Label>
            <TextArea
              id='referredContent'
              rows={4}
              className='w-full rounded-2 font-roboto text-base scrollbar-edit'
              {...form.register('referredContent')}
            />
          </FieldWrapper>
        </div>
      )}
      <div className='mt-1 w-full flex flex-row justify-center items-center pb-4 pt-2 space-x-5'>
        <Button variant='btnGray' type='button' onClick={() => navigate(-1)}>
          Volver
        </Button>
        <Button isLoading={mutation.isPending} variant='btnGreen' type='submit'>
          Crear
        </Button>
      </div>
    </form>
  );
}

interface FieldRendererProps {
  field: FieldQuestion;
  control: Control<CreateAppointmentSchema>;
  value: string;
  fieldIndex: number;
}

const FieldRenderer = (props: FieldRendererProps) => {
  const renderer = (props: FieldRendererProps) => {
    switch (props.field.type) {
      case FieldQuestionTypeEnum.TEXT:
      case FieldQuestionTypeEnum.NUMBER:
        return <TextFieldRenderer {...props} />;
      case FieldQuestionTypeEnum.SELECTION:
        if (props.field?.selectionConfig?.isMultiple) {
          return <SelectionMultipleFieldRenderer {...props} />;
        } else {
          return <SelectionSimpleFieldRenderer {...props} />;
        }
      default:
        return (
          <div className='w-full rounded-md border border-red-500 bg-red-300 flex justify-center items-center '>
            <span className='text-red-500 font-bold text-2xl'>Error renderizando textfield</span>
          </div>
        );
    }
  };

  return (
    <Card className=' sm:w-364 h-137 shadow-md border-none flex flex-col p-8 gap-2 relative'>
      <div className='absolute top-4 right-4 flex w-fit gap-2'></div>
      <h4 className='font-roboto text-base font-bold text-gray-600'>{props.field.label}</h4>
      <span className='font-roboto text-lg font-bold flex text-gray-400'>{props.field.description}</span>
      {renderer(props)}
    </Card>
  );
};

const TextFieldRenderer = (props: FieldRendererProps) => {
  return (
    <Controller
      control={props.control}
      name={`requestValues.${props.fieldIndex}.value`}
      render={({ field }) => (
        <Input
          value={field.value}
          onChange={field.onChange}
          className='border-b-2 rounded-none border-solid bg-white border-green-500'
        />
      )}
    />
  );
};

const SelectionSimpleFieldRenderer = ({ control, fieldIndex, field }: FieldRendererProps) => {
  return (
    <>
      <Controller
        control={control}
        name={`requestValues.${fieldIndex}.selections`}
        render={({ field: currentField }) => (
          <RadioGroup
            className='gap-4'
            onValueChange={(val) => {
              currentField.onChange([{ id: val }]);
            }}
            value={currentField.value[0].id}
          >
            {(field.selections || []).map((s) => (
              <div key={s.id} className='flex items-center space-x-2 '>
                <RadioGroupItem className='h-5 w-5' value={s.id} id={s.id} />
                <Label className={'font-roboto text-gray-400 cursor-pointer'} htmlFor={s.id}>
                  {s.value}
                </Label>
              </div>
            ))}
          </RadioGroup>
        )}
      />
    </>
  );
};

const SelectionMultipleFieldRenderer = (props: FieldRendererProps) => {
  return (
    <>
      <Controller
        control={props.control}
        name={`requestValues.${props.fieldIndex}.selections`}
        render={({ field: currentField }) => (
          <>
            {(props.field.selections || []).map((s) => (
              <div key={s.id} className='flex flex-row items-center gap-5'>
                <Checkbox
                  id={s.id}
                  onCheckedChange={() => {
                    if (currentField.value.some((v) => v.id === s.id)) {
                      currentField.onChange(currentField.value.filter((v) => v.id !== s.id));
                    } else {
                      currentField.onChange([...currentField.value, { id: s.id }]);
                    }
                  }}
                  checked={currentField.value.some((v) => v.id === s.id)}
                  className='h-5 w-5'
                />
                <Label className={'font-roboto text-gray-400 cursor-pointer'} htmlFor={s.id}>
                  {s.value}
                </Label>
              </div>
            ))}
          </>
        )}
      />
    </>
  );
};

interface UserPatientForm {
  form: UseFormReturn<CreateAppointmentSchema>;
  disabled?: boolean;
}

const UserPatientForm = ({ form, disabled }: UserPatientForm) => {
  return (
    <>
      <div className='flex gap-2 m-2'>
        <FieldWrapper className='w-full' errorState={form.formState.errors.patientFullName}>
          <Label htmlFor='fullName' className='text-green-400 font-roboto font-bold h-7 text-[14px]'>
            Nombre Completo
          </Label>
          <Input
            disabled={disabled}
            id='fullName'
            className='w-full h-10 rounded-2 font-roboto text-base'
            {...form.register('patientFullName')}
          />
        </FieldWrapper>

        <FieldWrapper className='w-1/3' errorState={form.formState.errors.patientDNI}>
          <Label htmlFor='dni' className='text-green-400 font-roboto font-bold h-7 text-[14px] mt-2'>
            Cedula
          </Label>
          <Input
            id='dni'
            disabled={disabled}
            className='w-full h-10 rounded-2 font-roboto text-base'
            {...form.register('patientDNI')}
          />
        </FieldWrapper>
      </div>
      <div className='m-2'>
        <FieldWrapper errorState={form.formState.errors.patientAddress}>
          <Label htmlFor='patientAddress' className='text-green-400 font-roboto font-bold h-7 text-[14px]'>
            Direccion
          </Label>
          <TextArea
            disabled={disabled}
            id='patientAddress'
            rows={4}
            className='w-full rounded-2 font-roboto text-base scrollbar-edit'
            {...form.register('patientAddress')}
          />
        </FieldWrapper>
      </div>
      <div className='flex flex-row m-2 gap-4'>
        <FormField
          control={form.control}
          name='patientGender'
          render={({ field }) => (
            <FormItem>
              <FieldWrapper className='flex flex-col gap-1' errorState={form.formState.errors.patientGender}>
                <Label htmlFor='fullName' className='text-green-400 font-roboto font-bold h-7 text-[14px]'>
                  Genero
                </Label>
                <Select
                  disabled={disabled}
                  onValueChange={(value) => {
                    field.onChange(value);
                  }}
                  value={field.value}
                >
                  <SelectTrigger
                    id='patientGender'
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
              </FieldWrapper>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='patientBirthday'
          render={({ field }) => (
            <FieldWrapper className='flex flex-col gap-1' errorState={form.formState.errors.patientBirthday}>
              <Label className='text-green-400 font-roboto font-bold h-7 text-[14px]'>Fecha de Nacimiento</Label>
              <DatePicker isDisabled={disabled} disabled={{ after: new Date() }} onChange={field.onChange} />
            </FieldWrapper>
          )}
        />
      </div>
    </>
  );
};
