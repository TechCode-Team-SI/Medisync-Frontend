import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { UserType } from 'src/components/navbar/userType/userType';
import { Button } from 'src/components/ui/button';
import { Card, CardContent, CardHeader, CardImg, CardTitle } from 'src/components/ui/card';
import { Form } from 'src/components/ui/form';
import MedicalStaff from 'src/components/ui/icons/medicalStaff';
import Trash from 'src/components/ui/icons/trash';
import { Input } from 'src/components/ui/input';
import { Label } from 'src/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'src/components/ui/table';

import { DemoSchema, demoSchema } from '../formDemo/schema';

const Usuario = [
  {
    Nombre: 'Juan Pérez',
    Descripcion: 'Empleado A',
    actualizacion: '2024-08-20 10:00 AM',
  },
  {
    Nombre: 'Juan Pérez',
    Descripcion: 'Empleado C',
    actualizacion: '2024-08-21 08:00 AM',
  },
  {
    Nombre: 'Juan Pérez',
    Descripcion: 'Empleado B',
    actualizacion: '2024-08-22 10:00 PM',
  },
];

export function EditProfile() {
  const form = useForm<DemoSchema>({
    resolver: zodResolver(demoSchema),
  });

  const onSubmit = (data: DemoSchema) => {
    console.log(data);
  };

  return (
    <div className='w-full h-full flex flex-row items-center bg-green-400 relative'>
      <Card className='h-full w-full flex flex-col px-8 sm:px-9 lg:px-10 pt-8 sm:pt-9 lg:pt-10 bg-green-600 border-none rounded-none rounded-l-xl'>
        <Card className='bg-white min-h-[60px] max-h-[60px] w-full mb-4 flex fles-row justify-end items-center px-5 sm:px-10 lg:px-20'>
          <UserType />
        </Card>
        <Card className='bg-white w-full h-full overflow-auto flex flex-col p-6 sm:p-8 lg:p-10 gap-5'>
          <CardTitle className=' text-green-400 font-montserrat font-bold text-[18px] text-left'>
            VER PERSONAL
          </CardTitle>
          <CardContent className='overflow-auto scrollbar-edit'>
            <Form {...form}>
              <form className='space-y-4 ' onSubmit={form.handleSubmit(onSubmit)}>
                <div className='border-b-green-100/90 border-b-[1px] pb-8 sm:pb-9 lg:pb-10'>
                  <div className='flex flex-row items-start gap-4'>
                    <div className='flex-1'>
                      <div className='space-y-1'>
                        <Label htmlFor='name' className='text-green-400 font-roboto font-bold text-base'>
                          Nombre Completo
                        </Label>
                        <Input
                          id='name'
                          className='w-full h-8 rounded-none font-roboto text-base'
                          {...form.register('name')}
                        />
                        {form.formState.errors.name && (
                          <span className='text-red-500'>{form.formState.errors.name.message}</span>
                        )}
                      </div>

                      <div className='flex gap-4 mt-4'>
                        <div className='space-y-1 flex-1'>
                          <Label className='text-green-400 font-roboto font-bold text-base'>Cédula</Label>
                          <Input type='text' className='w-full h-8 rounded-none font-roboto text-base' />
                          {form.formState.errors.identification && (
                            <span className='text-red-500'>{form.formState.errors.identification.message}</span>
                          )}
                        </div>
                        <div className='space-y-1 flex-1'>
                          <Label className='text-green-400 font-roboto font-bold text-base'>MPPS</Label>
                          <Input type='text' className='w-full h-8 rounded-none font-roboto text-base' />
                          {form.formState.errors.field && (
                            <span className='text-red-500'>{form.formState.errors.field.message}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className='flex flex-col items-center justify-between h-[156px] w-[156px] rounded-full bg-green-400 overflow-hidden relative'>
                      <div className='flex-1 flex items-center justify-center'>
                        <CardImg
                          src=''
                          fallback={<MedicalStaff className='h-[115px] w-[100px] fill-current text-white' />}
                          className='w-20 h-20'
                        />
                      </div>
                      <Button
                        variant='btnGreen'
                        type='button'
                        className='bg-black/25 rounded-none font-mono text-[13px] hover:bg-black/15 w-full text-center'
                      >
                        Editar Foto
                      </Button>
                    </div>
                  </div>
                  <div className='flex gap-4'>
                    <div className='space-y-1 w-full flex-1'>
                      <Label className='text-green-400 font-roboto font-bold text-base'>CML</Label>
                      <Input type='text' className='w-full h-8 rounded-none font-roboto text-base' />
                      {form.formState.errors.field && (
                        <span className='text-red-500'>{form.formState.errors.field.message}</span>
                      )}
                    </div>
                    <div className='space-y-1 w-full flex-1'>
                      <Label className='text-green-400 font-roboto font-bold text-base'>Fecha de Nacimiento</Label>
                      <Input type='date' className='w-full h-8 rounded-none font-roboto text-base' />
                      {form.formState.errors.field && (
                        <span className='text-red-500'>{form.formState.errors.field.message}</span>
                      )}
                    </div>
                  </div>
                  <div className='flex gap-4'>
                    <div className='space-y-1 w-full flex-1'>
                      <Label className='text-green-400 font-roboto font-bold text-base'>Genero</Label>
                      <Input type='text' className='w-full h-8 rounded-none font-roboto text-base' />
                      {form.formState.errors.field && (
                        <span className='text-red-500'>{form.formState.errors.field.message}</span>
                      )}
                    </div>
                    <div className='space-y-1 w-full flex-1'>
                      <Label className='text-green-400 font-roboto font-bold text-base'>Telefono</Label>
                      <Input type='text' className='w-full h-8 rounded-none font-roboto text-base' />
                      {form.formState.errors.field && (
                        <span className='text-red-500'>{form.formState.errors.field.message}</span>
                      )}
                    </div>
                  </div>
                  <div className='flex gap-4'>
                    <div className='space-y-1 w-full flex-1'>
                      <Label htmlFor='email' className='text-green-400 font-roboto font-bold text-base'>
                        Correo
                      </Label>
                      <Input id='email' type='email' className='w-full h-8 rounded-none font-roboto text-base' />
                      {form.formState.errors.email && (
                        <span className='text-red-500'>{form.formState.errors.email.message}</span>
                      )}
                    </div>
                    <div className='space-y-1 w-full flex-1'>
                      <Label className='text-green-400 font-roboto font-bold text-base'>Estatus</Label>
                      <Input type='text' readOnly className='w-full h-8 rounded-none' />
                      {form.formState.errors.field && (
                        <span className='text-red-500'>{form.formState.errors.field.message}</span>
                      )}
                    </div>
                  </div>
                </div>
                <CardContent className='h-full p-3 overflow-auto scrollbar-edit'>
                  <CardHeader className='w-full flex p-3 flex-col gap-5'>
                    <CardTitle className=' text-black font-montserrat font-bold text-[18px] text-left'>
                      ESPECIALIDADES
                    </CardTitle>
                  </CardHeader>
                  <Table className='min-w-full text-sm'>
                    <TableHeader className='border-b-8 border-white bg-green-500   text-white'>
                      <TableRow className='hover:bg-green-500'>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Descripcion</TableHead>
                        <TableHead>Ultima actualizacion</TableHead>
                        <TableHead>Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody className='h-[35px]'>
                      {Usuario.map((usuario) => (
                        <TableRow
                          className='bg-green-600 border-b-2 border-white text-black font-roboto'
                          key={usuario.Nombre}
                        >
                          <TableCell>{usuario.Nombre}</TableCell>
                          <TableCell>{usuario.Descripcion}</TableCell>
                          <TableCell>{usuario.actualizacion}</TableCell>
                          <TableCell className='flex justify-center items-center'>
                            <Trash className='fill-current text-green-400 h-4 w-4' />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <div className='mt-1 w-full flex flex-row-reverse'>
                    <Button variant='btnGreen' className='h-[25px] w-24 font-montserrat text-xs'>
                      Añadir
                    </Button>
                  </div>
                </CardContent>
                <div className='mt-1 w-full flex flex-row justify-center'>
                  <Button variant='btnGreen' className='' type='submit'>
                    Guardar
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </Card>
    </div>
  );
}
