import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'src/components/ui/card';
import Edit from 'src/components/ui/icons/edit';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'src/components/ui/table';

const Personas = [
  {
    Nombre: 'Carlos',
    Apellido: 'González',
    Edad: '29',
    Genero: 'Masculino',
    Correo: 'carlos.gonzalez@example.com',
    Telefono: '555-1234',
  },
  {
    Nombre: 'María',
    Apellido: 'Fernández',
    Edad: '34',
    Genero: 'Femenino',
    Correo: 'maria.fernandez@example.com',
    Telefono: '555-5678',
  },
  {
    Nombre: 'Luis',
    Apellido: 'Martínez',
    Edad: '42',
    Genero: 'Masculino',
    Correo: 'luis.martinez@example.com',
    Telefono: '555-8765',
  },
  {
    Nombre: 'Ana',
    Apellido: 'López',
    Edad: '25',
    Genero: 'Femenino',
    Correo: 'ana.lopez@example.com',
    Telefono: '555-4321',
  },
  {
    Nombre: 'Jorge',
    Apellido: 'Ramírez',
    Edad: '38',
    Genero: 'Masculino',
    Correo: 'jorge.ramirez@example.com',
    Telefono: '555-6789',
  },
  {
    Nombre: 'Jorge',
    Apellido: 'Ramírez',
    Edad: '38',
    Genero: 'Masculino',
    Correo: 'jorge.ramirez@example.com',
    Telefono: '555-6789',
  },
  {
    Nombre: 'Jorge',
    Apellido: 'Ramírez',
    Edad: '38',
    Genero: 'Masculino',
    Correo: 'jorge.ramirez@example.com',
    Telefono: '555-6789',
  },
  {
    Nombre: 'Jorge',
    Apellido: 'Ramírez',
    Edad: '38',
    Genero: 'Masculino',
    Correo: 'jorge.ramirez@example.com',
    Telefono: '555-6789',
  },
  {
    Nombre: 'Jorge',
    Apellido: 'Ramírez',
    Edad: '38',
    Genero: 'Masculino',
    Correo: 'jorge.ramirez@example.com',
    Telefono: '555-6789',
  },
  {
    Nombre: 'Jorge',
    Apellido: 'Ramírez',
    Edad: '38',
    Genero: 'Masculino',
    Correo: 'jorge.ramirez@example.com',
    Telefono: '555-6789',
  },
];

export function TableDemo() {
  return (
    <div className='bg-gray-800 w-full h-full flex justify-center flex-col items-center p-5 gap-4'>
      <h1 className='text-white text-2xl font-bold uppercase'>Table Demo</h1>
      <Card className='h-96  overflow-hidden flex flex-col'>
        <CardHeader>
          <CardTitle>Invoices Demo</CardTitle>
          <CardDescription>A list of your recent invoices.</CardDescription>
        </CardHeader>
        <CardContent className='h-72 overflow-auto'>
          <Table className='min-w-full text-xs'>
            <TableHeader className='border-b-8 border-white bg-green-500   text-white'>
              <TableRow className='hover:bg-green-500'>
                <TableHead>Nombre</TableHead>
                <TableHead>Apellido</TableHead>
                <TableHead>Edad</TableHead>
                <TableHead>Genero</TableHead>
                <TableHead>Corre</TableHead>
                <TableHead>Telefono</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className='h-[35px]'>
              {Personas.map((Personas) => (
                <TableRow className='bg-green-600 border-b-2 border-white text-black font-roboto' key={Personas.Nombre}>
                  <TableCell>{Personas.Nombre}</TableCell>
                  <TableCell>{Personas.Apellido}</TableCell>
                  <TableCell>{Personas.Edad}</TableCell>
                  <TableCell>{Personas.Genero}</TableCell>
                  <TableCell>{Personas.Correo}</TableCell>
                  <TableCell>{Personas.Telefono}</TableCell>
                  <TableCell className='flex justify-center items-center'>
                    <Edit className='fill-current text-green-300 h-4 w-4' />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
