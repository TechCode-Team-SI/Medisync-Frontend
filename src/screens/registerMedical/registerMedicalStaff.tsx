/* eslint-disable prettier/prettier */
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { AlertCheck } from 'src/components/alerts/alertCheck';
import { AlertExclamation } from 'src/components/alerts/alertExclamation';
import { UserType } from 'src/components/navbar/userType/userType';
import { Button } from 'src/components/ui/button';
import { Card, CardContent, CardHeader, CardImg, CardTitle } from 'src/components/ui/card';
import { DatePicker } from 'src/components/ui/datepicker';
import { Dialog, DialogTrigger } from 'src/components/ui/dialog';
import { Form, FormControl, FormField, FormItem } from 'src/components/ui/form';
import MedicalStaff from 'src/components/ui/icons/medicalStaff';
import Trash from 'src/components/ui/icons/trash';
import { Input } from 'src/components/ui/input';
import { Label } from 'src/components/ui/label';
import { Loading } from 'src/components/ui/loading';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from 'src/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'src/components/ui/table';
import { AreaHttp } from 'src/services/api/area';
import { registerMedicalHttp } from 'src/services/api/registerMedical';
import { rolesHttp } from 'src/services/api/role';
import { SchedulesHttp } from 'src/services/api/Schedules';

import { demoSchema, DemoSchema } from '../registerMedical/schema';

const Usuario = [
  {
    Nombre: 'Juan Pérez',
    Descripcion: 'Empleado A',
    actualizacion: '2024-08-20 10:00 AM',
  },
  {
    Nombre: 'Emilio Pérez',
    Descripcion: 'Empleado C',
    actualizacion: '2024-08-21 08:00 AM',
  },
  {
    Nombre: 'Andrea Herminia',
    Descripcion: 'Empleado B',
    actualizacion: '2024-08-22 10:00 PM',
  },
];

export function RegisterMedicalStaff() {
  const form = useForm<DemoSchema>({
    resolver: zodResolver(demoSchema),
  });

  const RegisterMedical = useMutation({
    mutationKey: [''],
    mutationFn: registerMedicalHttp.postMedicalStaff,
    onSuccess: () => {
      console.log('creado');
    },
    onError: () => {
      console.log(RegisterMedical.error?.message);
    },
  });
  const onSubmit = (data: DemoSchema) =>
    RegisterMedical.mutate({
      email: data.email,
      fullName: data.fullName,
      password: data.fullName,
      phone: data.phone,
      photo: {
        idPhoto: '',
      },
      roles: [data.roles],
      schedule: {
        idSchedule: data.schedule,
      },
      rooms: {
        idRooms: data.rooms,
      },
      employeeProfile: {
        address: data.address,
        birthday: data.birthday,
        dni: data.dni,
        CML: '',
        MPPS: '',
        gender: data.gender,
      },
    });

  const { data: datalist, isLoading: isLoadingRoles } = useQuery({
    queryKey: ['roles'],
    queryFn: rolesHttp.getRoles,
  });

  const { data: dataSchedules, isLoading: isLoadingSchedules } = useQuery({
    queryKey: ['schedules'],
    queryFn: SchedulesHttp.getSchedule,
  });

  const { data: dataArea, isLoading: isLoadingArea } = useQuery({
    queryKey: ['Area'],
    queryFn: AreaHttp.getArea,
  });

  if (isLoadingSchedules || isLoadingRoles || isLoadingArea) {
    return (
      <div className='w-full h-screen flex justify-center items-center relative'>
        <Loading />
      </div>
    );
  }
  console.log(form.formState.errors);
  return (
    <div className='w-full h-full flex flex-col items-center bg-green-400 relative'>
      <Card className='h-full w-full flex flex-col px-8 sm:px-9 lg:px-10 pt-8 sm:pt-9 lg:pt-10 bg-green-600 border-none rounded-none rounded-l-xl'>
        <Card className='bg-white min-h-[60px] max-h-[60px] w-full mb-4 flex fles-row justify-end items-center px-5 sm:px-10 lg:px-20'>
          <UserType></UserType>
        </Card>
        <Card className='bg-white w-full h-full rounded-b-none overflow-auto scrollbar-edit flex flex-col p-6 pb-0 sm:p-8 sm:pb-0 lg:p-10 lg:pb-0 gap-5'>
          <CardHeader className='w-full flex p-3 flex-col gap-5'>
            <CardTitle className=' text-green-400 font-montserrat font-bold text-[15px] ml-2 text-left'>
              REGISTRAR PERSONAL
            </CardTitle>
          </CardHeader>
          <CardContent className='overflow-auto scrollbar-edit'>
            <Form {...form}>
              <form className='space-y-4 ' onSubmit={form.handleSubmit(onSubmit)}>
                <div className='border-b-green-100/90 border-b-[1px] pb-4 sm:pb-4 lg:pb-4'>
                  <div className='flex flex-row items-start gap-4'>
                    <div className='flex-1'>
                      <div className='space-y-1 mb-2'>
                        <Label htmlFor='email' className='text-green-400 font-roboto font-bold h-32 text-[12px]'>
                          Correo Electrónico
                        </Label>
                        <Input
                          id='email'
                          className='w-full h-8 rounded-none font-roboto text-base'
                          {...form.register('email')}
                        />
                        {form.formState.errors.email && (
                          <span className='text-red-500'>{form.formState.errors.email.message}</span>
                        )}
                      </div>
                      <div className='space-y-1 mb-2'>
                        <Label htmlFor='name' className='text-green-400 font-roboto font-bold h-32 text-[12px]'>
                          Contraseña
                        </Label>
                        <Input
                          id='password'
                          className='w-full h-8 rounded-none font-roboto text-base'
                          {...form.register('password')}
                        />
                        {form.formState.errors.password && (
                          <span className='text-red-500'>{form.formState.errors.password.message}</span>
                        )}
                      </div>
                      <div className='flex space-x-4'>
                        {/* Nombre*/}
                        <div className='space-y-1 mb-2 flex-1'>
                          <Label htmlFor='fullname' className='text-green-400 font-roboto font-bold h-32 text-[12px]'>
                            Nombre Completo
                          </Label>
                          <Input
                            id='fullname'
                            className='w-full h-8 rounded-none font-roboto text-base'
                            {...form.register('fullName')}
                          />
                          {form.formState.errors.fullName && (
                            <span className='text-red-500'>{form.formState.errors.fullName.message}</span>
                          )}
                        </div>
                        {/* Telefono*/}
                        <div className='space-y-1'>
                          <Label className='text-green-400 font-roboto font-bold text-base text-[12px]'>Telefono</Label>
                          <Input
                            id='phone'
                            type='text'
                            className='w-full h-8 rounded-none font-roboto text-base'
                            {...form.register('phone')}
                          />
                          {form.formState.errors.phone && (
                            <span className='text-red-500'>{form.formState.errors.phone.message}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className='flex flex-col items-center justify-between h-[156px] w-[156px] rounded-full bg-green-400 overflow-hidden relative'>
                      <div className='flex-1 flex items-center justify-center'>
                        <CardImg
                          src=''
                          fallback={<MedicalStaff className='h-[115px] w-[100px] fill-current text-white' />}
                          className='w-20 h-20'
                        />
                      </div>
                      <Button
                        variant='btnGreen'
                        type='button'
                        className='bg-black/25 rounded-none font-mono text-[13px] hover:bg-black/15 w-full text-center'
                      >
                        Editar Foto
                      </Button>
                    </div>
                  </div>
                  <div className='flex space-x-4'>
                    <div className='space-y-1 flex-1'>
                      <Label className='text-green-400 font-roboto font-bold text-base text-[12px]'>Cédula</Label>
                      <Input
                        id='dni'
                        type='text'
                        className='w-full h-8 rounded-none font-roboto text-base'
                        {...form.register('dni')}
                      />
                      {form.formState.errors.dni && (
                        <span className='text-red-500'>{form.formState.errors.dni.message}</span>
                      )}
                    </div>
                    <div className='space-y-1 w-full flex-1'>
                      <Label className='text-green-400 font-roboto font-bold text-base'>Género</Label>
                      <FormField
                        control={form.control}
                        name='gender'
                        render={({ field }) => (
                          <FormItem>
                            <Select {...field} onValueChange={(value) => field.onChange(value)}>
                              <SelectTrigger
                                id='gender'
                                className='h-8 rounded-none text-green-400 font-roboto font-bold text-base text-[12px] '
                              >
                                <SelectValue placeholder='Seleccione el Género' />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Género</SelectLabel>
                                  <SelectItem value='Masculino'>Masculino</SelectItem>
                                  <SelectItem value='Femenino'>Femenino</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                      {form.formState.errors.gender && (
                        <span className='text-red-500'>{form.formState.errors.gender.message}</span>
                      )}
                    </div>
                    {/* fecha de nacimiento */}
                    <div className='space-y-1  '>
                      <Label id='birthday' className='text-green-400 font-roboto font-bold text-base text-[13px]'>
                        Fecha de Nacimiento
                      </Label>
                      <FormField
                        control={form.control}
                        name='birthday'
                        render={({ field: { ...birthday } }) => (
                          <FormItem className='flex items-center gap-4'>
                            <FormControl>
                              <DatePicker initialDate={birthday.value} onChange={birthday.onChange} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      {form.formState.errors.birthday && (
                        <span className='text-red-500'>{form.formState.errors.birthday.message}</span>
                      )}
                    </div>
                  </div>
                  <div className='space-y-1 mb-2'>
                    <Label htmlFor='address' className='text-green-400 font-roboto font-bold h-32 text-[12px]'>
                      Dirección
                    </Label>
                    <Input
                      id='address'
                      className='w-full h-8 rounded-none font-roboto text-base'
                      {...form.register('address')}
                    />
                    {form.formState.errors.address && (
                      <span className='text-red-500'>{form.formState.errors.address.message}</span>
                    )}
                  </div>
                  <div className='flex gap-4'>
                    <div className='space-y-1 w-full flex-1'>
                      {/* Lugar de trabajo*/}

                      <div className='space-y-1  flex-1 mt-2 '>
                        <Label className='text-green-400 font-roboto font-bold text-base text-[14px] relative'>
                          LUGAR DE TRABAJO
                        </Label>
                        <div className='space-y-1 w-full flex-1'>
                          <Label className='text-green-400 font-roboto font-bold text-base'>Area</Label>
                          <FormField
                            control={form.control}
                            name='rooms'
                            render={({ field }) => (
                              <FormItem>
                                <Select {...field} onValueChange={(value) => field.onChange(value)}>
                                  <SelectTrigger
                                    id='rooms'
                                    className='h-8 rounded-none text-green-400 font-roboto font-bold text-base text-[12px] '
                                  >
                                    <SelectValue placeholder='Seleccione el Area' />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectGroup>
                                      <SelectLabel>Area</SelectLabel>
                                      {dataArea?.data.map((Area) => (
                                        <SelectItem key={Area.id} value={Area.id}>
                                          {Area.name}
                                        </SelectItem>
                                      ))}
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
                              </FormItem>
                            )}
                          />
                          {form.formState.errors.rooms && (
                            <span className='text-red-500'>{form.formState.errors.rooms.message}</span>
                          )}
                        </div>
                      </div>
                      <div className='space-y-1 w-full flex-1'>
                        <Label className='text-green-400 font-roboto font-bold text-base'>Horario</Label>
                        <FormField
                          control={form.control}
                          name='schedule'
                          render={({ field }) => (
                            <FormItem>
                              <Select {...field} onValueChange={(value) => field.onChange(value)}>
                                <SelectTrigger
                                  id='schedule'
                                  className='h-8 rounded-none text-green-400 font-roboto font-bold text-base text-[12px] '
                                >
                                  <SelectValue placeholder='Seleccione el Horario' />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>Horario</SelectLabel>
                                    {dataSchedules?.data.map((Schedules) => (
                                      <SelectItem key={Schedules.id} value={Schedules.id}>
                                        {Schedules.name}
                                      </SelectItem>
                                    ))}
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </FormItem>
                          )}
                        />
                        {form.formState.errors.schedule && (
                          <span className='text-red-500'>{form.formState.errors.schedule.message}</span>
                        )}
                      </div>
                    </div>
                    {/* Permisos*/}
                    <div className='space-y-1 w-full flex-1'>
                      <Label className='text-green-400 font-roboto font-bold text-base'>Roles</Label>
                      <FormField
                        control={form.control}
                        name='roles'
                        render={({ field }) => (
                          <FormItem>
                            <Select {...field} onValueChange={(value) => field.onChange(value)}>
                              <SelectTrigger
                                id='roles'
                                className='h-8 rounded-none text-green-400 font-roboto font-bold text-base text-[12px] '
                              >
                                <SelectValue placeholder='Seleccione el Rol' />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Roles</SelectLabel>
                                  {datalist?.data.map((roles) => (
                                    <SelectItem key={roles.id} value={roles.id}>
                                      {roles.name}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                      {form.formState.errors.roles && (
                        <span className='text-red-500'>{form.formState.errors.roles.message}</span>
                      )}
                    </div>
                  </div>
                </div>
                <CardContent className='h-full w-full  overflow-auto scrollbar-edit '>
                  <CardHeader className='w-full flex  flex-col gap-5 p-0'>
                    <CardTitle className=' text-green-400 font-montserrat font-bold text-[18px] text-left'>
                      DATOS DEL PERSONAL
                    </CardTitle>
                    <CardTitle className=' text-black font-montserrat font-bold text-[18px] text-left'>
                      ESPECIALIDADES
                    </CardTitle>
                  </CardHeader>
                  <Table className='min-w-full text-sm'>
                    <TableHeader className='border-b-8 border-white bg-green-500   text-white'>
                      <TableRow className='hover:bg-green-500'>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Descripcion</TableHead>
                        <TableHead>Ultima actualizacion</TableHead>
                        <TableHead>Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody className='h-[35px]'>
                      {Usuario.map((usuario) => (
                        <TableRow
                          className='bg-green-600 border-b-2 border-white text-black font-roboto'
                          key={usuario.Nombre}
                        >
                          <TableCell>{usuario.Nombre}</TableCell>
                          <TableCell>{usuario.Descripcion}</TableCell>
                          <TableCell>{usuario.actualizacion}</TableCell>
                          <TableCell className='flex justify-center items-center'>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button className='bg-transparent hover:bg-transparent'>
                                  <Trash className='fill-current text-green-400 h-4 w-4' />
                                </Button>
                              </DialogTrigger>
                              <AlertExclamation title='¿Desea Eliminar la especialidad?' />
                            </Dialog>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <div className='mt-1 w-full flex flex-row-reverse pb-4 pt-2'>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className='h-[25px] w-24 font-montserrat text-xs' variant='btnGreen' type='submit'>
                          Añadir
                        </Button>
                      </DialogTrigger>
                      <AlertCheck title='Añadido con Exito!' />
                    </Dialog>
                  </div>
                </CardContent>
              </form>
            </Form>
          </CardContent>
        </Card>
      </Card>
    </div>
  );
}
