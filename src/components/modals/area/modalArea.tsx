import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { DialogClose, DialogContent, DialogTitle } from 'src/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from 'src/components/ui/select';
import { AreaHttp } from 'src/services/api/area';
import { Area } from 'src/services/api/interface';
import { specialtiesHttp } from 'src/services/api/specialties';

import { AlertCheck } from '../../alerts/alertCheck';
import { Button } from '../../ui/button';
import { Form, FormField, FormItem } from '../../ui/form';
import Spinner from '../../ui/icons/spinner';
import { Input } from '../../ui/input';

import { demoSchema, DemoSchema } from './schema';

interface AreaData {
  area?: Area;
  onClose?: () => void;
}

export function ModalArea({
  area = { id: '', name: '', address: '', specialty: { id: '' }, employeeProfile: null, isDisabled: false },
  onClose = () => {},
}: AreaData) {
  const [modalCheckOpen, setModalCheckOpen] = useState(false);

  const form = useForm<DemoSchema>({
    resolver: zodResolver(demoSchema),
  });

  form.control._defaultValues.name = area.name;
  form.control._defaultValues.address = area.address;
  form.control._defaultValues.specialty = area.specialty.id;

  const { data: datalist } = useQuery({
    queryKey: ['especialties'],
    queryFn: specialtiesHttp.get,
  });

  const registerArea = useMutation({
    mutationKey: [''],
    mutationFn: AreaHttp.postArea,
    onSuccess: () => {
      setModalCheckOpen(true);
      form.control._reset();
    },
  });

  const editArea = useMutation({
    mutationKey: [''],
    mutationFn: AreaHttp.patchArea,
    onSuccess: () => {
      setModalCheckOpen(true);
    },
  });

  const onSubmit = (data: DemoSchema) => {
    if (area.id === '') {
      registerArea.mutate({ name: data.name, address: data.address, specialty: { id: data.specialty } });
    } else {
      editArea.mutate({ id: area.id, name: data.name, address: data.address, specialty: { id: data.specialty } });
    }
  };

  console.log(modalCheckOpen);
  return (
    <DialogContent className='w-[429px] min-h-[424px] max-h-[424px] rounded-lg bg-green-400 border-none px-0 pt-14 pb-0'>
      <div className='absolute flex w-full h-14 items-center justify-center px-20'>
        <DialogTitle className='font-bold text-white text-[16px] text-center'>AÑADIR AREA</DialogTitle>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='relative w-full h-auto flex flex-col rounded-b-lg bg-white py-4 px-8'
        >
          <div className='p-2 flex flex-col gap-3'>
            {/* Nombre */}
            <div className='flex flex-col'>
              <label htmlFor='schedule-name' className='text-sm text-green-400 font-bold'>
                NOMBRE
              </label>
              <Input
                {...form.register('name')}
                id='schedule-name'
                placeholder='Ingrese el nombre'
                className='mt-1 w-full h-[35px] bg-green-100/50 border-none rounded-md text-[14px] placeholder:text-green-300 focus-visible:ring-green-400'
              />
              {form.formState.errors.name && (
                <div className='flex column-flex'>
                  <span className='text-red-500 absolute'>{form.formState.errors.name.message}</span>
                </div>
              )}
            </div>

            {/* Direccion */}
            <div className='flex flex-col'>
              <label htmlFor='area-direccion' className='text-sm text-green-400 font-bold'>
                Direccion
              </label>
              <Input
                {...form.register('address')}
                id='area-direccion'
                placeholder='Ingrese el tiempo'
                className='mt-1 w-full h-[35px] bg-green-100/50 border-none rounded-md text-[14px] placeholder:text-green-300 focus-visible:ring-green-400'
              />
              {form.formState.errors.address && (
                <div className='flex column-flex'>
                  <span className='text-red-500 absolute'>{form.formState.errors.address.message}</span>
                </div>
              )}
            </div>

            {/* Especialidad */}
            <div className='flex flex-col'>
              <label htmlFor='area-specialty' className='text-sm text-green-400 font-bold'>
                Especialidad
              </label>
              <FormField
                control={form.control}
                name='specialty'
                render={({ field }) => (
                  <FormItem>
                    <Select
                      {...field}
                      onValueChange={(value) => {
                        field.onChange(value);
                        console.log(value);
                      }}
                      value={field.value}
                    >
                      <SelectTrigger
                        id='specialty'
                        className='h-8 rounded-none text-green-400 font-roboto font-bold text-base text-[12px] '
                      >
                        <SelectValue placeholder='Seleccione especialidades' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Especialidades</SelectLabel>
                          {datalist &&
                            datalist.data.map((specialty) => (
                              <SelectItem key={specialty.id} value={specialty.id}>
                                {specialty.name}
                              </SelectItem>
                            ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              {form.formState.errors.specialty && (
                <div className='flex column-flex'>
                  <span className='text-red-500 absolute'>{form.formState.errors.specialty.message}</span>
                </div>
              )}
            </div>
          </div>
          <div className='flex w-full h-full justify-between items-center pt-4'>
            <Button
              disabled={registerArea.isPending || editArea.isPending}
              className='w-[163px] h-[46px]:'
              type='submit'
              variant={'btnGreen'}
            >
              {area.id === '' ? (
                registerArea.isPending ? (
                  <Spinner />
                ) : (
                  'Guardar'
                )
              ) : editArea.isPending ? (
                <Spinner />
              ) : (
                'Editar'
              )}
            </Button>
            {modalCheckOpen && (
              <DialogClose>
                <AlertCheck
                  title='¡Horario Editado con éxito!'
                  onClose={() => {
                    setModalCheckOpen(false);
                    onClose();
                  }}
                />
              </DialogClose>
            )}
            <DialogClose>
              <Button className='w-[163px] h-[46px]' type='button' variant={'btnGray'}>
                Cancelar
              </Button>
            </DialogClose>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
}
