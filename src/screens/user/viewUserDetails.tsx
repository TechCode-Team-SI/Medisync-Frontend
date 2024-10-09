import { useForm } from 'react-hook-form';
import { Link, useLocation } from 'react-router-dom';

import { UserType } from 'src/components/navbar/userType/userType';
import { Button } from 'src/components/ui/button';
import { Card, CardContent, CardImg, CardTitle } from 'src/components/ui/card';
import Injuries from 'src/components/ui/icons/injuries';
import { Input } from 'src/components/ui/input';
import { Label } from 'src/components/ui/label';

import { UserDetailSchema } from './UserDetailSchema';

export function UserViewDetail() {
  const location = useLocation();
  const data = location.state;

  const form = useForm<UserDetailSchema>({
    defaultValues: {
      fullName: data?.fullName,
      phone: data?.phone,
      email: data?.email,
    },
  });

  return (
    <div className='w-full h-full flex flex-row items-center bg-green-400 relative'>
      <Card className='h-full w-full flex flex-col px-8 sm:px-9 lg:px-10 pt-8 sm:pt-9 lg:pt-10 bg-green-600 border-none rounded-none rounded-l-xl'>
        <Card className='bg-white min-h-[60px] max-h-[60px] w-full mb-4 flex fles-row justify-end items-center px-5 sm:px-10 lg:px-20'>
          <UserType />
        </Card>
        <Card className='bg-white w-full h-full overflow-auto flex flex-col p-6 sm:p-8 lg:p-10 gap-5'>
          <CardTitle className=' text-green-400 font-montserrat font-bold text-[18px] text-left'>
            VER PACIENTE
          </CardTitle>
          <CardContent className='overflow-auto scrollbar-edit'>
            <div className='space-y-4'>
              <div className=' pb-8 sm:pb-9 lg:pb-10'>
                <div className='flex flex-row items-start gap-4'>
                  <div className='flex-1 space-y-4'>
                    <div className='space-y-1'>
                      <Label className='text-green-400 font-roboto font-bold text-base'>Nombre Completo</Label>
                      <Input
                        id='fullName'
                        type='text'
                        readOnly
                        {...form.register('fullName')}
                        className='w-full h-8 rounded-none font-roboto text-base bg-gray-200'
                      />
                    </div>
                    <div className='space-y-1'>
                      <Label className='text-green-400 font-roboto font-bold text-base'>Correo</Label>
                      <Input
                        id='email'
                        type='text'
                        readOnly
                        {...form.register('email')}
                        className='w-full h-8 rounded-none font-roboto text-base bg-gray-200'
                      />
                    </div>
                    <div className='space-y-1'>
                      <Label className='text-green-400 font-roboto font-bold text-base'>Teléfono</Label>
                      <Input
                        id='phone'
                        type='text'
                        readOnly
                        {...form.register('phone')}
                        className='w-full h-8 rounded-none font-roboto text-base bg-gray-200'
                      />
                    </div>
                  </div>
                  <div className='flex items-center justify-center'>
                    <div className='flex-shrink-0 h-[156px] w-[156px] rounded-full bg-green-400 flex flex-col overflow-hidden items-center justify-center'>
                      <CardImg
                        src=''
                        fallback={<Injuries className=' h-[115px] w-[100px] fill-current text-white' />}
                        className='w-20 h-20'
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className='mt-1 w-full flex flex-row justify-end space-x-20'>
                <Link to='/userView'>
                  <Button variant='btnGray'>Volver</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </Card>
    </div>
  );
}
