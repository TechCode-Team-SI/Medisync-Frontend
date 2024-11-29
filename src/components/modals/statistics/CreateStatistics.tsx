import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { AlertCheck } from 'src/components/alerts/alertCheck';
import { Button } from 'src/components/ui/button';
import { CardContent } from 'src/components/ui/card';
import { DialogClose, DialogContent, DialogHeader, DialogTitle } from 'src/components/ui/dialog';
import { Form, FormField, FormItem } from 'src/components/ui/form';
import Logo from 'src/components/ui/icons/logo';
import { Input } from 'src/components/ui/input';
import { Label } from 'src/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from 'src/components/ui/select';
import { statisticsHttp } from 'src/services/api/statistics';
import { FieldQuestionTypeEnum, FilteredByType, StatisticType } from 'src/utils/constants';

import { createStatistics, CreateStatistics } from './CreateStatisticsSchema';

export function CreateStatistics() {
  const form = useForm<CreateStatistics>({
    resolver: zodResolver(createStatistics),
  });
  const formWatch = useWatch({ control: form.control });

  const [modalCheckOpen, setModalCheckOpen] = useState(false);

  const statistic = {
    [StatisticType.HISTOGRAM]: 'Grafica de Barra',
    [StatisticType.TART]: 'Grafica de Torta',
  };

  const Filtered = {
    [FilteredByType.NONE]: 'Ninguno',
    [FilteredByType.SPECIALTY]: 'Especialidad',
  };

  const { data: datalist } = useQuery({
    queryKey: ['FieldQuestions'],
    queryFn: () => statisticsHttp.getFieldQuestions({ type: FieldQuestionTypeEnum.SELECTION }),
  });

  const { data: datalistfiltered } = useQuery({
    queryKey: ['SpecialtiesFilter', formWatch],
    queryFn: () => statisticsHttp.getAvailableSpecialtiesFilter({ id: formWatch.fieldQuestionId ?? '' }),
    enabled: !!formWatch.fieldQuestionId,
  });

  const queryClient = useQueryClient();

  const CenterConfigInstallation = useMutation({
    mutationKey: [''],
    mutationFn: statisticsHttp.postCreateStatisticData,
    onSuccess: () => {
      console.log('se creo la data para las estadisticas');
      setModalCheckOpen(true);
      queryClient.invalidateQueries({ queryKey: ['Statistics'] });
    },
    onError: () => {
      console.log('no funciono');
    },
  });

  console.log(form.formState.errors);

  const onSubmit = (data: CreateStatistics) => {
    if (data.filteredByType) {
      CenterConfigInstallation.mutate({
        label: data.label,
        type: data.type,
        filteredByType: data.filteredByType,
        filter: data.filter,
        fieldQuestion: { id: data.fieldQuestionId },
      });
    } else {
      CenterConfigInstallation.mutate({
        label: data.label,
        type: data.type,
        fieldQuestion: { id: data.fieldQuestionId },
      });
    }
  };

  return (
    <DialogContent className=' max-w-[552px] max-h-[90vh] flex flex-col gap-0 p-0 bg-green-400 border-none rounded-xl sm:max-w-md'>
      <DialogHeader className='gap-4 flex flex-row mx-6 my-1 space-x-4 sm:space-x-6'>
        <Logo className='fill-current text-white h-[50px] w-[50px] sm:h-[69px] sm:w-[60px]' />
        <DialogTitle className='text-white font-montserrat text-[20px] sm:text-[24px] font-medium'>
          Generar Grafica <span className='font-bold'>Para Estadisticas</span>
        </DialogTitle>
      </DialogHeader>
      <CardContent className='w-full h-full flex flex-col overflow-auto scrollbar-edit rounded-b-xl bg-white p-3 sm:p-6 lg:p-6 gap-5'>
        <Form {...form}>
          <form className='space-y-4 ' onSubmit={form.handleSubmit(onSubmit)}>
            <div className='space-y-1 mb-2'>
              <Label htmlFor='email' className='text-green-400 font-roboto font-bold h-32 text-[12px]'>
                Titulo
              </Label>
              <Input id='label' className='w-full h-8 rounded-none font-roboto text-base' {...form.register('label')} />
              {form.formState.errors.label && (
                <span className='text-red-500'>{form.formState.errors.label.message}</span>
              )}
            </div>

            <FormField
              control={form.control}
              name='type'
              render={({ field }) => (
                <FormItem>
                  <Select {...field} onValueChange={(value) => field.onChange(value)} value={field.value ?? ''}>
                    <SelectTrigger
                      id='type'
                      className='h-8 rounded-none text-green-400 font-roboto font-bold text-base text-[12px] '
                    >
                      <SelectValue placeholder='Seleccione un Tipo de Grafico' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Tipo de Grafica</SelectLabel>
                        {Object.entries(statistic).map(([value, label]) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='fieldQuestionId'
              render={({ field }) => (
                <FormItem>
                  <Select {...field} onValueChange={(value) => field.onChange(value)} value={field.value ?? ''}>
                    <SelectTrigger
                      id='fieldQuestionId'
                      className='h-8 rounded-none text-green-400 font-roboto font-bold text-base text-[12px] '
                    >
                      <SelectValue placeholder='Seleccione la Preguntas de Campo' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Tipo de Preguntas</SelectLabel>
                        {datalist &&
                          datalist.data.map((questions) => (
                            <SelectItem key={questions.id} value={questions.id}>
                              {questions.name}
                            </SelectItem>
                          ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='filteredByType'
              render={({ field }) => (
                <FormItem>
                  <Select {...field} onValueChange={(value) => field.onChange(value)} value={field.value ?? ''}>
                    <SelectTrigger
                      id='filteredByType'
                      className='h-8 rounded-none text-green-400 font-roboto font-bold text-base text-[12px] '
                    >
                      <SelectValue placeholder='Como desea agrupar la informacion?' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Filtro</SelectLabel>
                        {Object.entries(Filtered).map(([value, label]) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            {formWatch.filteredByType == FilteredByType.SPECIALTY && (
              <div>
                <FormField
                  control={form.control}
                  name='filter'
                  render={({ field }) => (
                    <FormItem>
                      <Select {...field} onValueChange={(value) => field.onChange(value)} value={field.value ?? ''}>
                        <SelectTrigger
                          id='filter'
                          className='h-8 rounded-none text-green-400 font-roboto font-bold text-base text-[12px] '
                        >
                          <SelectValue placeholder='Seleccione La Especialidad' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Especialidades</SelectLabel>
                            {datalistfiltered &&
                              datalistfiltered.data.map((specialties) => (
                                <SelectItem key={specialties.id} value={specialties.id}>
                                  {specialties.name}
                                </SelectItem>
                              ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
            )}

            <div className='flex flex-row justify-center p-4'>
              <Button className='w-[163px] h-[46px] mr-4' type='submit' variant={'btnGreen'}>
                Guardar
              </Button>
              {modalCheckOpen && (
                <DialogClose>
                  <AlertCheck
                    title={`¡Estadística registrada correctamente!`}
                    onClose={() => {
                      setModalCheckOpen(false);
                    }}
                  />
                </DialogClose>
              )}
              <DialogClose asChild>
                <Button className='w-[163px] h-[46px]' type='button' variant={'btnGray'}>
                  Cancelar
                </Button>
              </DialogClose>
            </div>
          </form>
        </Form>
      </CardContent>
    </DialogContent>
  );
}
