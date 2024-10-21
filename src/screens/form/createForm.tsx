/* eslint-disable prettier/prettier */

import { Plus } from 'lucide-react';

import { FormOption } from 'src/components/modals/formOption';
import { UserType } from 'src/components/navbar/userType/userType';
import { Button } from 'src/components/ui/button';
import { Card, CardFooter } from 'src/components/ui/card';
import { Dialog, DialogTrigger } from 'src/components/ui/dialog';
import { Input } from 'src/components/ui/input';
import { Label } from 'src/components/ui/label';

export function createForm() {
  return (
    <div className='w-full h-full flex flex-col items-center bg-green-400 relative'>
      <Card className='h-full w-full flex flex-col px-8 sm:px-9 lg:px-10 pt-8 sm:pt-9 lg:pt-10 bg-green-600 border-none rounded-none rounded-l-xl'>
        <Card className='bg-white min-h-[60px] max-h-[60px] w-full mb-4 flex fles-row justify-end items-center px-5 sm:px-10 lg:px-20'>
          <UserType />
        </Card>
        <Card className='bg-white w-full h-full rounded-b-none overflow-auto scrollbar-edit flex flex-col p-6 pb-0 sm:p-8 sm:pb-0 lg:p-10 lg:pb-0 space-y-5'>
          <Card className=' sm:w-364 h-137 shadow-md border-none flex flex-col p-5 gap-5'>
            <div className=' border-gray-300  border-b-2  bg-white  '>
              <Input
                placeholder='Título del Formulario'
                className='mt-1 h-51  rounded-md text-[20px] hover:text-[#539091] placeholder:text-[#539091] text-[#539091] bg-white  font-montserrat font-bold'
              />
            </div>
            <div className=' border-gray-300  border-b-2  bg-white  '>
              <Input
                placeholder='Descripcion del Formulario'
                className='mt-1 h-51  rounded-md text-[14px]  text-[#539091] bg-white  font-montserrat font-normal'
              />
            </div>
          </Card>

          <Card className='flex flex-col justify-center sm:h-[300px] border-2 border-green-800'>
            <div className='flex justify-center items-center'>
              <Dialog>
                <DialogTrigger asChild>
                  <div className='bg-green-400 rounded-full flex justify-center items-center'>
                    <Plus className='fill-current text-white w-[50px] h-[50px] cursor-pointer' />
                  </div>
                </DialogTrigger>
                <FormOption />
              </Dialog>
            </div>
            <div className='bg-white rounded-full flex justify-center'>
              <Label className='bg-white mt-18 text-green-400 text-[18px] font-roboto font-bold'>
                Agregar Pregunta
              </Label>
            </div>
          </Card>
          <CardFooter className='h-20 flex flex-row-reverse'>
            <Button className='bg-green-400 rounded-full w-[157px] h-[37px] mt-18 pb-2 text-gray-50 text-[18px] font-roboto font-bold'>
              Crear
            </Button>
          </CardFooter>
        </Card>
      </Card>
    </div>
  );
}
