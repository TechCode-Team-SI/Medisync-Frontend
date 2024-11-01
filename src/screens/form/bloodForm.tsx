/* eslint-disable prettier/prettier */

import { UserType } from 'src/components/navbar/userType/userType';
import { Button } from 'src/components/ui/button';
import { Card, CardFooter } from 'src/components/ui/card';
import { Checkbox } from 'src/components/ui/checkbox';
import { Label } from 'src/components/ui/label';

export function bloodForm() {
  return (
    <div className='w-full h-full flex flex-col items-center bg-green-400 relative'>
      <Card className='h-full w-full flex flex-col px-8 sm:px-9 lg:px-10 pt-8 sm:pt-9 lg:pt-10 bg-green-600 border-none rounded-none rounded-l-xl'>
        <Card className='bg-white min-h-[60px] max-h-[60px] w-full mb-4 flex fles-row justify-end items-center px-5 sm:px-10 lg:px-20'>
          <UserType />
        </Card>
        <Card className='bg-white w-full h-full rounded-b-none overflow-auto scrollbar-edit flex flex-col p-6 pb-0 sm:p-8 sm:pb-0 lg:p-10 lg:pb-0 space-y-5'>
          <Card className=' sm:w-364 h-137 shadow-md border-none flex flex-col p-5 gap-5'>
            <div className=' border-gray-300  border-b-2  bg-white  '>
              <Label className='mt-1 h-51  rounded-md text-[20px] hover:text-[#539091] placeholder:text-[#539091] text-[#539091] bg-white  font-montserrat font-bold'>
                {' '}
                Tipo de Sangre{' '}
              </Label>
            </div>
            <div className=' border-gray-300  border-b-2  bg-white  '>
              <Label className='mt-1 h-51  rounded-md text-[14px]  text-gray-400 bg-white  font-montserrat font-normal'>
                {' '}
                Formulario dirigido a mujeres{' '}
              </Label>
            </div>
          </Card>
          <Card className=' sm:w-364 h-137 shadow-md border-none flex flex-col p-5 gap-5'>
            <div className=' border-gray-300  h-20 border-b-2  bg-[#539091] flex justify-center justify-items-center items-center '>
              <Label className='mt-1  rounded-md text-[20px] hover:text-[#f2f5f5] placeholder:text-[#f5f8f8] text-[#f6f7f7] bg-[#539091]  font-montserrat font-bold'>
                {' '}
                Tipo de Sangre{' '}
              </Label>
            </div>
            <div className=' border-gray-300  border-b-2  bg-white  '>
              <Label className='mt-1 h-51  rounded-md text-[14px] mb-2  text-gray-400 bg-white  font-montserrat font-normal'>
                {' '}
                Seleccione su tipo de Sangre{' '}
              </Label>
            </div>
            <div className='flex pl-6 pt-2 '>
              <Checkbox className='h-5 w-5 border-2 border-green-500' />
              <Label className='pl-2 pt-1 '>A+</Label>
            </div>
            <div className='flex pl-6 pt-2 '>
              <Checkbox className='h-5 w-5 border-2 border-green-500' />
              <Label className='pl-2 pt-1 '>A-</Label>
            </div>
            <div className='flex pl-6 pt-2 '>
              <Checkbox className='h-5 w-5 border-2 border-green-500' />
              <Label className='pl-2 pt-1 '>B+</Label>
            </div>
            <div className='flex pl-6 pt-2 '>
              <Checkbox className='h-5 w-5 border-2 border-green-500' />
              <Label className='pl-2 pt-1 '>B-</Label>
            </div>
            <div className='flex pl-6 pt-2 '>
              <Checkbox className='h-5 w-5 border-2 border-green-500' />
              <Label className='pl-2 pt-1 '>AB+</Label>
            </div>
            <div className='flex pl-6 pt-2 '>
              <Checkbox className='h-5 w-5 border-2 border-green-500' />
              <Label className='pl-2 pt-1 '>AB-</Label>
            </div>
            <div className='flex pl-6 pt-2 '>
              <Checkbox className='h-5 w-5 border-2 border-green-500' />
              <Label className='pl-2 pt-1 '>O+</Label>
            </div>
            <div className='flex pl-6 pt-2 '>
              <Checkbox className='h-5 w-5 border-2 border-green-500' />
              <Label className='pl-2 pt-1 '>O-</Label>
            </div>
          </Card>

          <CardFooter className='h-20 flex flex-row-reverse'>
            <div className='pb-3'>
              <Button className='bg-green-400 rounded-md w-[157px] h-[37px] mt-18  text-gray-50 text-[18px] font-roboto font-bold'>
                GUARDAR
              </Button>
            </div>
          </CardFooter>
        </Card>
      </Card>
    </div>
  );
}
