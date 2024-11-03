/* eslint-disable prettier/prettier */
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { CardContent } from 'src/components/ui/card';
import { DialogClose, DialogContent, DialogTitle } from 'src/components/ui/dialog';
import { Form, FormField, FormItem } from 'src/components/ui/form';
import Spinner from 'src/components/ui/icons/spinner';
import { TableBody, TableCell, TableRow } from 'src/components/ui/table';
import { Role } from 'src/services/api/interface';
import { permissionsHttp } from 'src/services/api/permissions';
import { rolesHttp } from 'src/services/api/role';

import { AlertCheck } from '../../alerts/alertCheck';
import { Button } from '../../ui/button';
import { Checkbox } from '../../ui/checkbox';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';

import { roleSchema, RoleSchema } from './schema';

interface RegisterRoles {
  role?: Role;
  onClose?: () => void;
  Recargar?: () => void;
}

export function RegisterRoles({ onClose, Recargar = () => {}, role }: RegisterRoles) {
  const [modalCheckOpen, setModalCheckOpen] = useState(false);

  const form = useForm<RoleSchema>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      permissions: role?.permissions.map(({ id }) => id) ?? [],
      name: role?.name,
      description: '',
    },
  });

  const RegisterRole = useMutation({
    mutationKey: [''],
    mutationFn: rolesHttp.postRoles,
    onSuccess: () => {
      console.log('creado');
      setModalCheckOpen(true);
    },
    onError: () => {
      console.log(RegisterRole.error?.message);
    },
  });

  const EditRole = useMutation({
    mutationKey: [''],
    mutationFn: rolesHttp.patchRoles,
    onSuccess: () => {
      console.log('creado');
      setModalCheckOpen(true);
    },
    onError: () => {
      console.log(RegisterRole.error?.message);
    },
  });

  const { data: getData } = useQuery({
    queryKey: ['permissions'],
    queryFn: permissionsHttp.getPermission,
  });

  const onSubmit = (data: RoleSchema) => {
    if (!role?.id) {
      RegisterRole.mutate({
        name: data.name,
        permissions: data.permissions.map((id) => ({ id })),
      });
    } else {
      EditRole.mutate({
        id: role?.id,
        name: data.name,
        permissions: data.permissions.map((id) => ({ id })),
      });
    }
  };

  return (
    <DialogContent
      onCloseAutoFocus={onClose}
      className='min-w-[529px] max-w-[429px] min-h-[599px] max-h-[700px] rounded-lg bg-green-400 border-none px-0 pt-14 pb-0'
    >
      <div className='absolute flex w-full h-14 items-center justify-center px-20'>
        <DialogTitle className='flex font-bold text-white text-[16px] text-center'>REGISTRAR ROL</DialogTitle>
      </div>
      <div className='relative w-full h-full flex flex-col rounded-b-lg bg-white px-10 py-6'>
        <div className='flex flex-col w-full justify-center space-x-2'>
          <Form {...form}>
            <form className='space-y-4 ' onSubmit={form.handleSubmit(onSubmit)}>
              <div className='flex  flex-col'>
                <Label htmlFor='name' className='text-green-400 font-roboto font-bold h-7 text-[14px]'>
                  NOMBRE
                </Label>
                <Input id='name' className='w-full h-10 rounded-2 font-roboto text-base' {...form.register('name')} />
                {form.formState.errors.name && (
                  <span className='text-red-500'>{form.formState.errors.name.message}</span>
                )}

                <Label htmlFor='description' className='text-green-400 font-roboto font-bold h-7 mt-5 text-[14px]'>
                  DESCRIPCION
                </Label>
                <Input
                  id='description'
                  className='w-full  h-28 rounded-3 font-roboto text-base  '
                  {...form.register('description')}
                />
                {form.formState.errors.description && (
                  <span className='text-red-500'>{form.formState.errors.description.message}</span>
                )}
              </div>
              <Label htmlFor='description' className='text-green-400 font-roboto font-bold h-7 mt-5 text-[14px]'>
                PERMISOS
              </Label>
              <div className='flex flex-col pt-2 w-full h-48'>
                <CardContent className='overflow-auto scrollbar-edit'>
                  <TableBody className='grid grid-cols-2'>
                    {getData &&
                      getData.data.map((permission) => (
                        <TableRow className='border-b-0' key={permission.id}>
                          <TableCell>
                            <div className='flex px-4 w-[218px] '>
                              <FormField
                                control={form.control}
                                name='permissions'
                                render={({ field }) => (
                                  <FormItem>
                                    <Checkbox
                                      checked={field.value.includes(permission.id)}
                                      onCheckedChange={(checked) => {
                                        console.log(checked);
                                        const newValue = field.value;
                                        return checked
                                          ? field.onChange([...newValue, permission.id])
                                          : field.onChange(newValue.filter((perm) => perm !== permission.id));
                                      }}
                                      className='flex text-center justify-center w-[20px] h-[20px] mr-1 border-2 border-green-400'
                                    />
                                  </FormItem>
                                )}
                              />
                              <Label className='text-green-400 font-roboto font-bold h-5 text-[14px] justify-center flex text-center'>
                                {permission.name}
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
                  disabled={RegisterRole.isPending || EditRole.isPending}
                >
                  {role?.id === undefined ? (
                    RegisterRole.isPending ? (
                      <Spinner />
                    ) : (
                      'Guardar'
                    )
                  ) : EditRole.isPending ? (
                    <Spinner />
                  ) : (
                    'Editar'
                  )}
                </Button>

                {modalCheckOpen && (
                  <DialogClose>
                    <AlertCheck
                      title='¡Rol Guardada Exitosamente!'
                      onClose={() => {
                        setModalCheckOpen(false);
                        Recargar();
                      }}
                    />
                  </DialogClose>
                )}

                <DialogClose>
                  <Button className='w-[136px] h-[46px] rounded-[10px]' variant={'btnGray'}>
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
