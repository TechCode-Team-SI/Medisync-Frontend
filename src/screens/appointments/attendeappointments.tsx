import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

import { AlertCheck } from 'src/components/alerts/alertCheck';
import { UserType } from 'src/components/navbar/userType/userType';
import { Button } from 'src/components/ui/button';
import { Card, CardTitle } from 'src/components/ui/card';
import { Checkbox } from 'src/components/ui/checkbox';
import { Dialog, DialogTrigger } from 'src/components/ui/dialog';
import { Input } from 'src/components/ui/input';
import { Label } from 'src/components/ui/label';
import { Loading } from 'src/components/ui/loading';
import { TextArea } from 'src/components/ui/textArea';
import { Field, FieldQuestion } from 'src/services/api/interface';
import { RequestsHttp } from 'src/services/api/request';
import { FieldQuestionTypeEnum } from 'src/utils/constants';

import { FormSchema, formSchema } from './schema2';

export function AttendeAppointments() {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  const [modalCheckOpen, setModalCheckOpen] = useState(false);
  const [questions, setQuestions] = useState<FieldQuestion[]>([]);

  const { data: appointment, isFetching } = useQuery({
    queryKey: ['appointment'],
    queryFn: () => RequestsHttp.getRequestsByID({ id: data }),
  });

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const { remove, replace } = useFieldArray({
    control: form.control,
    name: 'fields',
  });

  const onRemoveQuestion = (index: number) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
    remove(index);
  };

  const swapUpQuestion = (index: number) => {
    if (index === 0) return;
    const newQuestions = [...questions];
    const temp = newQuestions[index];
    newQuestions[index] = newQuestions[index - 1];
    newQuestions[index - 1] = temp;
    setQuestions(newQuestions);
    replace(newQuestions.map((q) => ({ fieldQuestionId: q.id })));
  };

  const swapDownQuestion = (index: number, length: number) => {
    if (index === length - 1) return;
    const newQuestions = [...questions];
    const temp = newQuestions[index];
    newQuestions[index] = newQuestions[index + 1];
    newQuestions[index + 1] = temp;
    setQuestions(newQuestions);
    replace(newQuestions.map((q) => ({ fieldQuestionId: q.id })));
  };

  const onResetForm = () => {
    setQuestions([]);
    form.reset();
  };

  const onSubmit = (data: FormSchema) => console.log(data);

  console.log(form.formState.errors);

  if (isFetching) {
    return (
      <div className='w-full h-screen flex justify-center items-center relative'>
        <Loading />
      </div>
    );
  }

  return (
    <div className='w-full h-full flex flex-col items-center bg-green-400 relative'>
      {modalCheckOpen && (
        <Dialog open={modalCheckOpen}>
          <AlertCheck
            title={`Pregunta creada con exito!`}
            onClose={() => {
              setModalCheckOpen(false);
              onResetForm();
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
            {appointment &&
              appointment.fields.map((question, idx) => (
                <FieldRenderer
                  key={question.id}
                  idx={idx}
                  length={questions.length}
                  onRemove={onRemoveQuestion}
                  swapUpQuestion={swapUpQuestion}
                  swapDownQuestion={swapDownQuestion}
                  fieldQuestion={question}
                />
              ))}
            <div className='flex flex-col border-t-2 p-5'>
              <div className='w-full flex-1 space-y-2'>
                <Label className='text-[12pxS]'>Descripción del Diagnóstico</Label>
                <TextArea id='description' {...form.register('description')} className='h-32' />
                {form.formState.errors.description && (
                  <div className='flex column-flex'>
                    <span className='text-red-500 absolute'>{form.formState.errors.description.message}</span>
                  </div>
                )}
              </div>
              <div className='w-full flex-1 space-y-2 mt-2'>
                <Label className='text-[12pxS]'>Descripción de las Instrucciones</Label>
                <TextArea id='instructions' {...form.register('instructions')} className='h-32' />
                {form.formState.errors.instructions && (
                  <div className='flex column-flex'>
                    <span className='text-red-500 absolute'>{form.formState.errors.instructions.message}</span>
                  </div>
                )}
              </div>
            </div>
          </form>
          <div className='mt-1 w-full flex flex-row justify-center items-center pb-4 pt-2 space-x-5'>
            <Button variant='btnGray' type='button' onClick={() => navigate(-1)}>
              Volver
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant='btnGreen' type='button'>
                  Guardar
                </Button>
              </DialogTrigger>
              <AlertCheck title='Añadido con Exito!' />
            </Dialog>
          </div>
        </Card>
      </Card>
    </div>
  );
}

const FieldRenderer = ({
  fieldQuestion,
}: {
  fieldQuestion: Field;
  idx: number;
  length: number;
  onRemove: (idx: number) => void;
  swapUpQuestion: (idx: number) => void;
  swapDownQuestion: (idx: number, length: number) => void;
}) => {
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
