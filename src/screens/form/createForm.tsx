import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { ArrowBigDownDash, ArrowBigUpDash, Plus } from 'lucide-react';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import { AlertCheck } from 'src/components/alerts/alertCheck';
import { FormOption } from 'src/components/modals/formOption';
import { UserType } from 'src/components/navbar/userType/userType';
import { Button } from 'src/components/ui/button';
import { Card, CardFooter } from 'src/components/ui/card';
import { Checkbox } from 'src/components/ui/checkbox';
import { Dialog, DialogTrigger } from 'src/components/ui/dialog';
import Trash from 'src/components/ui/icons/trash';
import { Input } from 'src/components/ui/input';
import { Label } from 'src/components/ui/label';
import { FieldQuestion } from 'src/services/api/interface';
import { requestTemplateHttp } from 'src/services/api/requestTemplate';
import { FieldQuestionTypeEnum } from 'src/utils/constants';

import { FormSchema, formSchema } from './schema';

export function createForm() {
  const createRequestTemplate = useMutation({
    mutationFn: requestTemplateHttp.postRequestTemplate,
    onSuccess: () => {
      setModalCheckOpen(true);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const [modalCheckOpen, setModalCheckOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [questions, setQuestions] = useState<FieldQuestion[]>([]);
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });
  const { append, remove, replace } = useFieldArray({
    control: form.control,
    name: 'fields',
  });

  const onAddQuestion = (question: FieldQuestion) => {
    setQuestions([...questions, question]);
    append({ fieldQuestionId: question.id });
  };

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

  const onSubmit = (data: FormSchema) => {
    createRequestTemplate.mutate({
      name: data.name,
      description: data.description,
      fields: data.fields.map((q, idx) => ({ fieldQuestion: { id: q.fieldQuestionId }, order: idx + 1 })),
    });
  };

  console.log(form.formState.errors);

  return (
    <div className='w-full h-full flex flex-col items-center bg-green-400 relative'>
      {modalCheckOpen && (
        <Dialog open={modalCheckOpen}>
          <AlertCheck
            title={`Formulario creado con exito!`}
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
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card className=' sm:w-364 h-137 shadow-md border-none flex flex-col p-5 gap-5'>
              <div className=' border-gray-300  border-b-2  bg-white  '>
                <Input
                  {...form.register('name')}
                  placeholder='Título del Formulario'
                  className='mt-1 h-51  rounded-md text-[20px] hover:text-green-400 placeholder:text-green-400 text-green-400 bg-white  font-montserrat font-bold'
                />
                {form.formState.errors.name && (
                  <div className='flex column-flex'>
                    <span className='text-red-500'>{form.formState.errors.name.message}</span>
                  </div>
                )}
              </div>
              <div className=' border-gray-300  border-b-2  bg-white  '>
                <Input
                  {...form.register('description')}
                  placeholder='Descripcion del Formulario'
                  className='mt-1 h-51  rounded-md text-[14px]  text-green-400 bg-white  font-montserrat font-normal'
                />
                {form.formState.errors.description && (
                  <div className='flex column-flex'>
                    <span className='text-red-500'>{form.formState.errors.description.message}</span>
                  </div>
                )}
              </div>
            </Card>
            {questions.map((question, idx) => (
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
            <Label htmlFor='addQuestion'>
              <Card className='flex flex-col justify-center sm:h-[300px] border-2 border-green-400 hover:bg-green-200 cursor-pointer transform transition-all'>
                <div className='flex justify-center items-center'>
                  <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogTrigger
                      id='addQuestion'
                      className='bg-green-400 cursor-pointer rounded-full flex justify-center items-center'
                    >
                      <Plus className='fill-current text-white w-[50px] h-[50px] cursor-pointer' />
                    </DialogTrigger>
                    <FormOption
                      blackListQuestionIds={questions.map((q) => q.id)}
                      closeModal={() => setIsModalOpen(false)}
                      onSelection={onAddQuestion}
                    />
                  </Dialog>
                </div>
                <div className='flex justify-center pt-2'>
                  <Label
                    htmlFor='addQuestion'
                    className='cursor-pointer text-green-400 text-[18px] font-roboto font-bold'
                  >
                    Agregar Pregunta
                  </Label>
                </div>
              </Card>
            </Label>
            <CardFooter className='h-20 flex flex-row-reverse'>
              <Button
                disabled={createRequestTemplate.isPending}
                type='submit'
                className='bg-green-400 rounded-full w-[157px] h-[37px] mt-18 pb-2 text-gray-50 text-[18px] font-roboto font-bold'
              >
                Crear
              </Button>
            </CardFooter>
          </form>
        </Card>
      </Card>
    </div>
  );
}

const FieldRenderer = ({
  fieldQuestion,
  onRemove,
  idx,
  length,
  swapDownQuestion,
  swapUpQuestion,
}: {
  fieldQuestion: FieldQuestion;
  idx: number;
  length: number;
  onRemove: (idx: number) => void;
  swapUpQuestion: (idx: number) => void;
  swapDownQuestion: (idx: number, length: number) => void;
}) => {
  const renderer = (fieldQuestion: FieldQuestion) => {
    switch (fieldQuestion.type) {
      case FieldQuestionTypeEnum.TEXT:
      case FieldQuestionTypeEnum.NUMBER:
        return <TextFieldRenderer />;
      case FieldQuestionTypeEnum.SELECTION:
        if (fieldQuestion.selectionConfig.isMultiple) {
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
      <div className='absolute top-4 right-4 flex w-fit gap-2'>
        <Button
          disabled={idx === 0}
          onClick={() => swapUpQuestion(idx)}
          className='p-3 shadow-md hover:shadow-lg h-fit rounded-full bg-green-100 hover:bg-green-200'
        >
          <ArrowBigUpDash className='fill-current text-green-400 h-4 w-4' />
        </Button>
        <Button
          onClick={() => swapDownQuestion(idx, length)}
          disabled={idx === length - 1}
          className='p-3 shadow-md hover:shadow-lg h-fit rounded-full bg-green-100 hover:bg-green-200'
        >
          <ArrowBigDownDash className='fill-current text-green-400 h-4 w-4' />
        </Button>
        <Button
          onClick={() => onRemove(idx)}
          className='p-3 shadow-md hover:shadow-lg h-fit rounded-full bg-red-500 hover:bg-red-600'
        >
          <Trash className='fill-current text-white h-4 w-4' />
        </Button>
      </div>
      <h3 className='font-roboto text-xl font-bold text-green-400'>{fieldQuestion.name}</h3>
      <h4 className='font-roboto text-base font-bold text-gray-600'>{fieldQuestion.label}</h4>
      <span className='font-roboto text-lg font-bold flex text-gray-400'>{fieldQuestion.description}</span>
      {renderer(fieldQuestion)}
    </Card>
  );
};

const TextFieldRenderer = () => {
  return <Input disabled={true} className='border-b-2 rounded-none border-solid bg-white border-green-500' />;
};

const SelectionSimpleFieldRenderer = (props: { fieldQuestion: FieldQuestion }) => {
  return (
    <>
      {props.fieldQuestion.selections.map((selection) => (
        <div key={selection.id} className='flex flex-row items-center gap-5'>
          <Checkbox checked={false} disabled={true} className='h-5 w-5 rounded-full' />
          <span className='font-roboto text-sm text-gray-400'>{selection.value}</span>
        </div>
      ))}
    </>
  );
};

const SelectionMultipleFieldRenderer = (props: { fieldQuestion: FieldQuestion }) => {
  return (
    <>
      {props.fieldQuestion.selections.map((selection) => (
        <div key={selection.id} className='flex flex-row items-center gap-5'>
          <Checkbox checked={false} disabled={true} className='h-5 w-5' />
          <span className='font-roboto text-gray-400'>{selection.value}</span>
        </div>
      ))}
    </>
  );
};
