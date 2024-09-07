import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { ModalSelection } from 'src/components/modals/modalSelection';
import { UserType } from 'src/components/navbar/userType/userType';
import { Button } from 'src/components/ui/button';
import { Card, CardTitle } from 'src/components/ui/card';
import { Dialog, DialogTrigger } from 'src/components/ui/dialog';
import { Form } from 'src/components/ui/form';
import { Input } from 'src/components/ui/input';
import { Label } from 'src/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from 'src/components/ui/select';
import { TextArea } from 'src/components/ui/textArea';

import { CreateReferenceSchema, createReferenceSchema } from './schema';

export function CreateReference() {
  const form = useForm<CreateReferenceSchema>({
    resolver: zodResolver(createReferenceSchema),
  });

  const onSubmit = (data: CreateReferenceSchema) => {
    console.log(data);
  };
  return (
    <div className='w-full h-screen flex flex-row items-center bg-green-400 relative'>
      <Card className='h-full w-full flex flex-col px-8 sm:px-9 lg:px-10 pt-8 sm:pt-9 lg:pt-10 bg-green-600 border-none rounded-none rounded-l-xl'>
        <Card className='bg-white min-h-[60px] max-h-[60px] w-full mb-4 flex fles-row justify-end items-center px-5 sm:px-10 lg:px-20'>
          <UserType></UserType>
        </Card>
        <Card className='bg-white w-full h-full rounded-b-none overflow-auto scrollbar-edit flex flex-col p-6 pb-0 sm:p-8 sm:pb-0 lg:p-10 lg:pb-0 gap-5'>
          <CardTitle className=' text-green-400 font-montserrat font-bold text-[18px] text-left'>
            CREAR REFERENCIA
          </CardTitle>
          <Form {...form}>
            <form className='flex flex-col space-y-2' onSubmit={form.handleSubmit(onSubmit)}>
              <div className='w-full flex-1'>
                <Label className='text-[12px]'>Nombre</Label>
                <Input id='name' {...form.register('name')} readOnly className='h-8 rounded-none bg-gray-300' />
              </div>
              <div className='w-full flex-1'>
                <Label className='text-[12px]'>Apellido</Label>
                <Input id='lastName' {...form.register('lastName')} readOnly className='h-8 rounded-none bg-gray-300' />
              </div>
              <div className='w-full flex-1'>
                <Label className='text-[12px]'>Correo</Label>
                <Input id='email' {...form.register('email')} readOnly className='h-8 rounded-none bg-gray-300' />
              </div>
              <div className='grid grid-cols-2 gap-x-5'>
                <div className='flex flex-col space-y-2'>
                  <div className='flex flex-col'>
                    <Label className='text-[12px]'>Edad</Label>
                    <Input id='age' {...form.register('age')} readOnly className='h-8 rounded-none bg-gray-300' />
                  </div>
                  <div className='flex flex-col'>
                    <Label className='text-[12px]'>Telefono</Label>
                    <Input id='phone' {...form.register('phone')} readOnly className='h-8 rounded-none bg-gray-300' />
                  </div>
                  <div className='flex flex-col'>
                    <Label className='text-[12px]'>Tipo de sangre</Label>
                    <Input
                      id='bloodType'
                      {...form.register('bloodType')}
                      readOnly
                      className='h-8 rounded-none bg-gray-300'
                    />
                  </div>
                  <div className='flex flex-col'>
                    <Label className='text-[12px]'>Epecialidad</Label>
                    <Select>
                      <SelectTrigger id='specialty' {...form.register('specialty')} className='h-8 rounded-none'>
                        <SelectValue placeholder='Seleccione especialidad' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value='1a'>Item 1</SelectItem>
                          <SelectItem value='2b'>Item 2</SelectItem>
                          <SelectItem value='3c'>Item 3</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {form.formState.errors.specialty && (
                      <span className='text-red-500'>{form.formState.errors.specialty.message}</span>
                    )}
                  </div>
                  <div className='flex flex-col'>
                    <Label className='text-[12px]'>Hora</Label>
                    <Input id='time' {...form.register('time')} readOnly className='h-8 rounded-none bg-gray-300' />
                  </div>
                  <div className='flex flex-col h-full'>
                    <Label className='text-[12px]'>Observaciones</Label>
                    <TextArea
                      id='observations'
                      {...form.register('observations')}
                      className='h-full rounded-none'
                    ></TextArea>
                  </div>
                </div>
                <div className='flex flex-col space-y-2'>
                  <div className='flex flex-col'>
                    <Label className='text-[12px]'>Fecha de nacimiento</Label>
                    <Input
                      id='birthdate'
                      {...form.register('birthdate')}
                      readOnly
                      className='h-8 rounded-none bg-gray-300'
                    />
                  </div>
                  <div className='flex flex-col'>
                    <Label className='text-[12px]'>Genero</Label>
                    <Input id='gender' {...form.register('gender')} readOnly className='h-8 rounded-none bg-gray-300' />
                  </div>
                  <div className='flex flex-col'>
                    <Label className='text-[12px]'>Médico</Label>
                    <Select>
                      <SelectTrigger id='doctor' {...form.register('doctor')} className='h-8 rounded-none'>
                        <SelectValue placeholder='Seleccione médico' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value='1a'>Item 1</SelectItem>
                          <SelectItem value='2b'>Item 2</SelectItem>
                          <SelectItem value='3c'>Item 3</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {form.formState.errors.doctor && (
                      <span className='text-red-500'>{form.formState.errors.doctor.message}</span>
                    )}
                  </div>
                  <div className='flex flex-col'>
                    <Label className='text-[12px]'>Fecha</Label>
                    <Input id='date' {...form.register('date')} readOnly className='h-8 rounded-none bg-gray-300' />
                  </div>
                  <div className='flex flex-col'>
                    <Label className='text-[12px]'>Patologías</Label>
                    <div className='flex items-center'>
                      <Input
                        id='pathologies'
                        {...form.register('pathologies')}
                        readOnly
                        className='h-8 rounded-none mr-2'
                      />
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className='h-6 text-[10px]' variant='btnGreen'>
                            Seleccionar
                          </Button>
                        </DialogTrigger>
                        <ModalSelection />
                      </Dialog>
                    </div>
                    {form.formState.errors.pathologies && (
                      <span className='text-red-500'>{form.formState.errors.pathologies.message}</span>
                    )}
                  </div>
                  <div className='flex flex-col'>
                    <Label className='text-[12px]'>Sintomas</Label>
                    <div className='flex items-center'>
                      <Input id='symptoms' {...form.register('symptoms')} readOnly className='h-8 rounded-none mr-2' />
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className='h-6 text-[10px]' variant='btnGreen'>
                            Seleccionar
                          </Button>
                        </DialogTrigger>
                        <ModalSelection />
                      </Dialog>
                    </div>
                    {form.formState.errors.symptoms && (
                      <span className='text-red-500'>{form.formState.errors.symptoms.message}</span>
                    )}
                  </div>
                  <div className='flex flex-col'>
                    <Label className='text-[12px]'>Enfermedad</Label>
                    <div className='flex items-center'>
                      <Input id='disease' {...form.register('disease')} readOnly className='h-8 rounded-none mr-2' />
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className='h-6 text-[10px]' variant='btnGreen'>
                            Seleccionar
                          </Button>
                        </DialogTrigger>
                        <ModalSelection />
                      </Dialog>
                    </div>
                    {form.formState.errors.disease && (
                      <span className='text-red-500'>{form.formState.errors.disease.message}</span>
                    )}
                  </div>
                  <div className='flex flex-col'>
                    <Label className='text-[12px]'>Lesiones</Label>
                    <div className='flex items-center'>
                      <Input id='injuries' {...form.register('injuries')} readOnly className='h-8 rounded-none mr-2' />
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className='h-6 text-[10px]' variant='btnGreen'>
                            Seleccionar
                          </Button>
                        </DialogTrigger>
                        <ModalSelection />
                      </Dialog>
                    </div>
                    {form.formState.errors.injuries && (
                      <span className='text-red-500'>{form.formState.errors.injuries.message}</span>
                    )}
                  </div>
                </div>
              </div>
              <div className='flex justify-center space-x-8 pt-8 pb-8'>
                <Button variant={'btnGreen'}>Aceptar</Button>
                <Button variant={'btnGray'}>Cancelar</Button>
              </div>
            </form>
          </Form>
        </Card>
      </Card>
    </div>
  );
}

// Pendiente (1): Establecer el ID y el elemento ...form a las listas desplegables (select).
// Pendiente (2): Funcionalidad de ventanas modales para Patologias, sintomas, enfermedad y lesiones.
