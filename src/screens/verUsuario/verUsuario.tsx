import { Link } from 'react-router-dom';

import { UserType } from 'src/components/navbar/userType/userType';
import { Button } from 'src/components/ui/button';
import { Card, CardTitle, CardContent, CardHeader } from 'src/components/ui/card';
import Search from 'src/components/ui/icons/search';
import View from 'src/components/ui/icons/view';
import { Input } from 'src/components/ui/input';
import { TableCell, TableRow, TableBody, Table, TableHead, TableHeader } from 'src/components/ui/table';
import { paths } from 'src/paths';

const Usuarios = [
  {
    Nombre: 'Enrique',
    Apellido: 'Gómez',
    Edad: '34',
    Genero: 'Masculino',
    Correo: 'enrique_gomez@gmail.com',
    Telefono: '+58 412 123 1234',
  },
  {
    Nombre: 'Karina',
    Apellido: 'Villalobos',
    Edad: '26',
    Genero: 'Femenino',
    Correo: 'karina_v@gmail.com',
    Telefono: '+58 412 456 4567',
  },
  {
    Nombre: 'Miguel',
    Apellido: 'Sequera',
    Edad: '29',
    Genero: 'Masculino',
    Correo: 'm_sequera@gmail.com',
    Telefono: '+58 412 789 7890',
  },
  {
    Nombre: 'Alejandro',
    Apellido: 'Figueroa',
    Edad: '31',
    Genero: 'Masculino',
    Correo: 'alejo_figueroa@gmail.com',
    Telefono: '+58 414 123 1234',
  },
  {
    Nombre: 'Liliana',
    Apellido: 'Crespo',
    Edad: '25',
    Genero: 'Femenino',
    Correo: 'crespo_lili@gmail.com',
    Telefono: '+58 414 456 4567',
  },
  {
    Nombre: 'Carmen',
    Apellido: 'Bonilla',
    Edad: '32',
    Genero: 'Femenino',
    Correo: 'bonilla_carmen@gmail.com',
    Telefono: '+58 414 789 7890',
  },
  {
    Nombre: 'Alexander',
    Apellido: 'Roa',
    Edad: '40',
    Genero: 'Masculino',
    Correo: 'alex_roa@gmail.com',
    Telefono: '+58 426 123 1234',
  },
  {
    Nombre: 'Miranda',
    Apellido: 'Maldonado',
    Edad: '42',
    Genero: 'Femenino',
    Correo: 'miranda_maldonado@gmail.com',
    Telefono: '+58 426 456 4567',
  },
  {
    Nombre: 'Angelica',
    Apellido: 'Ortiz',
    Edad: '28',
    Genero: 'Femenino',
    Correo: 'angel_carmen@gmail.com',
    Telefono: '+58 426 789 7890',
  },
];

export function VerUsuario() {
  return (
    <div className='w-full h-full flex flex-row items-center bg-green-400 relative'>
      <Card className='h-full w-full flex flex-col px-8 sm:px-9 lg:px-10 pt-8 sm:pt-9 lg:pt-10 bg-green-600 border-none rounded-none rounded-l-xl'>
        <Card className='bg-white min-h-[60px] max-h-[60px] w-full mb-4 flex flex-row justify-end items-center px-5 sm:px-10 lg:px-20'>
          <UserType />
        </Card>
        <Card className='bg-white w-full h-full overflow-auto flex flex-col p-6 sm:p-8 lg:p-10 gap-5'>
          <CardHeader className='w-full flex p-3 flex-col gap-5'>
            <CardTitle className=' text-green-400 font-montserrat font-bold text-[18px] text-left'>USUARIOS</CardTitle>
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
          <CardContent className='h-full p-3 overflow-x-auto overflow-y-auto scrollbar-edit'>
            <Table className='min-w-full text-sm'>
              <TableHeader className='border-b-8 border-white bg-green-500   text-white'>
                <TableRow className='hover:bg-green-500'>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Apellido</TableHead>
                  <TableHead>Edad</TableHead>
                  <TableHead>Género</TableHead>
                  <TableHead>Correo</TableHead>
                  <TableHead>Teléfono</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className='h-[35px]'>
                {Usuarios.map((Usuarios) => (
                  <TableRow
                    className='bg-green-600 border-b-2 border-white text-black font-roboto'
                    key={Usuarios.Nombre}
                  >
                    <TableCell>{Usuarios.Nombre}</TableCell>
                    <TableCell>{Usuarios.Apellido}</TableCell>
                    <TableCell>{Usuarios.Edad}</TableCell>
                    <TableCell>{Usuarios.Genero}</TableCell>
                    <TableCell>{Usuarios.Correo}</TableCell>
                    <TableCell>{Usuarios.Telefono}</TableCell>
                    <TableCell className='flex justify-center items-center'>
                      <Link to={paths.verUsuarioDetalle}>
                        <View className='fill-current text-green-400 h-4 w-4' />
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Card>
    </div>
  );
}
