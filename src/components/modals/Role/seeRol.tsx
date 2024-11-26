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
import LoadingWrapper from 'src/components/wrappers/LoadingWrapper';
import { getLista, Role, User } from 'src/services/api/interface';
import { rolesHttp } from 'src/services/api/role';
import { userHttp } from 'src/services/api/User';

import { AlertCheck } from '../../alerts/alertCheck';
import { Button } from '../../ui/button';
import { Checkbox } from '../../ui/checkbox';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';

import { SeeRoleSchema, seeRoleSchema } from './seeRoleschema';

interface SeeRoles {
  user?: User;
  onClose?: () => void;
  Recargar?: () => void;
  setPage?: (page: number) => void;
}

export function SeeRol({ onClose, Recargar = () => {}, user }: SeeRoles) {
  const { data: getDataUser, isFetching } = useQuery({
    queryKey: [`user-By-ID-${user?.id}`],
    queryFn: () => userHttp.getbyID({ id: user?.id ?? '' }),
  });

  const [page, setPage] = useState(1);
  const {
    data: getData,
    isFetching : isFetchingRoles,
  } = useQuery({
    queryKey: [`${page}`, "3"],
    queryFn: ({ queryKey }) =>
      rolesHttp.getMyRoles({
        page: queryKey[0],
        limit: queryKey[1],
      }),
  });

  return (
    <DialogContent
      onCloseAutoFocus={onClose}
      className='min-w-[529px] max-w-[429px] min-h-[599px] max-h-[700px] rounded-lg bg-green-400 border-none px-0 pt-14 pb-0'
    >
      <div className='absolute flex w-full h-14 items-center justify-center px-20'>
        <DialogTitle className='flex font-bold text-white text-[16px] text-center'>ASIGNAR ROL</DialogTitle>
      </div>
      <div className='relative w-full h-full flex flex-col rounded-b-lg bg-white px-10 py-6'>
        <LoadingWrapper isLoading={isFetching || isFetchingRoles}>
          <RolForm roles={getData} user={getDataUser} Recargar={Recargar} onClose={onClose} setPage={setPage} />
        </LoadingWrapper>
      </div>
    </DialogContent>
  );
}

function RolForm({ user, Recargar, roles, setPage }: SeeRoles & { roles?: getLista<Role> }  ) {
  const [modalCheckOpen, setModalCheckOpen] = useState(false);
  const queryClient = useQueryClient();
  const handleSetPage = setPage || (() => {});

  const form = useForm<SeeRoleSchema>({
    resolver: zodResolver(seeRoleSchema),
    defaultValues: {
      fullName: user?.fullName,
      dni: user?.employeeProfile?.dni,
      role: (user?.roles || []).map(({ id }) => id),
    },
  });

  const AssignRole = useMutation({
    mutationKey: [''],
    mutationFn: userHttp.putAssignRole,
    onSuccess: () => {
      setModalCheckOpen(true);
      queryClient.invalidateQueries({ queryKey: [`user-By-ID-${user?.id}`] });
    },
    onError: () => {
      console.log(AssignRole.error?.message);
    },
  });

  const onSubmit = (data: SeeRoleSchema) => {
    AssignRole.mutate({
      id: user?.id ?? '',
      roleIds: data.role.map((id) => id),
    });
  };

  return (
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
          <Label htmlFor='description' className='text-green-400 font-roboto font-bold h-7 mt-5 text-[14px]'>
            ROLES
          </Label>
          <div className='flex flex-col pt-2 w-full h-48'>
            <CardContent className='overflow-auto scrollbar-edit h-full'>
              <Table containerClassName='h-full'>
                <TableBody className='grid grid-cols-2'>
                  {roles &&
                    roles.data.map((role) => (
                      <TableRow className='border-b-0' key={role.id}>
                        <TableCell>
                          <div className='flex px-4 w-48 '>
                            <FormField
                              control={form.control}
                              name='role'
                              render={({ field }) => (
                                <FormItem>
                                  <Checkbox
                                    checked={field.value.includes(role.id)}
                                    onCheckedChange={(checked) => {
                                      const newValue = field.value;
                                      return checked
                                        ? field.onChange([...newValue, role.id])
                                        : field.onChange(newValue.filter((rol) => rol !== role.id));
                                    }}
                                    className='flex text-center justify-center w-[20px] h-[20px] mr-1 border-2 border-green-400'
                                  />
                                </FormItem>
                              )}
                            />
                            <Label className='text-green-400 font-roboto font-bold h-5 text-[14px] justify-center flex text-center'>
                              {role.name}
                            </Label>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
            <PaginationController totalPages={roles?.totalPages} setPage={handleSetPage} />
          </div>
          <div className='flex flex-row justify-center p-4'>
            <Button
              className='w-[163px] h-[46px] mr-4'
              type='submit'
              variant={'btnGreen'}
              disabled={AssignRole.isPending}
            >
              {AssignRole.isPending ? <Spinner /> : 'Guardar'}
            </Button>

            {modalCheckOpen && (
              <DialogClose>
                <AlertCheck
                  title='¡Rol Guardada Exitosamente!'
                  onClose={() => {
                    setModalCheckOpen(false);
                    if (Recargar) Recargar();
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
  );
}
