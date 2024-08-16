/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from 'src/components/ui/button';

import instaladorImage from '../../../assets/img/Instalador.png';
import { Input } from 'src/components/ui/input';

import { DemoSchema, demoSchema } from './schema';

export function Login() {
  const form = useForm<DemoSchema>({
    resolver: zodResolver(demoSchema),
  });

  return (
    <div className='flex w-849 h-604 bg-white'>
      <div className='w-1/2 flex flex-col  bg-white pl-[80px] pr-[90px] '>
        <div className='text-[#539091] text-[30px] font-montserrat font-bold text-center flex flex-col pt-[70px] '>
          <p>¡Hola usuario!</p>
        </div>
        <div className='text-black text-[20px] font-roboto font-normal h-min items-center text-justify flex flex-col pb-10 justify-center pt-5 '>
          <p>
            Por favor, inicia sesión para acceder a todas las funcionalidades y continuar disfrutando de nuestros
            servicios.
          </p>
        </div>

        <div className='flex flex-col '>
          <Input
            id='host'
            className='w-full h-[50px} mt-1 bg-[#CCEAE8] text-[#539091] text-[15px] font-roboto font-bold '
            placeholder='Usuario'
            {...form.register('host')}
          />
          {form.formState.errors.host && <span className='text-red-500'>{form.formState.errors.host.message}</span>}
        </div>

        <div className='flex flex-col pt-3'>
          <Input
            id='token'
            className='w-full h-[50px} mt-1 bg-[#CCEAE8] text-[#539091] text-[15px] font-roboto font-bold '
            placeholder='Contraseña'
            {...form.register('token')}
          />
          {form.formState.errors.token && <span className='text-red-500'>{form.formState.errors.token.message}</span>}
        </div>
        <div className='text-black text-[15px] font-roboto font-bold h-min items-end text-end flex flex-col pb-10 pt-3 '>
          <a href='#'>¿Ha olvidado su contraseña?</a>
        </div>

        <div className=' flex text-center items-center justify-center pb-5 '>
          <Button variant='start'> Continuar</Button>
        </div>
        <div className='text-black text-[15px] font-roboto font-normal h-min items-end justify-center flex  pt-5 '>
          <a className='text-black text-[15px] font-roboto font-normal h-min items-center flex mr-1 '>
            ¿No tienes una cuenta?
          </a>
          <a href='#' className='text-black text-[15px] font-roboto font-bold h-min flex '>
            Registrate
          </a>
        </div>
      </div>

      <div className='w-1/2 flex flex-col items-center justify-center bg-[#68C3B7] '>
        <img src={instaladorImage} alt='Imagen estática' className='w-402 h-500 ' />
      </div>
    </div>
  );
}
