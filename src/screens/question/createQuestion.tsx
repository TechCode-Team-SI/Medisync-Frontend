/* eslint-disable prettier/prettier */
import { zodResolver } from '@hookform/resolvers/zod';
import { Select } from '@radix-ui/react-select';
import { useMutation } from '@tanstack/react-query';
import { Plus, X } from 'lucide-react';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import { AlertCheck } from 'src/components/alerts/alertCheck';
import { UserType } from 'src/components/navbar/userType/userType';
import { Button } from 'src/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from 'src/components/ui/card';
import { Checkbox } from 'src/components/ui/checkbox';
import { Dialog } from 'src/components/ui/dialog';
import User from 'src/components/ui/icons/user';
import { Input } from 'src/components/ui/input';
import { SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from 'src/components/ui/select';
import { FieldQuestionHttp } from 'src/services/api/question';
import { FieldQuestionTypeEnum } from 'src/utils/constants';

import { QuestionSchema, questionSchema } from './schema';

const casillasDefault = [
  { id: 1, text: 'Casilla 1' },
  { id: 2, text: 'Casilla 2' },
];

const opcionesDefault = [
  { id: 1, text: 'Opción 1' },
  { id: 2, text: 'Opción 2' },
];

export function createQuestion() {
  const createQuestion = useMutation({
    mutationKey: ['create-field-question'],
    mutationFn: FieldQuestionHttp.postFieldQuestion,
    onSuccess: () => {
      console.log('creado');
      setModalCheckOpen(true);
    },
    onError: () => {
      console.log(createQuestion.error?.message);
    },
  });
  const form = useForm<QuestionSchema>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      description: '',
      isRequired: true,
      label: '',
      name: '',
      type: FieldQuestionTypeEnum.TEXT,
    },
  });
  const { append, remove, update, replace } = useFieldArray({
    control: form.control,
    name: 'selections',
  });
  const [optionIdCounter, setOptionIdCounter] = useState(3);
  const [casillaIdCounter, setCasillaIdCounter] = useState(3);
  const [modalCheckOpen, setModalCheckOpen] = useState(false);

  // Estados separados para casillas y opciones
  const [casillas, setCasillas] = useState(casillasDefault);
  const [opciones, setOpciones] = useState(opcionesDefault);

  const [questionType, setQuestionType] = useState('texto'); // Estado para manejar el tipo de respuesta

  // Métodos exclusivos para "Casillas"
  const addCasilla = () => {
    const newCasilla = { id: casillaIdCounter, text: `Casilla ${casillaIdCounter}` };
    append({ value: newCasilla.text });
    setCasillas([...casillas, newCasilla]);
    setCasillaIdCounter(casillaIdCounter + 1);
  };

  const removeCasilla = (id: number, idx: number) => {
    setCasillas(casillas.filter((casilla) => casilla.id !== id));
    remove(idx);
  };

  const updateCasillaText = (id: number, newText: string, idx: number) => {
    setCasillas(casillas.map((casilla) => (casilla.id === id ? { ...casilla, text: newText } : casilla)));
    update(idx, { value: newText });
  };

  // Métodos exclusivos para "Opciones"
  const addOpcion = () => {
    const newOpcion = { id: optionIdCounter, text: `Opción ${optionIdCounter}` };
    setOpciones([...opciones, newOpcion]);
    setOptionIdCounter(optionIdCounter + 1);
    append({ value: newOpcion.text });
  };

  const removeOpcion = (id: number, idx: number) => {
    setOpciones(opciones.filter((opcion) => opcion.id !== id));
    remove(idx);
  };

  const updateOpcionText = (id: number, newText: string, idx: number) => {
    setOpciones(opciones.map((opcion) => (opcion.id === id ? { ...opcion, text: newText } : opcion)));
    update(idx, { value: newText });
  };

  // Manejar el cambio en el tipo de pregunta
  const handleQuestionTypeChange = (value: string) => {
    setQuestionType(value);
    switch (value) {
      case 'texto':
        updateFieldQuestionType(FieldQuestionTypeEnum.TEXT);
        break;
      case 'casillas':
        updateFieldQuestionType(FieldQuestionTypeEnum.SELECTION, true);
        replace(casillas.map((casilla) => ({ value: casilla.text })));
        break;
      case 'opciones':
        updateFieldQuestionType(FieldQuestionTypeEnum.SELECTION, false);
        replace(opciones.map((opcion) => ({ value: opcion.text })));
        break;
    }
  };

  const updateFieldQuestionType = (type: FieldQuestionTypeEnum, isMultiple?: boolean) => {
    switch (type) {
      case FieldQuestionTypeEnum.TEXT:
        form.setValue('type', FieldQuestionTypeEnum.TEXT, { shouldValidate: true });
        form.setValue('selectionConfig', null, { shouldValidate: true });
        form.setValue('selections', null, { shouldValidate: true });
        break;
      case FieldQuestionTypeEnum.NUMBER:
        form.setValue('type', FieldQuestionTypeEnum.NUMBER, { shouldValidate: true });
        form.setValue('selectionConfig', null, { shouldValidate: true });
        form.setValue('selections', null, { shouldValidate: true });
        break;
      case FieldQuestionTypeEnum.SELECTION:
        if (isMultiple === undefined) return;
        form.setValue('type', FieldQuestionTypeEnum.SELECTION, { shouldValidate: true });
        form.setValue('selectionConfig', { isMultiple }, { shouldValidate: true });
        form.setValue(
          'selections',
          opciones.map((opcion) => ({ value: opcion.text })),
          { shouldValidate: true },
        );
    }
  };

  const onSubmit = (data: QuestionSchema) => {
    createQuestion.mutate({
      description: data.description,
      isRequired: data.isRequired,
      label: data.label,
      name: data.name,
      type: data.type,
      selectionConfig: data.selectionConfig || undefined,
      selections: data.selections || undefined,
    });
  };

  return (
    <div className='w-full h-full flex flex-col items-center bg-green-400 relative'>
      {modalCheckOpen && (
        <Dialog open={modalCheckOpen}>
          <AlertCheck
            title={`Pregunta creada con exito!`}
            onClose={() => {
              setModalCheckOpen(false);
              form.reset();
              setQuestionType('texto');
              setCasillas(casillasDefault);
              setOpciones(opcionesDefault);
            }}
          />
        </Dialog>
      )}
      <Card className='h-full w-full flex flex-col px-8 sm:px-9 lg:px-10 pt-8 sm:pt-9 lg:pt-10 bg-green-600 border-none rounded-none rounded-l-xl'>
        <Card className='bg-white min-h-[60px] max-h-[60px] w-full mb-4 flex fles-row justify-end items-center px-5 sm:px-10 lg:px-20'>
          <UserType />
        </Card>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className='bg-white w-full h-full rounded-b-none overflow-auto scrollbar-edit flex flex-col p-6 pb-0 sm:p-8 sm:pb-0 lg:p-10 lg:pb-0 space-y-5'>
            <CardHeader className='w-full flex p-3 flex-col space-y-5'>
              <CardTitle className=' text-green-400 font-montserrat font-bold text-[18px] text-left'>
                CREAR PREGUNTA
              </CardTitle>
            </CardHeader>
            <CardContent className='overflow-auto scrollbar-edit'>
              <Card className='w-full grow sm:w-364 h-251 shadow-md border-none flex flex-col p-5 gap-5'>
                <div className='flex flex-grow'>
                  <div className='flex w-1/2 flex-grow flex-col'>
                    <Input
                      {...form.register('name')}
                      placeholder='Identificador'
                      className='mt-1 h-51 bg-green-100/50 border-none rounded-md text-[14px] focus-visible:ring-green-400'
                    />
                    {form.formState.errors.name && (
                      <div className='flex column-flex'>
                        <span className='text-red-500'>{form.formState.errors.name.message}</span>
                      </div>
                    )}
                  </div>
                  <div className='relative flex flex-col h-[51px] w-1/2 pl-12 pt-1'>
                    <Select value={questionType} onValueChange={handleQuestionTypeChange}>
                      <SelectTrigger id='options' className='h-[40px] border border-gray-300 rounded bg-white'>
                        <SelectValue placeholder='Seleccione la casilla' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value='texto'>
                            <User fill='#539091' className='h-[17px] w-[18px] absolute mt-[3px]' />
                            <span className='ml-6'>Texto</span>
                          </SelectItem>
                          <SelectItem value='casillas'>
                            <div className='bg-green-400 border border-gray-200 h-[17px] w-[18px] absolute mt-[3px] rounded-sm' />
                            <span className='ml-6'>Casillas</span>
                          </SelectItem>
                          <SelectItem value='opciones'>
                            <div className='bg-green-400 border border-gray-200 h-[17px] w-[18px] absolute mt-[3px] rounded-full' />
                            <span className='ml-6'>Opciones</span>
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {form.formState.errors.type && (
                      <div className='flex column-flex'>
                        <span className='text-red-500'>{form.formState.errors.type.message}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className='flex w-full flex-col'>
                  <Input
                    {...form.register('label')}
                    placeholder='Titulo de la pregunta'
                    className='mt-1 py-4 bg-green-100/50 border-none rounded-md text-[14px] focus-visible:ring-green-400'
                  />
                  {form.formState.errors.label && (
                    <div className='flex column-flex'>
                      <span className='text-red-500'>{form.formState.errors.label.message}</span>
                    </div>
                  )}
                </div>

                {questionType === 'casillas' && (
                  <div className='space-y-2'>
                    {casillas.map((casilla, idx) => (
                      <div key={casilla.id} className='flex items-center gap-2'>
                        <Checkbox className='h-5 w-5' />
                        <Input
                          value={casilla.text}
                          onChange={(e) => updateCasillaText(casilla.id, e.target.value, idx)}
                          className='flex-1 h-10 bg-gray-50 border border-gray-300 rounded px-2'
                        />
                        <Button
                          type='button'
                          onClick={() => removeCasilla(casilla.id, idx)}
                          className='text-red-400 bg-gray-50 hover:bg-green-200'
                        >
                          <X className='h-5 w-5' />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type='button'
                      onClick={addCasilla}
                      className='flex items-center gap-2 text-gray-50 bg-green-300 hover:bg-green-200'
                    >
                      <Plus className='h-5 w-5' /> Añadir otra casilla
                    </Button>
                  </div>
                )}

                {questionType === 'opciones' && (
                  <div className='space-y-2'>
                    {opciones.map((opcion, idx) => (
                      <div key={opcion.id} className='flex items-center gap-2'>
                        <Checkbox className='h-5 w-5 rounded-full' />
                        <Input
                          value={opcion.text}
                          onChange={(e) => updateOpcionText(opcion.id, e.target.value, idx)}
                          className='flex-1 h-10 bg-gray-50 border border-gray-300 rounded px-2'
                        />
                        <Button
                          type='button'
                          onClick={() => removeOpcion(opcion.id, idx)}
                          className='text-red-400 bg-gray-50 hover:bg-green-200'
                        >
                          <X className='h-5 w-5' />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type='button'
                      onClick={addOpcion}
                      className='flex items-center gap-2 text-gray-50 bg-green-300 hover:bg-green-200'
                    >
                      <Plus className='h-5 w-5' /> Añadir otra opción
                    </Button>
                  </div>
                )}

                {form.formState.errors.selections && (
                  <div className='flex column-flex'>
                    <span className='text-red-500'>{form.formState.errors.selections.message}</span>
                  </div>
                )}
              </Card>
            </CardContent>
            <CardFooter className='h-20 flex flex-row-reverse'>
              <Button
                disabled={createQuestion.isPending}
                type='submit'
                className='bg-green-400 rounded-full w-[157px] h-[37px] mt-18 text-gray-50 text-[18px] font-roboto font-bold'
              >
                Crear
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Card>
    </div>
  );
}
