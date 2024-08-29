import { Link } from 'react-router-dom';

import { UserType } from 'src/components/navbar/userType/userType';
import { Button } from 'src/components/ui/button';
import { Card, CardContent, CardTitle } from 'src/components/ui/card';
import Injuries from 'src/components/ui/icons/injuries';
import { Input } from 'src/components/ui/input';
import { Label } from 'src/components/ui/label';

export function AppointmentDetails() {
  return (
    <div className='w-full h-full flex flex-row items-center bg-green-400 relative'>
      <Card className='h-full w-full flex flex-col px-8 sm:px-9 lg:px-10 pt-8 sm:pt-9 lg:pt-10 bg-green-600 border-none rounded-none rounded-l-xl'>
        <Card className='bg-white min-h-[60px] max-h-[60px] w-full mb-4 flex fles-row justify-end items-center px-5 sm:px-10 lg:px-20'>
          <UserType></UserType>
        </Card>
        <Card className='bg-white w-full h-full overflow-auto flex flex-col p-6 sm:p-8 lg:p-10 gap-5'>
          <CardTitle className=' text-green-400 font-montserrat font-bold text-[18px] text-left'>
            DETALLES DE CITAS
          </CardTitle>
          <CardContent className='overflow-auto scrollbar-edit'>
            <div className='space-y-4 '>
              <div className=' pb-8 sm:pb-9 lg:pb-10'>
                <div className='flex flex-row items-start gap-4'>
                  <div className='flex-1 space-y-4'>
                    <div className='space-y-1'>
                      <Label className='text-green-400 font-roboto font-bold text-base'>Nombre Completo</Label>
                      <Input
                        type='text'
                        disabled
                        className='w-full h-8 rounded-none font-roboto text-base bg-gray-300'
                      />
                    </div>
                    <div className='space-y-1'>
                      <Label className='text-green-400 font-roboto font-bold text-base'>Correo</Label>
                      <Input
                        type='text'
                        disabled
                        className='w-full h-8 rounded-none font-roboto text-base bg-gray-300'
                      />
                    </div>
                  </div>
                  <div className='flex-shrink-0 h-[156px] w-[156px] rounded-full bg-green-400 flex flex-col overflow-hidden items-center justify-center'>
                    <Injuries className='h-[115px] w-[100px] fill-current text-white' />
                  </div>
                </div>
                <div className='flex gap-4 '>
                  <div className='space-y-1 w-full flex-1'>
                    <Label className='text-green-400 font-roboto font-bold text-base'>Telefono</Label>
                    <Input type='text' disabled className='w-full h-8 rounded-none font-roboto text-base bg-gray-300' />
                  </div>
                  <div className='space-y-1 w-full flex-1'>
                    <Label className='text-green-400 font-roboto font-bold text-base'>Edad</Label>
                    <Input type='text' disabled className='w-full h-8 rounded-none font-roboto text-base bg-gray-300' />
                  </div>
                </div>
                <div className='flex gap-4'>
                  <div className='space-y-1 w-full flex-1'>
                    <Label className='text-green-400 font-roboto font-bold text-base'>Especialidad</Label>
                    <Input type='text' disabled className='w-full h-8 rounded-none font-roboto text-base bg-gray-300' />
                  </div>
                  <div className='space-y-1 w-full flex-1'>
                    <Label className='text-green-400 font-roboto font-bold text-base'>Medico</Label>
                    <Input type='text' disabled className='w-full h-8 rounded-none font-roboto text-base bg-gray-300' />
                  </div>
                </div>
                <div className='flex gap-4'>
                  <div className='space-y-1 w-full flex-1'>
                    <Label className='text-green-400 font-roboto font-bold text-base'>Fecha y Hora</Label>
                    <Input type='text' disabled className='w-full h-8 rounded-none font-roboto text-base bg-gray-300' />
                  </div>
                  <div className='space-y-1 w-full flex-1'>
                    <Label className='text-green-400 font-roboto font-bold text-base'>Estatus</Label>
                    <Input type='text' disabled className='w-full h-8 rounded-none font-roboto text-base bg-gray-300' />
                  </div>
                </div>
              </div>
              <div className='mt-1 w-full flex flex-row justify-center space-x-20'>
                <Button variant='btnGreen'>Guardar</Button>
                <Link to='/appointments'>
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
