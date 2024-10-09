/* eslint-disable prettier/prettier */
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { AlertCheck } from 'src/components/alerts/alertCheck';
import { AlertExclamation } from 'src/components/alerts/alertExclamation';
import { ModalSelection } from 'src/components/modals/modalSelection';
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
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from 'src/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'src/components/ui/table';

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

  const onSubmit = (data: DemoSchema) => {
    console.log(data);
  };

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
                      {/* nombre */}
                      <div className='space-y-1'>
                        <Label htmlFor='name' className='text-green-400 font-roboto font-bold h-32 text-[12px]'>
                          Nombre
                        </Label>
                        <Input
                          id='name'
                          className='w-full h-8 rounded-none font-roboto text-base'
                          {...form.register('name')}
                        />
                        {form.formState.errors.name && (
                          <span className='text-red-500'>{form.formState.errors.name.message}</span>
                        )}
                      </div>
                      {/* Apellido */}
                      <div className='space-y-1'>
                        <Label htmlFor='lastName' className='text-green-400 font-roboto font-bold h-32 text-[12px]'>
                          Apellido
                        </Label>
                        <Input
                          id='lastName'
                          className='w-full h-8 rounded-none font-roboto text-base'
                          {...form.register('lastName')}
                        />
                        {form.formState.errors.lastName && (
                          <span className='text-red-500'>{form.formState.errors.lastName.message}</span>
                        )}
                      </div>
                      {/* cedula*/}
                      <div className='flex gap-4'>
                        <div className='space-y-1 flex-1'>
                          <Label className='text-green-400 font-roboto font-bold text-base text-[12px]'>Cédula</Label>
                          <Input type='text' className='w-full h-8 rounded-none font-roboto text-base' />
                          {form.formState.errors.identification && (
                            <span className='text-red-500'>{form.formState.errors.identification.message}</span>
                          )}
                        </div>
                        {/* fecha de nacimiento */}
                        <div className='space-y-1  '>
                          <Label className='text-green-400 font-roboto font-bold text-base text-[13px]'>
                            Fecha de Nacimiento
                          </Label>
                          <FormField
                            control={form.control}
                            name='birthday'
                            render={({ field: { ...field } }) => (
                              <FormItem className='flex items-center gap-4'>
                                <FormControl>
                                  <DatePicker initialDate={field.value} onChange={field.onChange} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          {form.formState.errors.field && (
                            <span className='text-red-500'>{form.formState.errors.field.message}</span>
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
                  <div className='flex gap-4'>
                    {/* Genero*/}
                    <div className='space-y-1 w-full flex-1'>
                      <Label className='text-green-400 font-roboto font-bold text-base text-[12px]'>Genero</Label>
                      <Select>
                        <SelectTrigger className='h-8 rounded-none text-green-400 font-roboto font-bold text-base text-[12px] '>
                          <SelectValue placeholder='Seleccione' />
                        </SelectTrigger>
                        <SelectContent className='text-green-400 font-roboto font-bold text-base text-[12px]'>
                          <SelectGroup className='text-green-400 font-roboto font-bold text-base text-[12px]'>
                            <SelectItem value='1'>Masculino</SelectItem>
                            <SelectItem value='2'>Femenino</SelectItem>
                            <SelectItem value='3'>Gabriel</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    {/* Edad*/}
                    <div className='space-y-1 flex-1'>
                      <Label className='text-green-400 font-roboto font-bold text-base text-[12px]'>Edad</Label>
                      <Input
                        type='text'
                        readOnly
                        className='w-full h-8 rounded-none font-roboto text-base disabled:opacity-80'
                      />
                    </div>
                  </div>
                  {/* Correo*/}
                  <div className='flex gap-4'>
                    <div className='space-y-1 w-full flex-1'>
                      <Label htmlFor='email' className='text-green-400 font-roboto font-bold text-base text-[12px]'>
                        Correo
                      </Label>
                      <Input id='email' type='email' className='w-full h-8 rounded-none font-roboto text-base' />
                      {form.formState.errors.email && (
                        <span className='text-red-500'>{form.formState.errors.email.message}</span>
                      )}
                    </div>
                    {/* Telefono*/}
                    <div className='space-y-1 w-full flex-1'>
                      <Label className='text-green-400 font-roboto font-bold text-base text-[12px]'>Telefono</Label>
                      <Input type='text' className='w-full h-8 rounded-none font-roboto text-base' />
                      {form.formState.errors.field && (
                        <span className='text-red-500'>{form.formState.errors.field.message}</span>
                      )}
                    </div>
                  </div>
                  <div className='flex gap-4'>
                    {/* Estatus*/}
                    <div className='space-y-1 w-full flex-1'>
                      <Label className='text-green-400 font-roboto font-bold text-base text-[12px]'>Estatus</Label>
                      <Input type='text' className='w-full h-8 rounded-none' />
                      {form.formState.errors.field && (
                        <span className='text-red-500'>{form.formState.errors.field.message}</span>
                      )}

                      {/* Lugar de trabajo*/}

                      <div className='space-y-1  flex-1 '>
                        <Label className='text-green-400 font-roboto font-bold text-base text-[14px] relative  '>
                          LUGAR DE TRABAJO
                        </Label>
                        {/*Area*/}
                        <div className=' '>
                          <Label className='text-green-400 font-roboto font-bold text-base text-[12px]'>Area</Label>
                          <div className='space-y-1 flex-row gap-4 flex w-full'>
                            <Input
                              type='text'
                              placeholder=''
                              className='w-full h-8 rounded-none text-green-400 font-roboto font-bold text-base text-[12px]'
                            />
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  className='flex items-center rounded-[5px]  justify-center w-[146px] h-[23px] text-[10px]'
                                  variant='btnGreen'
                                >
                                  Seleccionar Area
                                </Button>
                              </DialogTrigger>
                              <ModalSelection />
                            </Dialog>
                          </div>
                        </div>
                      </div>
                      {/* Horario*/}
                      <div className='space-y-1  flex-1 '>
                        <div className=' '>
                          <Label className='text-green-400 font-roboto font-bold text-base text-[12px]'>Horario</Label>
                          <div className='space-y-1 flex-row gap-4 flex w-full'>
                            <Input
                              type='text'
                              placeholder=''
                              className='w-full h-8 rounded-none text-green-400 font-roboto font-bold text-base text-[12px]'
                            />

                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  className='flex items-center rounded-[5px]  justify-center w-[146px] h-[23px] text-[10px]'
                                  variant='btnGreen'
                                >
                                  Seleccionar Horario
                                </Button>
                              </DialogTrigger>
                              <ModalSelection />
                            </Dialog>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Permisos*/}
                    <div className='space-y-1 w-full flex-1 gap-4 '>
                      <Label className='text-green-400 font-roboto font-bold text-base text-[12px]'>Permisos</Label>
                      <Input
                        type='text'
                        placeholder='Rol 1'
                        className='w-full h-8 rounded-none text-green-400 font-roboto font-bold text-base text-[12px]'
                      />
                      <Input
                        type='text'
                        placeholder='Rol 2'
                        className='w-full h-8 rounded-none text-green-400 font-roboto font-bold text-base text-[12px]'
                      />
                      <div className='flex items-center justify-center pt-1'>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              className='flex items-center rounded-[5px]  justify-center w-[146px] h-[23px] text-[10px]'
                              variant='btnGreen'
                            >
                              Seleccionar Roles
                            </Button>
                          </DialogTrigger>
                          <ModalSelection />
                        </Dialog>
                      </div>
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
                        <Button className='h-[25px] w-24 font-montserrat text-xs' variant='btnGreen'>
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
