import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Button } from 'src/components/ui/button';
import { Form } from 'src/components/ui/form';
import Password from 'src/components/ui/icons/password';
import User from 'src/components/ui/icons/user';
import { Input } from 'src/components/ui/input';
import { InputPassword } from 'src/components/ui/inputPassword';
import { paths } from 'src/paths';

import installationImage from '../../../assets/img/installationImage.png';

import { DemoSchema, demoSchema } from './schema';

export function CreateUserAdmin() {
  const navigate = useNavigate();

  const form = useForm<DemoSchema>({
    resolver: zodResolver(demoSchema),
  });

  const onSubmit = async () => {
    navigate(paths.packages);
  };

  return (
    <div className='flex w-full h-full bg-white'>
      <div className='w-1/2 flex flex-col justify-center  bg-white p-7 gap-8'>
        <h1 className='text-[#539091] text-[30px] font-montserrat font-bold text-center'>¡Bienvenido Usuario!</h1>
        <p className='text-black text-[20px] font-roboto font-normal text-left'>
          Por favor, regístrate para acceder a todas las funcionalidades y comenzar a disfrutar de nuestros servicios.
        </p>
        <Form {...form}>
          <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
            <div className='flex  flex-col'>
              <User fill='#539091' className='h-[17px] w-[18px] absolute ml-3 mt-[14px] ' />
              <Input
                id='fullname'
                className='pl-5 w-full h-[50px} mt-1 bg-[#CCEAE8] text-[#539091] text-[15px] font-roboto font-bold border-l-8 border-[#68C3B7] flex-col indent-4 focus-visible:ring-green-400'
                placeholder='Nombre Completo'
                {...form.register('fullname')}
              />
              {form.formState.errors.fullname && (
                <div className='flex column-flex'>
                  <span className='text-red-500 absolute'>{form.formState.errors.fullname.message}</span>
                </div>
              )}
            </div>
            <div className='flex  flex-col'>
              <User fill='#539091' className='h-[17px] w-[18px] absolute ml-3 mt-[14px] ' />
              <Input
                id='user'
                className='pl-5 w-full h-[50px} mt-1 bg-[#CCEAE8] text-[#539091] text-[15px] font-roboto font-bold border-l-8 border-[#68C3B7] flex-col indent-4 focus-visible:ring-green-400'
                placeholder='Usuario'
                {...form.register('user')}
              />
              {form.formState.errors.user && (
                <div className='flex column-flex'>
                  <span className='text-red-500 absolute'>{form.formState.errors.user.message}</span>
                </div>
              )}
            </div>
            <div className='flex flex-col pt-2'>
              <InputPassword
                id='password'
                className='w-full pl-5 h-[50px} mt-1 bg-[#CCEAE8] text-[#539091] text-[15px] font-roboto font-bold border-l-8 border-[#68C3B7] flex-col indent-4 focus-visible:ring-green-400'
                placeholder='Contraseña'
                {...form.register('password')}
              />
              {form.formState.errors.password && (
                <div className='flex column-flex'>
                  <span className='text-red-500 absolute'>{form.formState.errors.password.message}</span>
                </div>
              )}
              <Password fill='#539091' className='h-[17px] w-[18px] absolute ml-3 mt-[14px] ' />
            </div>

            <div className=' flex text-center items-center justify-center  '>
              <Button variant='btnGreen' type='submit' className='w-[325px] h-[52px] text-[20px]'>
                Continuar
              </Button>
            </div>
          </form>
        </Form>
      </div>

      <div className='w-1/2 flex flex-col items-center justify-center bg-[#68C3B7] '>
        <img src={installationImage} alt='Imagen estática' className='w-402 h-500 ' />
      </div>
    </div>
  );
}
