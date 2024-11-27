/* eslint-disable prettier/prettier */
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import PaginationController from 'src/components/common/pagination';
import { CardContent } from 'src/components/ui/card';
import { DialogClose, DialogContent, DialogTitle } from 'src/components/ui/dialog';
import { Form, FormField, FormItem } from 'src/components/ui/form';
import Spinner from 'src/components/ui/icons/spinner';
import { Table, TableBody, TableCell, TableRow } from 'src/components/ui/table';
import { User } from 'src/services/api/interface';
import { specialtiesHttp } from 'src/services/api/specialties';
import { userHttp } from 'src/services/api/User';

import { AlertCheck } from '../../alerts/alertCheck';
import { Button } from '../../ui/button';
import { Checkbox } from '../../ui/checkbox';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';

import { AssignSpecialtySchema, assignSpecialtySchema } from './assignSpecialtySchema';

interface AssignSpecialty {
  user?: User;
  onClose?: () => void;
  Recargar?: () => void;
}

export function ModalAssignSpecialty({ onClose, Recargar = () => {}, user }: AssignSpecialty) {
  const [modalCheckOpen, setModalCheckOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: getDataUser } = useQuery({
    queryKey: [`user-By-ID-${user?.id}`],
    queryFn: () => userHttp.getbyID({ id: user?.id ?? '' }),
  });

  const form = useForm<AssignSpecialtySchema>({
    resolver: zodResolver(assignSpecialtySchema),
    defaultValues: {
      fullName: user?.fullName || getDataUser?.fullName,
      dni: user?.employeeProfile?.dni || getDataUser?.employeeProfile?.dni,
      specialty: (getDataUser?.employeeProfile?.specialties || user?.employeeProfile?.specialties || []).map(
        ({ id }) => id,
      ),
    },
  });

  const AssignSpecialty = useMutation({
    mutationKey: [''],
    mutationFn: userHttp.putAssignSpecialty,
    onSuccess: () => {
      console.log('Asignado');
      setModalCheckOpen(true);
      queryClient.invalidateQueries({ queryKey: [`user-By-ID-${user?.id}`] });
    },
    onError: () => {
      console.log(AssignSpecialty.error?.message);
    },
  });

  const [page, setPage] = useState(1);
  const { data: datalist } = useQuery({
    queryKey: [`${page}`],
    queryFn: ({ queryKey }) =>
      specialtiesHttp.getMySpecialty({
        page: queryKey[0],
        isDisabled: false,
      }),
  });

  const onSubmit = (data: AssignSpecialtySchema) => {
    AssignSpecialty.mutate({
      id: user?.id ?? '',
      specialtyIds: data.specialty.map((id) => id),
    });
  };

  return (
    <DialogContent
      onCloseAutoFocus={onClose}
      className='min-w-[529px] max-w-[429px] min-h-[599px] max-h-[700px] rounded-lg bg-green-400 border-none px-0 pt-14 pb-0'
    >
      <div className='absolute flex w-full h-14 items-center justify-center px-20'>
        <DialogTitle className='flex font-bold text-white text-[16px] text-center'>ASIGNAR ESPECIALIDADES</DialogTitle>
      </div>
      <div className='relative w-full h-full flex flex-col rounded-b-lg bg-white px-7 pt-6 pb-0'>
        <div className='flex flex-col w-full justify-center space-x-2'>
          <Form {...form}>
            <form className='space-y-4 ' onSubmit={form.handleSubmit(onSubmit)}>
              <div className='flex  flex-col m-2'>
                <Label htmlFor='fullName' className='text-green-400 font-roboto font-bold h-7 text-[14px]'>
                  NOMBRE COMPLETO
                </Label>
                <Input
                  id='fullName'
                  className='w-full h-10 rounded-2 font-roboto text-base cursor-default'
                  readOnly
                  {...form.register('fullName')}
                />
                {form.formState.errors.fullName && (
                  <span className='text-red-500'>{form.formState.errors.fullName.message}</span>
                )}

                <Label htmlFor='dni' className='text-green-400 font-roboto font-bold h-7 text-[14px] mt-2'>
                  DNI
                </Label>
                <Input
                  id='dni'
                  readOnly
                  className='w-full h-10 rounded-2 font-roboto text-base cursor-default'
                  {...form.register('dni')}
                />
                {form.formState.errors.dni && <span className='text-red-500'>{form.formState.errors.dni.message}</span>}
              </div>
              <Label htmlFor='description' className='text-green-400 font-roboto font-bold h-full mt-5 text-[14px]'>
                ESPECIALIDADES
              </Label>
              <div className='flex flex-col pt-2 w-full h-52 pb-8'>
                <CardContent className='overflow-auto scrollbar-edit p-0  h-full'>
                  <Table containerClassName='h-full '>
                    <TableBody className='grid grid-cols-2  '>
                      {datalist &&
                        datalist.data.map((specialty) => (
                          <TableRow className='border-b-0 ' key={specialty.id}>
                            <TableCell>
                              <div className='flex px-4 w-48 cursor-pointer'>
                                <FormField
                                  control={form.control}
                                  name='specialty'
                                  render={({ field }) => (
                                    <FormItem>
                                      <Checkbox
                                        checked={field.value.includes(specialty.id)}
                                        onCheckedChange={(checked) => {
                                          console.log(checked);
                                          const newValue = field.value;
                                          return checked
                                            ? field.onChange([...newValue, specialty.id])
                                            : field.onChange(
                                                newValue.filter((specialtys) => specialtys !== specialty.id),
                                              );
                                        }}
                                        className='flex text-center justify-center w-[20px] h-[20px] mr-1 border-2 border-green-400'
                                      />
                                    </FormItem>
                                  )}
                                />
                                <Label className='text-green-400 font-roboto font-bold h-auto text-[14px] justify-center flex text-center'>
                                  {specialty.name}
                                </Label>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </div>
              <PaginationController totalPages={datalist?.totalPages} setPage={setPage} />
              <div className='flex flex-row justify-center p-4 pt-3'>
                <Button
                  className='w-[163px] h-[46px] mr-4'
                  type='submit'
                  variant={'btnGreen'}
                  disabled={AssignSpecialty.isPending}
                >
                  {AssignSpecialty.isPending ? <Spinner /> : 'Guardar'}
                </Button>

                {modalCheckOpen && (
                  <DialogClose>
                    <AlertCheck
                      title='¡Especialidad Guardada Exitosamente!'
                      onClose={() => {
                        setModalCheckOpen(false);
                        Recargar();
                      }}
                    />
                  </DialogClose>
                )}

                <DialogClose asChild>
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
