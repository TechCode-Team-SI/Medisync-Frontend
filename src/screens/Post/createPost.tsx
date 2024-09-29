/* eslint-disable prettier/prettier */
import { Plus } from 'lucide-react';

import { RegisterPost } from 'src/components/modals/modalRegisterPost';
import { UserType } from 'src/components/navbar/userType/userType';
import { Button } from 'src/components/ui/button';
import { Card, CardTitle, CardContent, CardHeader, CardFooter, CardImg } from 'src/components/ui/card';
import { Dialog, DialogTrigger } from 'src/components/ui/dialog';
import MedicalStaff from 'src/components/ui/icons/medicalStaff';
import Search from 'src/components/ui/icons/search';
import { Input } from 'src/components/ui/input';
import { TableRow, TableBody, TableCell, Table, TableHeader, TableHead } from 'src/components/ui/table';

const Post = [
  {
    titulo: 'Master',
    contenido: 'Rol de alto rango para pacientes con muchas cosas',
    src: '',
    fecha: '2024-09-01',
  },
  {
    titulo: 'Aprendizaje de React',
    contenido: 'Tutorial sobre cómo aprender React desde cero',
    src: '',
    fecha: '2024-09-02',
  },
  {
    titulo: 'Guía de Tailwind CSS',
    contenido: 'Explicación detallada de cómo usar Tailwind CSS para estilizar componentes',
    src: '',
    fecha: '2024-09-03',
  },
  {
    titulo: 'Patrones de diseño en JavaScript',
    contenido: 'Exploración de los patrones de diseño más comunes en JavaScript',
    src: '',
    fecha: '2024-09-04',
  },
  {
    titulo: 'Buenas prácticas de desarrollo web',
    contenido: 'Consejos y técnicas para mejorar el flujo de trabajo y la calidad del código en proyectos web',
    src: '',
    fecha: '2024-09-05',
  },
];

export function CreatePost() {
  return (
    <div className='w-full h-full flex flex-col items-center bg-green-400 relative'>
      <Card className='h-full w-full flex flex-col px-8 sm:px-9 lg:px-10 pt-8 sm:pt-9 lg:pt-10 bg-green-600 border-none rounded-none rounded-l-xl'>
        <Card className='bg-white min-h-[60px] max-h-[60px] w-full mb-4 flex fles-row justify-end items-center px-5 sm:px-10 lg:px-20'>
          <UserType></UserType>
        </Card>
        <Card className='bg-white w-full h-full rounded-b-none overflow-auto scrollbar-edit flex flex-col p-6 pb-0 sm:p-8 sm:pb-0 lg:p-10 lg:pb-0 space-y-5'>
          <CardHeader className='w-full flex p-3 flex-col space-y-5'>
            <CardTitle className=' text-green-400 font-montserrat font-bold text-[18px] text-left'>
              CREAR PUBLICACIONES
            </CardTitle>
            <div className='w-full h-full flex flex-row gap-5'>
              <Input
                placeholder='Buscar'
                className='w-full h-[36px] bg-green-100/50 border-none rounded-md text-[15px] font-montserrat placeholder:text-green-400 placeholder:font-roboto placeholder:font-bold placeholder:text-[15px] focus-visible:ring-green-400'
              ></Input>
              <Button variant='btnGreen' className='h-[36px]'>
                <Search className='h-[17px] w-[17px] fill-current text-white mr-2' />
                Buscar
              </Button>
            </div>
          </CardHeader>
          <CardContent className='overflow-auto scrollbar-edit'>
            <Table className='min-w-full text-sm mb-4'>
              <TableHeader className='border-b-8 border-white bg-green-500 text-white'>
                <TableRow className='hover:bg-green-500'>
                  <TableHead className='w-10 text-[12px] text-left'>Titulo</TableHead>
                  <TableHead className='w-10 text-[12px] text-left'>Contenido</TableHead>
                  <TableHead className='w-10 text-[12px] text-left'>Foto</TableHead>
                  <TableHead className='w-10 text-[12px] text-left'>Fecha</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className='h-[35px]'>
                {Post.map((Post) => (
                  <TableRow className='bg-green-600 border-b-2 border-white text-black font-roboto' key={Post.titulo}>
                    <TableCell className='pl-4 text-left'>{Post.titulo}</TableCell>
                    <TableCell className='pl-4 text-left'>{Post.contenido}</TableCell>
                    <TableCell className='pl-4 text-left'>
                      <div className='flex flex-col items-center justify-center h-7 w-7 rounded-full bg-green-400 overflow-hidden relative'>
                        <CardImg
                          src={Post.src}
                          fallback={<MedicalStaff className='h-5 w-5 fill-current text-white' />}
                          className='w-5 h-5'
                        />
                      </div>
                    </TableCell>
                    <TableCell className='pl-4 text-left'>{Post.fecha}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className='h-20 flex flex-row-reverse'>
            <div className='bg-green-400 rounded-full mb-8 mt-16'>
              <Dialog>
                <DialogTrigger asChild>
                  <div className='bg-green-400 rounded-full'>
                    <Plus className='fill-current text-white w-[50px] h-[50px] cursor-pointer' />
                  </div>
                </DialogTrigger>
                <RegisterPost title={'AÑADIR PUBLICACION'} alert={'PUBLICACIÓN CREADA'} />
              </Dialog>
            </div>
          </CardFooter>
        </Card>
      </Card>
    </div>
  );
}
