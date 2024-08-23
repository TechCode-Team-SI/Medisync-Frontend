/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from 'src/components/ui/button';

import installationImage from '../../../assets/img/installationImage.png';
import { Label } from 'src/components/ui/label';
import { Input } from 'src/components/ui/input';

import { DemoSchema, demoSchema } from './schema';
import { Form } from 'src/components/ui/form';

export function HostToken() {
  const form = useForm<DemoSchema>({
    resolver: zodResolver(demoSchema),
  });
  const onSubmit = (data: DemoSchema) => {
    console.log(data);
  };

  return (
    <div className='flex w-full h-full bg-white'>
      <div className='w-1/2 flex flex-col justify-center bg-white p-10'>
        <div className=' items-center text-justify flex flex-col pb-10 '>
          <p className='text-black text-[20px] font-roboto font-normal h-min'>
            Por favor, ingresa la dirección del host y tu token privado para continuar con la configuración.
          </p>
          <Form {...form}>
            <form className='space-y-2 w-full mt-2' onSubmit={form.handleSubmit(onSubmit)}>
              <Label
                htmlFor='host'
                className='text-green-300 text-[18px] font-roboto font-bold flex flex-col justify-start  pt-7'
              >
                Direccion de Host
              </Label>
              <Input
                id='host'
                className='w-full h-[50px} mt-1 bg-green-100  focus-visible:ring-green-400'
                {...form.register('host')}
              />
              {form.formState.errors.host && (
                <div className='flex column-flex'>
                  <span className='text-red-500 absolute'>{form.formState.errors.host.message}</span>
                </div>
              )}
              <Label
                htmlFor='token'
                className='text-green-300 text-[18px] font-roboto font-bold flex flex-col justify-start  pt-7'
              >
                Token
              </Label>
              <Input
                id='token'
                className='w-full h-[50px} mt-1 bg-green-100 focus-visible:ring-green-400'
                {...form.register('token')}
              />
              {form.formState.errors.token && (
                <div className='flex column-flex'>
                  <span className='text-red-500 absolute'>{form.formState.errors.token.message}</span>
                </div>
              )}

              <div className=' flex text-center items-center justify-center  pt-10 '>
                <Button variant='btnGreen' type='submit' className='w-[325px] h-[52px] text-[20px]'>
                  {' '}
                  Continuar
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>

      <div className='w-1/2 flex flex-col items-center justify-center bg-[#68C3B7] '>
        <img src={installationImage} alt='Imagen estática' className='w-402 h-500 ' />
      </div>
    </div>
  );
}
