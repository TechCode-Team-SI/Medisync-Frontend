import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Button } from 'src/components/ui/button';
import { Form } from 'src/components/ui/form';
import Password from 'src/components/ui/icons/password';
import User from 'src/components/ui/icons/user';
import { Input } from 'src/components/ui/input';
import { InputPassword } from 'src/components/ui/inputPassword';
import { Loading } from 'src/components/ui/loading';
import { paths } from 'src/paths';
import { UserAdmin } from 'src/services/api/interface';
import { installationHttp } from 'src/services/api/UserAdmin';
import { useSessionStore } from 'src/store/sessionStore';
import { GenderEnum } from 'src/utils/constants';

import installationImage from '../../../assets/img/installationImage.png';

import { DemoSchema, demoSchema } from './schema';

export function CreateUserAdmin() {
  const navigate = useNavigate();
  const { setSession } = useSessionStore();

  const form = useForm<DemoSchema>({
    resolver: zodResolver(demoSchema),
  });

  const singIn = useMutation({
    mutationKey: [''],
    mutationFn: installationHttp.FirstUser,
    onSuccess: (res: UserAdmin) => {
      setSession(res.user);
      navigate(paths.packages);
    },
  });

  const onSubmit = (data: DemoSchema) =>
    singIn.mutate({
      email: data.email,
      fullName: data.fullName,
      password: data.password,
      phone: 'default',
      employeeProfile: {
        address: 'default',
        birthday: new Date().toISOString(),
        dni: 'default',
        CML: 'default',
        MPPS: 'vacio',
        gender: GenderEnum.MALE,
      },
    });

  if (singIn.isPending) {
    return (
      <div className='w-full h-screen flex justify-center items-center relative'>
        <Loading />
      </div>
    );
  }

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
                id='fullName'
                className='pl-5 w-full h-[50px} mt-1 bg-[#CCEAE8] text-[#539091] text-[15px] font-roboto font-bold border-l-8 border-[#68C3B7] flex-col indent-4 focus-visible:ring-green-400'
                placeholder='Nombre Completo'
                {...form.register('fullName')}
              />
              {form.formState.errors.fullName && (
                <div className='flex column-flex'>
                  <span className='text-red-500 absolute'>{form.formState.errors.fullName.message}</span>
                </div>
              )}
            </div>
            <div className='flex  flex-col'>
              <User fill='#539091' className='h-[17px] w-[18px] absolute ml-3 mt-[14px] ' />
              <Input
                id='email'
                className='pl-5 w-full h-[50px} mt-1 bg-[#CCEAE8] text-[#539091] text-[15px] font-roboto font-bold border-l-8 border-[#68C3B7] flex-col indent-4 focus-visible:ring-green-400'
                placeholder='Correo Electronico'
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
