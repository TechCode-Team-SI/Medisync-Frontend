import { Link } from 'react-router-dom';

import { Button } from 'src/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from 'src/components/ui/card';
import Logo from 'src/components/ui/icons/logo';
import Search from 'src/components/ui/icons/search';
import { Input } from 'src/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'src/components/ui/table';
import { paths } from 'src/paths';

const list = [
  {
    Paquete: 'Paquete 1',
    Descripcion: 'Descripción del Paquete 1',
    Tamaño: 'Grande',
  },
  {
    Paquete: 'Paquete 2',
    Descripcion: 'Descripción del Paquete 2',
    Tamaño: 'Mediano',
  },
  {
    Paquete: 'Paquete 3',
    Descripcion: 'Descripción del Paquete 3',
    Tamaño: 'Pequeño',
  },
  {
    Paquete: 'Paquete 4',
    Descripcion: 'Descripción del Paquete 4',
    Tamaño: 'Grande',
  },
  {
    Paquete: 'Paquete 5',
    Descripcion: 'Descripción del Paquete 5',
    Tamaño: 'Mediano',
  },
  {
    Paquete: 'Paquete 6',
    Descripcion: 'Descripción del Paquete 6',
    Tamaño: 'Pequeño',
  },
  {
    Paquete: 'Paquete 7',
    Descripcion: 'Descripción del Paquete 7',
    Tamaño: 'Grande',
  },
  {
    Paquete: 'Paquete 8',
    Descripcion: 'Descripción del Paquete 8',
    Tamaño: 'Mediano',
  },
  {
    Paquete: 'Paquete 9',
    Descripcion: 'Descripción del Paquete 9',
    Tamaño: 'Pequeño',
  },
  {
    Paquete: 'Paquete 10',
    Descripcion: 'Descripción del Paquete 10',
    Tamaño: 'Grande',
  },
];

export function Packages() {
  return (
    <div className='bg-green-300 w-full h-[calc(100%-40px)] flex justify-center flex-col items-center gap-4 relative'>
      <div className='absolute inset-0 h-full flex justify-center items-center'>
        <Logo className='fill-current text-white w-full h-full max-w-xs max-h-xs sm:max-w-sm sm:max-h-sm md:max-w-md md:max-h-md lg:max-w-lg lg:max-h-lg opacity-25' />
      </div>
      <div className='relative z-10 w-full max-w-full flex flex-col items-center'>
        <Card className='w-full max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-2xl max-h-[100vh] h-auto overflow-y-auto flex flex-col mb-4'>
          <CardHeader>
            <CardTitle className='text-2xl font-montserrat font-bold text-green-400'>Configuración</CardTitle>
            <div className='flex items-center space-x-2'>
              <Search className='fill-current text-green-400 h-[25px] w-[25px]' />
              <Input
                placeholder='buscar paquetes'
                className='h-6 rounded-md text-[12px] font-montserrat placeholder:font-montserrat placeholder:text-[12px] focus-visible:ring-green-400 focus:border-none focus-visible:ring-offset-0'
              />
            </div>
          </CardHeader>
          <CardContent className='h-full overflow-auto scrollbar-edit'>
            <Table className='min-w-full text-xs'>
              <TableHeader className='border-b-8 border-white text-green-400 text-lg'>
                <TableRow className='hover:bg-white'>
                  <TableHead></TableHead>
                  <TableHead>Paquete</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead>Tamaño</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {list.map((item) => (
                  <TableRow
                    className='bg-white hover:bg-white border-b-1 border-white text-black font-roboto text-[15px]'
                    key={item.Paquete}
                  >
                    <TableCell className='flex justify-center items-center'>
                      <Input
                        type='checkbox'
                        className='form-checkbox h-[15px] w-[15px] border-green-400 mr-2 accent-green-400 bg-green-400'
                      />
                    </TableCell>
                    <TableCell>{item.Paquete}</TableCell>
                    <TableCell>{item.Descripcion}</TableCell>
                    <TableCell>{item.Tamaño}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <div className='w-1/3 sm:max-w-sm sm:max-h-sm md:max-w-md md:max-h-md lg:max-w-lg lg:max-h-lg flex justify-between'>
          <Button variant='btnTransparent'>
            <Link to={paths.medicalCenterConfig}>Guardar</Link>
          </Button>
          <Button variant='btnTransparent'>Cancelar</Button>
        </div>
      </div>
    </div>
  );
}
