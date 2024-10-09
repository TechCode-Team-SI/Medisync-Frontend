/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from 'src/components/ui/button';

import { Input } from 'src/components/ui/input';
import installationImage from '../../../assets/img/installationImage.png';

import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { AlertDanger } from 'src/components/alerts/alertDanger';
import { Dialog } from 'src/components/ui/dialog';
import { Form } from 'src/components/ui/form';
import Password from 'src/components/ui/icons/password';
import User from 'src/components/ui/icons/user';
import { InputPassword } from 'src/components/ui/inputPassword';
import { Loading } from 'src/components/ui/loading';
import { paths } from 'src/paths';
import { loginHttp } from 'src/services/api/auth';
import { Session } from 'src/services/api/interface';
import { useSessionStore } from 'src/store/sessionStore';
import { DemoSchema, demoSchema } from './schema';

export function Login() {
  const navigate = useNavigate();
  const { setSession } = useSessionStore();

  const form = useForm<DemoSchema>({
    resolver: zodResolver(demoSchema),
  });

  const login = useMutation({
    mutationKey: [''],
    mutationFn: loginHttp.login,
    onSuccess: (res: Session) => {
      setSession(res);
      navigate(paths.dashboard);
    },
  });

  const onSubmit = (data: DemoSchema) => login.mutate(data);

  if (login.isPending) {
    return (
      <div className='w-full h-screen flex justify-center items-center relative'>
        <Loading />
      </div>
    );
  }

  return (
    <div className='flex w-full h-full bg-white'>
      <div className='w-1/2 flex flex-col justify-center  bg-white p-7 gap-8'>
        <h1 className='text-[#539091] text-[30px] font-montserrat font-bold text-center'>¡Hola Usuario!</h1>
        <p className='text-black text-[20px] font-roboto font-normal text-left'>
          Por favor, inicia sesión para acceder a todas las funcionalidades y continuar disfrutando de nuestros
          servicios.
        </p>
        <Form {...form}>
          <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
            <div className='flex  flex-col'>
              <User fill='#539091' className='h-[17px] w-[18px] absolute ml-3 mt-[14px] ' />
              <Input
                id='email'
                className='w-full h-[50px} mt-1 pl-5 bg-[#CCEAE8] text-[#539091] text-[15px] font-roboto font-bold border-l-8 border-[#68C3B7] flex-col indent-4 focus-visible:ring-green-400'
                placeholder='Usuario'
                {...form.register('email')}
              />
              {form.formState.errors.email && (
                <div className='flex column-flex'>
                  <span className='text-red-500 absolute'>{form.formState.errors.email.message}</span>
                </div>
              )}
            </div>
            <div className='flex flex-col pt-2'>
              <InputPassword
                id='password'
                className='w-full h-[50px} mt-1 pl-5 bg-[#CCEAE8] text-[#539091] text-[15px] font-roboto font-bold border-l-8 border-[#68C3B7] flex-col indent-4 focus-visible:ring-green-400'
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
            <Dialog modal={true} open={login.isError}>
              <AlertDanger title={`Credenciales incorrectas`} />
            </Dialog>
          </form>
        </Form>
      </div>

      <div className='w-1/2 flex flex-col items-center justify-center bg-[#68C3B7] '>
        <img src={installationImage} alt='Imagen estática' className='w-402 h-500 ' />
      </div>
    </div>
  );
}
