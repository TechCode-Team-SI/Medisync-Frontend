/* eslint-disable prettier/prettier */
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { AlertCheck } from 'src/components/alerts/alertCheck';
import { Button } from 'src/components/ui/button';
import { CardContent, CardImg } from 'src/components/ui/card';
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
import { Switch } from 'src/components/ui/switch';
import { paths } from 'src/paths';
import { User } from 'src/services/api/interface';
import { registerMedicalHttp } from 'src/services/api/registerMedical';

import { demoSchema, DemoSchema } from './schema';

interface MedicalStaffFormProps {
  defaultMedicalStaff: User | null;
}

export function MedicalStaffFrom({ defaultMedicalStaff }: MedicalStaffFormProps) {
  const navigate = useNavigate();
  const form = useForm<DemoSchema>({
    resolver: zodResolver(demoSchema),
    defaultValues: defaultMedicalStaff
      ? {
          address: defaultMedicalStaff.employeeProfile?.address ?? null,
          birthday: defaultMedicalStaff.employeeProfile?.birthday,
          CML: defaultMedicalStaff.employeeProfile?.CML,
          dni: defaultMedicalStaff.employeeProfile?.dni ?? null,
          email: defaultMedicalStaff.email ?? null,
          fullName: defaultMedicalStaff.fullName ?? null,
          gender: defaultMedicalStaff.employeeProfile?.gender ?? null,
          MPPS: defaultMedicalStaff.employeeProfile?.MPPS,
          password: '',
          phone: defaultMedicalStaff.phone ?? null,
          isMedic: defaultMedicalStaff.employeeProfile?.isMedic,
        }
      : {},
  });

  const formWatch = useWatch({ control: form.control });

  const EditMedical = useMutation({
    mutationKey: [''],
    mutationFn: registerMedicalHttp.pachtMedicalStaff,
    onSuccess: () => {
      console.log('Editado');
      navigate(paths.editmedical);
      toast.success('Usuario Editado Correctamente');
    },
    onError: () => {
      console.log(EditMedical.error);
      toast.success('No se Edito Correctamente el Usuario');
    },
  });

  const RegisterMedical = useMutation({
    mutationKey: [''],
    mutationFn: registerMedicalHttp.postMedicalStaff,
    onSuccess: () => {
      console.log('creado');
      navigate(paths.registermedical);
    },
    onError: () => {
      console.log(RegisterMedical.error);
    },
  });
  console.log(formWatch);

  const onSubmit = (data: DemoSchema) => {
    if (defaultMedicalStaff?.id) {
      console.log(data);
      EditMedical.mutate({
        id: defaultMedicalStaff?.id || '',
        email: data.email,
        fullName: data.fullName,
        password: data.password,
        phone: data.phone,
        employeeProfile: {
          id: defaultMedicalStaff?.employeeProfile?.id || '',
          address: data.address,
          birthday: data.birthday.toISOString(),
          dni: data.dni,
          CML: data.CML,
          MPPS: data.MPPS,
          gender: data.gender,
          isMedic: data.isMedic,
        },
      });
    } else {
      console.log(data);

      RegisterMedical.mutate({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
        phone: data.phone,
        employeeProfile: {
          address: data.address,
          birthday: data.birthday.toISOString(),
          dni: data.dni,
          CML: data.CML,
          MPPS: data.MPPS,
          gender: data.gender,
          isMedic: data.isMedic,
        },
      });
    }
  };

  return (
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
            <div className='space-y-1 w-[280px]'>
              <Label className='text-green-400 font-roboto font-bold text-base text-[12px]'>Género</Label>
              <FormField
                control={form.control}
                name='gender'
                render={({ field }) => (
                  <FormItem>
                    <Select {...field} onValueChange={(value) => field.onChange(value)} value={field.value ?? ''}>
                      <SelectTrigger
                        id='gender'
                        className='h-8 rounded-none text-green-400 font-roboto font-bold text-base text-[12px] '
                      >
                        <SelectValue placeholder='Seleccione el Género' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Género</SelectLabel>
                          <SelectItem value='M'>Masculino</SelectItem>
                          <SelectItem value='F'>Femenino</SelectItem>
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
            <div className='space-y-1 flex-grow'>
              <Label className='text-green-400 font-roboto font-bold text-base text-[12px]'>Cédula</Label>
              <Input
                id='dni'
                type='text'
                className='w-full h-8 rounded-none font-roboto text-base'
                {...form.register('dni')}
              />
              {form.formState.errors.dni && <span className='text-red-500'>{form.formState.errors.dni.message}</span>}
            </div>
          </div>
          <div className='flex space-x-4 mt-2'>
            {/* fecha de nacimiento */}
            <div className='space-y-1 '>
              <Label id='birthday' className='text-green-400 font-roboto font-bold text-base text-[12px]'>
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
            {/* Telefono*/}
            <div className='space-y-1 flex-grow'>
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

          <div className='flex items-center w-full gap-2 mt-3'>
            <Label className='text-green-400 font-roboto font-bold text-base text-[12px]'>Es Médico?</Label>
            <FormField
              control={form.control}
              name='isMedic'
              render={({ field }) => (
                <FormItem>
                  <Switch checked={Boolean(field.value)} onCheckedChange={field.onChange} />
                </FormItem>
              )}
            />
          </div>

          {formWatch.isMedic && (
            <div className='flex gap-4 mt-2'>
              <div className='space-y-1 w-full flex-1'>
                <Label className='text-green-400 font-roboto font-bold text-base text-[12px]'>CML</Label>
                <Input
                  id='CML'
                  {...form.register('CML')}
                  type='text'
                  className='w-full h-8 rounded-none font-roboto text-base'
                />
                {form.formState.errors.CML && <span className='text-red-500'>{form.formState.errors.CML.message}</span>}
              </div>
              <div className='space-y-1 flex-1'>
                <Label className='text-green-400 font-roboto font-bold text-base text-[12px]'>MPPS</Label>
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
          )}

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
        </div>
        <CardContent className='h-full w-full  overflow-auto scrollbar-edit '>
          <div className='mt-1 w-full flex flex-row justify-center items-center pb-4 pt-2 space-x-5'>
            <Button variant='btnGray' type='button' onClick={() => navigate(-1)}>
              Volver
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant='btnGreen' type='submit'>
                  Guardar
                </Button>
              </DialogTrigger>
              <AlertCheck title='Añadido con Exito!' />
            </Dialog>
          </div>
        </CardContent>
      </form>
    </Form>
  );
}
