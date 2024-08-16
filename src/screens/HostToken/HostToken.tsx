/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from 'src/components/ui/button';

import installationImage from '../../../assets/img/installationImage.png';
import { Label } from 'src/components/ui/label';
import { Input } from 'src/components/ui/input';

import { DemoSchema, demoSchema } from './schema';

export function HostToken() {
  const form = useForm<DemoSchema>({
    resolver: zodResolver(demoSchema),
  });

  return (
    <div className='flex w-849 h-604 bg-white'>
      <div className='w-1/2 flex flex-col justify-center bg-white pl-10 pr-10 '>
        <div className='text-black text-[20px] font-roboto font-normal h-min items-center text-justify flex flex-col pb-10 '>
          <p>Por favor, ingresa la dirección del host y tu token privado para continuar con la configuración.</p>
        </div>

        <div className='flex flex-col '>
          <Label
            htmlFor='host'
            className='text-green-300 text-[18px] font-roboto font-bold flex flex-col justify-start  pt-7'
          >
            Direccion de Host
          </Label>
          <Input id='host' className='w-full h-[50px} mt-1 bg-[#CCEAE8]' {...form.register('host')} />
          {form.formState.errors.host && <span className='text-red-500'>{form.formState.errors.host.message}</span>}
        </div>

        <div className='flex flex-col '>
          <Label
            htmlFor='token'
            className='text-green-300 text-[18px] font-roboto font-bold flex flex-col justify-start  pt-7'
          >
            Token
          </Label>
          <Input id='token' className='w-full h-[50px} mt-1 bg-[#CCEAE8]' {...form.register('token')} />
        </div>

        <div className=' flex text-center items-center justify-center  pt-10 '>
          <Button variant='start'> Continuar</Button>
        </div>
      </div>

      <div className='w-1/2 flex flex-col items-center justify-center bg-[#68C3B7] '>
        <img src={installationImage} alt='Imagen estática' className='w-402 h-500 ' />
      </div>
    </div>
  );
}
