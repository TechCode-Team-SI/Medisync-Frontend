/* eslint-disable prettier/prettier */
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { CardContent } from 'src/components/ui/card';
import { DialogClose, DialogContent, DialogTitle } from 'src/components/ui/dialog';
import { Form, FormField, FormItem } from 'src/components/ui/form';
import Spinner from 'src/components/ui/icons/spinner';
import { TableBody, TableCell, TableRow } from 'src/components/ui/table';
import { AgendaHttp } from 'src/services/api/agenda';
import { Specialty } from 'src/services/api/interface';
import { specialtiesHttp } from 'src/services/api/specialties';

import { AlertCheck } from '../../alerts/alertCheck';
import { Button } from '../../ui/button';
import { Checkbox } from '../../ui/checkbox';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';

import { assignAgendaSchema, AssignAgendaSchema } from './assignAgendaSchema';

interface SeeRoles {
  specialty?: Specialty;
  onClose?: () => void;
  Recargar?: () => void;
}

export function AssignAgendaSpecialties({ onClose, Recargar = () => {}, specialty }: SeeRoles) {
  const [modalCheckOpen, setModalCheckOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: getDataspecialty } = useQuery({
    queryKey: [`user-By-ID-${specialty?.id}`],
    queryFn: () => specialtiesHttp.getById({ id: specialty?.id ?? '' }),
  });

  const form = useForm<AssignAgendaSchema>({
    resolver: zodResolver(assignAgendaSchema),
    defaultValues: {
      name: specialty?.name ?? getDataspecialty?.name,
      description: specialty?.description ?? getDataspecialty?.description,
      agenda: specialty?.agenda?.id ?? getDataspecialty?.agenda?.id ?? '',
    },
  });

  const AssignAgendaSpecialty = useMutation({
    mutationKey: [''],
    mutationFn: specialtiesHttp.putAssignAgendaSpecialty,
    onSuccess: () => {
      console.log('Asignado');
      setModalCheckOpen(true);
      queryClient.invalidateQueries({ queryKey: [`user-By-ID-${specialty?.id}`] });
    },
    onError: () => {
      console.log(AssignAgendaSpecialty.error?.message);
    },
  });

  const { data: getData } = useQuery({
    queryKey: ['Agenda'],
    queryFn: AgendaHttp.getAgenda,
  });

  const onSubmit = (data: AssignAgendaSchema) => {
    AssignAgendaSpecialty.mutate({
      id: specialty?.id ?? '',
      agendaId: data.agenda,
    });
  };

  return (
    <DialogContent
      onCloseAutoFocus={onClose}
      className='min-w-[529px] max-w-[429px] min-h-[599px] max-h-[700px] rounded-lg bg-green-400 border-none px-0 pt-14 pb-0'
    >
      <div className='absolute flex w-full h-14 items-center justify-center px-20'>
        <DialogTitle className='flex font-bold text-white text-[16px] text-center'>ASIGNAR AGENDA</DialogTitle>
      </div>
      <div className='relative w-full h-full flex flex-col rounded-b-lg bg-white px-10 py-6'>
        <div className='flex flex-col w-full justify-center space-x-2'>
          <Form {...form}>
            <form className='space-y-4 ' onSubmit={form.handleSubmit(onSubmit)}>
              <div className='flex  flex-col m-2'>
                <Label htmlFor='fullName' className='text-green-400 font-roboto font-bold h-7 text-[14px]'>
                  NOMBRE DE LA ESPECIALIDAD
                </Label>
                <Input
                  id='fullName'
                  className='w-full h-10 rounded-2 font-roboto text-base'
                  readOnly
                  {...form.register('name')}
                />
                {form.formState.errors.name && (
                  <span className='text-red-500'>{form.formState.errors.name.message}</span>
                )}

                <Label htmlFor='dni' className='text-green-400 font-roboto font-bold h-7 text-[14px] mt-2'>
                  DESCRIPCIÓN
                </Label>
                <Input
                  id='dni'
                  readOnly
                  className='w-full h-10 rounded-2 font-roboto text-base'
                  {...form.register('description')}
                />
                {form.formState.errors.description && (
                  <span className='text-red-500'>{form.formState.errors.description.message}</span>
                )}
              </div>
              <Label htmlFor='description' className='text-green-400 font-roboto font-bold h-7 mt-5 text-[14px]'>
                ROLES
              </Label>
              <div className='flex flex-col pt-2 w-full h-48'>
                <CardContent className='overflow-auto scrollbar-edit'>
                  <TableBody className='grid grid-cols-2'>
                    {getData &&
                      getData.data.map((agenda) => (
                        <TableRow className='border-b-0' key={agenda.id}>
                          <TableCell>
                            <div className='flex px-4 w-48 '>
                              <FormField
                                control={form.control}
                                name='agenda'
                                render={({ field }) => (
                                  <FormItem>
                                    <Checkbox
                                      checked={field.value.includes(agenda.id)}
                                      onCheckedChange={(checked) => {
                                        const newValue = checked ? agenda.id : '';
                                        field.onChange(newValue || '');
                                      }}
                                      className='flex text-center justify-center w-[20px] h-[20px] mr-1 border-2 border-green-400'
                                    />
                                  </FormItem>
                                )}
                              />
                              <Label className='text-green-400 font-roboto font-bold h-5 text-[14px] justify-center flex text-center'>
                                {agenda.name}
                              </Label>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </CardContent>
              </div>
              <div className='flex flex-row justify-center p-4'>
                <Button
                  className='w-[163px] h-[46px] mr-4'
                  type='submit'
                  variant={'btnGreen'}
                  disabled={AssignAgendaSpecialty.isPending}
                >
                  {AssignAgendaSpecialty.isPending ? <Spinner /> : 'Guardar'}
                </Button>

                {modalCheckOpen && (
                  <DialogClose>
                    <AlertCheck
                      title='¡Agenda Guardada Exitosamente!'
                      onClose={() => {
                        setModalCheckOpen(false);
                        Recargar();
                      }}
                    />
                  </DialogClose>
                )}

                <DialogClose>
                  <Button type='button' className='w-[136px] h-[46px] rounded-[10px]' variant={'btnGray'}>
                    Cancelar
                  </Button>
                </DialogClose>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </DialogContent>
  );
}
