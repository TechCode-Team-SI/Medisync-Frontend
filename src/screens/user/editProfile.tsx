import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { UserType } from 'src/components/navbar/userType/userType';
import { Button } from 'src/components/ui/button';
import { Card, CardContent, CardImg, CardTitle } from 'src/components/ui/card';
import { DatePicker } from 'src/components/ui/datepicker';
import { Form, FormControl, FormField, FormItem } from 'src/components/ui/form';
import MedicalStaff from 'src/components/ui/icons/medicalStaff';
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
import { paths } from 'src/paths';
import { userHttp } from 'src/services/api/User';
import { useSessionStore } from 'src/store/sessionStore';

import { CreateReferenceSchema, createReferenceSchema } from './schema';

export function EditProfile() {
  const { user } = useSessionStore();
  const userdata = user();
  const navigate = useNavigate();

  const form = useForm<CreateReferenceSchema>({
    resolver: zodResolver(createReferenceSchema),
    defaultValues: {
      fullName: userdata?.fullName,
      dni: userdata?.employeeProfile?.dni,
      MPPS: userdata?.employeeProfile?.MPPS,
      CML: userdata?.employeeProfile?.CML,
      gender: userdata?.employeeProfile?.gender,
      birthday: userdata?.employeeProfile?.birthday,
      phone: userdata?.phone,
      email: userdata?.email,
      address: userdata?.employeeProfile?.address,
    },
  });
  const EditUser = useMutation({
    mutationKey: [''],
    mutationFn: userHttp.patchUser,
    onSuccess: () => {
      console.log('creado');
      navigate(paths.editProfile);
      toast.success('Usuario Editado Correctamente');
    },
    onError: (error) => {
      console.log(error);
      toast.success('No se Edito Correctamente el Usuario');
    },
  });

  const onSubmit = (data: CreateReferenceSchema) => {
    console.log(data);
    console.log(form.formState.errors);

    EditUser.mutate({
      id: userdata?.id || '',
      email: data.email,
      fullName: data.fullName,
      phone: data.phone ?? '',
      employeeProfile: {
        id: userdata?.employeeProfile?.id || '',
        address: data.address,
        birthday: data.birthday.toISOString(),
        dni: data.dni,
        CML: data.CML ?? '',
        MPPS: data.MPPS ?? '',
        gender: data.gender,
      },
    });
  };

  if (EditUser.isPending) {
    return (
      <div className='w-full h-screen flex justify-center items-center relative'>
        <Loading />
      </div>
    );
  }
  return (
    <div className='w-full h-full flex flex-row items-center bg-green-400 relative'>
      <Card className='h-full w-full flex flex-col px-8 sm:px-9 lg:px-10 pt-8 sm:pt-9 lg:pt-10 bg-green-600 border-none rounded-none rounded-l-xl'>
        <Card className='bg-white min-h-[60px] max-h-[60px] w-full mb-4 flex fles-row justify-end items-center px-5 sm:px-10 lg:px-20'>
          <UserType />
        </Card>
        <Card className='bg-white w-full h-full overflow-auto flex flex-col p-6 sm:p-8 lg:p-10 gap-5'>
          <CardTitle className=' text-green-400 font-montserrat font-bold text-[18px] text-left'>
            VER PERSONAL
          </CardTitle>
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
                            <Select
                              {...field}
                              onValueChange={(value) => field.onChange(value)}
                              value={field.value ?? ''}
                            >
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
                      {form.formState.errors.dni && (
                        <span className='text-red-500'>{form.formState.errors.dni.message}</span>
                      )}
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

                  <div className='space-y-4'>
                    {/* Mostrar el formulario si es médico */}
                    {userdata?.employeeProfile?.isMedic && (
                      <div className='flex gap-4 mt-2'>
                        <div className='space-y-1 w-full flex-1'>
                          <Label className='text-green-400 font-roboto font-bold text-base text-[12px]'>CML</Label>
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
                </div>
                <CardContent className='h-full w-full  overflow-auto scrollbar-edit '>
                  <div className='mt-1 w-full flex flex-row justify-center items-center pb-4 pt-2 space-x-5'>
                    <Button variant='btnGray' type='button' onClick={() => navigate(-1)}>
                      Volver
                    </Button>
                    <Button variant='btnGreen' type='submit'>
                      Guardar
                    </Button>
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
