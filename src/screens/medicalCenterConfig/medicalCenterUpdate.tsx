import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { SearchNav } from 'src/components/navbar/search/search';
import { UserType } from 'src/components/navbar/userType/userType';
import { Button } from 'src/components/ui/button';
import { CardTitle } from 'src/components/ui/card';
import { Form } from 'src/components/ui/form';
import { Input } from 'src/components/ui/input';
import { Label } from 'src/components/ui/label';
import { Loading } from 'src/components/ui/loading';
import { TextArea } from 'src/components/ui/textArea';
import { paths } from 'src/paths';
import { centerConfigHttp } from 'src/services/api/CenterConfig';

import { centerConfigSchema } from './schema';

export function MedicalCenterUpdate() {
  const navigate = useNavigate();

  const { data: getData, isLoading } = useQuery({
    queryKey: [''],
    queryFn: centerConfigHttp.get,
  });
  const form = useForm<centerConfigSchema>({
    resolver: zodResolver(centerConfigSchema),
    defaultValues: {
      name: getData?.name,
      address: getData?.address,
      state: getData?.state,
      municipality: getData?.municipality,
      parish: getData?.parish,
      localPhone: getData?.localPhone,
      mobilePhone: getData?.mobilePhone,
      mission: getData?.mission,
      vision: getData?.vision,
    },
  });

  const CenterConfigInstallation = useMutation({
    mutationKey: [''],
    mutationFn: centerConfigHttp.patch,
    onSuccess: () => {
      navigate(paths.medicalCenterUpdate);
    },
    onError: () => {
      console.log('no funciono');
    },
  });

  const onSubmit = (data: centerConfigSchema) => CenterConfigInstallation.mutate(data);

  if (isLoading || CenterConfigInstallation.isPending) {
    return (
      <div className='w-full h-screen flex justify-center items-center relative'>
        <Loading />
      </div>
    );
  }
  return (
    <div className='bg-green-400 w-full h-full flex flex-row items-center relative'>
      <div className='h-full w-full p-10 bg-green-600 border-none rounded-none rounded-l-xl'>
        <div className='bg-white min-h-[60px] max-h-[60px] w-full mb-4 flex fles-row justify-end items-center px-5 sm:px-10 lg:px-20'>
          <SearchNav />
          <UserType />
        </div>
        <div className='bg-white w-full h-full overflow-y-auto scrollbar-edit flex flex-col shadow-lg rounded-t-3xl px-6 py-4'>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='relative z-10 w-full max-w-full flex flex-col items-center'
            >
              <CardTitle className=' text-green-400 font-montserrat font-bold text-[18px] text-center'>
                INFORMACIÓN CENTRO MÉDICO
              </CardTitle>
              <div className='w-full h-full px-2 space-y-2 m-3'>
                <div className='w-full flex-1'>
                  <Label className='text-[12px]'>Nombre</Label>
                  <Input id='name' {...form.register('name')} className='h-8 rounded-none' />
                  {form.formState.errors.name && (
                    <span className='text-red-500'>{form.formState.errors.name.message}</span>
                  )}
                </div>
                <div className='w-full flex-1'>
                  <Label className='text-[12px]'>Dirección</Label>
                  <Input id='address' {...form.register('address')} className='h-8 rounded-none' />
                  {form.formState.errors.address && (
                    <span className='text-red-500'>{form.formState.errors.address.message}</span>
                  )}
                </div>
                <div className='w-full h-auto flex space-x-2'>
                  <div className='w-full flex-1'>
                    <Label className='text-[12px]'>Estado</Label>
                    <Input id='state' {...form.register('state')} className='h-8 rounded-none' />
                    {form.formState.errors.state && (
                      <span className='text-red-500'>{form.formState.errors.state.message}</span>
                    )}
                  </div>
                  <div className='w-full flex-1'>
                    <Label className='text-[12px]'>Municipios</Label>
                    <Input id='municipality' {...form.register('municipality')} className='h-8 rounded-none' />
                    {form.formState.errors.municipality && (
                      <span className='text-red-500'>{form.formState.errors.municipality.message}</span>
                    )}
                  </div>
                  <div className='w-full flex-1'>
                    <Label className='text-[12px]'>Parroquia</Label>
                    <Input id='parish' {...form.register('parish')} className='h-8 rounded-none' />
                    {form.formState.errors.parish && (
                      <span className='text-red-500'>{form.formState.errors.parish.message}</span>
                    )}
                  </div>
                </div>
                <div className='w-full h-auto flex space-x-2'>
                  <div className='w-full flex-1'>
                    <Label className='text-[12px]'>Telefono Local</Label>
                    <Input id='localPhone' {...form.register('localPhone')} className='h-8 rounded-none' />
                    {form.formState.errors.localPhone && (
                      <span className='text-red-500'>{form.formState.errors.localPhone.message}</span>
                    )}
                  </div>
                  <div className='w-full flex-1'>
                    <Label className='text-[12px]'>Telefono Móvil</Label>
                    <Input id='mobilePhone' {...form.register('mobilePhone')} className='h-8 rounded-none' />
                    {form.formState.errors.mobilePhone && (
                      <span className='text-red-500'>{form.formState.errors.mobilePhone.message}</span>
                    )}
                  </div>
                </div>
                <div className='w-full flex-1'>
                  <Label className='text-[12px]'>Misión</Label>
                  <TextArea id='mission' {...form.register('mission')} className='rounded-none' />
                  {form.formState.errors.mission && (
                    <span className='text-red-500'>{form.formState.errors.mission.message}</span>
                  )}
                </div>
                <div className='w-full flex-1'>
                  <Label className='text-[12px]'>Visión</Label>
                  <TextArea id='' {...form.register('vision')} className='rounded-none' />
                  {form.formState.errors.vision && (
                    <span className='text-red-500'>{form.formState.errors.vision.message}</span>
                  )}
                </div>
                <div className='flex justify-center space-x-8 pt-16 pb-8'>
                  <Button variant={'btnGreen'} type='submit'>
                    Guardar
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
