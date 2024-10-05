import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';

import { AlertCheck } from 'src/components/alerts/alertCheck';
import { AlertExclamation } from 'src/components/alerts/alertExclamation';
import { UserType } from 'src/components/navbar/userType/userType';
import { Button } from 'src/components/ui/button';
import { Card, CardContent, CardImg, CardTitle } from 'src/components/ui/card';
import { DatePicker } from 'src/components/ui/datepicker';
import { Dialog, DialogTrigger } from 'src/components/ui/dialog';
import { Form, FormControl, FormField, FormItem } from 'src/components/ui/form';
import MedicalStaff from 'src/components/ui/icons/medicalStaff';
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
import { userHttp } from 'src/services/api/User';
import { useSessionStore } from 'src/store/sessionStore';

import { CreateReferenceSchema, createReferenceSchema } from './schema';

export function CreateUser() {
  const { session } = useSessionStore();
  const form = useForm<CreateReferenceSchema>({
    resolver: zodResolver(createReferenceSchema),
  });
  const onSubmit = async (data: CreateReferenceSchema) => {
    console.log('ejecutando esperate');
    const dataOrdered = {
      email: data.email,
      password: data.password,
      fullName: data.name,
      employeeProfile: {
        address: data.address,
        birthday: new Date(data.birthday),
        dni: data.dni,
        CML: data.CML,
        MPPS: data.MPPS,
        gender: data.gender,
      },
    };
    console.log(dataOrdered.employeeProfile.gender);
    if (data.password === data.password2) {
      const resp = await userHttp.post(dataOrdered, session!.token);
    } else {
      <AlertExclamation title={'La Contraseña No Es Correcta'}></AlertExclamation>;
    }
  };

  return (
    <div className='w-full h-full flex flex-row items-center bg-green-400 relative'>
      <Card className='h-full w-full flex flex-col px-8 sm:px-9 lg:px-10 pt-8 sm:pt-9 lg:pt-10 bg-green-600 border-none rounded-none rounded-l-xl'>
        <Card className='bg-white min-h-[60px] max-h-[60px] w-full mb-4 flex fles-row justify-end items-center px-5 sm:px-10 lg:px-20'>
          <UserType />
        </Card>
        <Card className='bg-white w-full h-full overflow-auto flex flex-col p-6 sm:p-8 lg:p-10 gap-5'>
          <CardTitle className=' text-green-400 font-montserrat font-bold text-[18px] text-left'>
            REGISTRAR PERSONAL
          </CardTitle>
          <CardContent className='overflow-auto scrollbar-edit'>
            <Form {...form}>
              <form className='space-y-4 ' onSubmit={form.handleSubmit(onSubmit)}>
                <div className='border-b-green-100/90 border-b-[1px] pb-8 sm:pb-9 lg:pb-10'>
                  <div className='flex flex-row items-start gap-4'>
                    <div className='flex-1 space-y-5'>
                      <div className='space-y-1'>
                        <Label htmlFor='name' className='text-green-400 font-roboto font-bold text-base'>
                          Nombre Completo
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

                      <div className='flex gap-4 mt-4'>
                        <div className='space-y-1 flex-1'>
                          <Label className='text-green-400 font-roboto font-bold text-base'>Cédula</Label>
                          <Input
                            id='dni'
                            {...form.register('dni')}
                            type='text'
                            className='w-full h-8 rounded-none font-roboto text-base'
                          />
                          {form.formState.errors.dni && (
                            <span className='text-red-500'>{form.formState.errors.dni.message}</span>
                          )}
                        </div>
                        <div className='space-y-1 flex-1'>
                          <Label className='text-green-400 font-roboto font-bold text-base'>MPPS</Label>
                          <Input
                            id='MPPS'
                            {...form.register('MPPS')}
                            type='text'
                            className='w-full h-8 rounded-none font-roboto text-base'
                          />
                          {form.formState.errors.MPPS && (
                            <span className='text-red-500'>{form.formState.errors.MPPS.message}</span>
                          )}
                        </div>
                      </div>
                      <div className='space-y-1'>
                        <Label htmlFor='name' className='text-green-400 font-roboto font-bold text-base'>
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
                        Subir Foto
                      </Button>
                    </div>
                  </div>
                  <div className='flex gap-4 my-4'>
                    <div className='space-y-1 w-full flex-1'>
                      <Label className='text-green-400 font-roboto font-bold text-base'>CML</Label>
                      <Input
                        id='CML'
                        {...form.register('CML')}
                        type='text'
                        className='w-full h-8 rounded-none font-roboto text-base'
                      />
                      {form.formState.errors.CML && (
                        <span className='text-red-500'>{form.formState.errors.CML.message}</span>
                      )}
                    </div>
                    <div className='space-y-1 w-full flex-1'>
                      <Label className='text-green-400 font-roboto font-bold text-base'>Fecha de Nacimiento</Label>
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
                      {form.formState.errors.birthday && (
                        <span className='text-red-500'>{form.formState.errors.birthday.message}</span>
                      )}
                    </div>
                  </div>
                  <div className='flex gap-4 my-4'>
                    <div className='space-y-1 w-full flex-1'>
                      <Label className='text-green-400 font-roboto font-bold text-base'>Género</Label>
                      <FormField
                        control={form.control}
                        name='gender'
                        render={({ field }) => (
                          <FormItem>
                            <Select {...field} onValueChange={(value) => field.onChange(value)}>
                              <SelectTrigger id='gender' className='w-full h-8 rounded-none font-roboto text-base'>
                                <SelectValue placeholder='Seleccione el Género' />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Género</SelectLabel>
                                  <SelectItem value='M'>M</SelectItem>
                                  <SelectItem value='F'>F</SelectItem>
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
                    <div className='space-y-1 w-full flex-1'>
                      <Label className='text-green-400 font-roboto font-bold text-base'>Telefono</Label>
                      <Input
                        id='phone'
                        {...form.register('phone')}
                        type='text'
                        className='w-full h-8 rounded-none font-roboto text-base'
                      />
                      {form.formState.errors.phone && (
                        <span className='text-red-500'>{form.formState.errors.phone.message}</span>
                      )}
                    </div>
                  </div>
                  <div className='flex gap-4 my-4'>
                    <div className='space-y-1 w-full flex-1'>
                      <Label htmlFor='email' className='text-green-400 font-roboto font-bold text-base'>
                        Correo
                      </Label>
                      <Input
                        id='email'
                        {...form.register('email')}
                        type='email'
                        className='w-full h-8 rounded-none font-roboto text-base'
                      />
                      {form.formState.errors.email && (
                        <span className='text-red-500'>{form.formState.errors.email.message}</span>
                      )}
                    </div>
                    <div className='space-y-1 w-full flex-1'>
                      <Label className='text-green-400 font-roboto font-bold text-base'>Estatus</Label>
                      <Input
                        id='status'
                        {...form.register('status')}
                        type='text'
                        readOnly
                        className='w-full h-8 rounded-none'
                      />
                      {form.formState.errors.status && (
                        <span className='text-red-500'>{form.formState.errors.status.message}</span>
                      )}
                    </div>
                  </div>
                  <div className='flex gap-4'>
                    <div className='space-y-1 w-full flex-1'>
                      <Label className='text-green-400 font-roboto font-bold text-base'>Contraseña</Label>
                      <Input
                        id='password'
                        {...form.register('password')}
                        type='text'
                        className='w-full h-8 rounded-none font-roboto text-base'
                      />
                      {form.formState.errors.password && (
                        <span className='text-red-500'>{form.formState.errors.password.message}</span>
                      )}
                    </div>
                    <div className='space-y-1 w-full flex-1'>
                      <Label className='text-green-400 font-roboto font-bold text-base'>Repetir Contraseña</Label>
                      <Input
                        id='password2'
                        {...form.register('password2')}
                        type='text'
                        className='w-full h-8 rounded-none'
                      />
                      {form.formState.errors.password2 && (
                        <span className='text-red-500'>{form.formState.errors.password2.message}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className='mt-1 w-full flex flex-row justify-center space-x-8'>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant='btnGreen' className='' type='submit'>
                        Crear
                      </Button>
                    </DialogTrigger>
                    <AlertCheck title={'Usuario Registrado Correctamente'} />
                  </Dialog>

                  <Button variant='btnGray' className=''>
                    Volver
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </Card>
    </div>
  );
}
