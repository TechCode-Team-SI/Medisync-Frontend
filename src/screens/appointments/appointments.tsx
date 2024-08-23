import { UserType } from 'src/components/navbar/userType/userType';
import { Sidebar } from 'src/components/sidebar/sidebar';
import { Button } from 'src/components/ui/button';
import { Card, CardTitle, CardContent, CardHeader } from 'src/components/ui/card';
import Search from 'src/components/ui/icons/search';
import View from 'src/components/ui/icons/view';
import { Input } from 'src/components/ui/input';
import { TableCell, TableRow, TableBody, Table, TableHead, TableHeader } from 'src/components/ui/table';

const Pacientes = [
  {
    Paciente: 'Juan Pérez',
    Edad: '45',
    Fecha: '2024-08-20 10:00 AM',
    Medico: 'Dr. María Gómez',
    Estatus: 'Pendiente',
  },
  {
    Paciente: 'Laura Martínez',
    Edad: '32',
    Fecha: '2024-08-21 08:00 AM',
    Medico: 'Dr. Carlos Rivera',
    Estatus: 'Atendido',
  },
  {
    Paciente: 'Miguel Rodríguez',
    Edad: '50',
    Fecha: '2024-08-22 10:00 PM',
    Medico: 'Dra. Ana Torres',
    Estatus: 'Cancelado',
  },
  {
    Paciente: 'Lucía Sánchez',
    Edad: '28',
    Fecha: '2024-08-23 12:00 AM',
    Medico: 'Dr. Pedro Hernández',
    Estatus: 'Pendiente',
  },
  {
    Paciente: 'Roberto Gutiérrez',
    Edad: '60',
    Fecha: '2024-08-24 10:00 AM',
    Medico: 'Dr. José Fernández',
    Estatus: 'Atendido',
  },
  {
    Paciente: 'Roberto Gutiérrez',
    Edad: '60',
    Fecha: '2024-08-24 10:00 AM',
    Medico: 'Dr. José Fernández',
    Estatus: 'Atendido',
  },
  {
    Paciente: 'Roberto Gutiérrez',
    Edad: '60',
    Fecha: '2024-08-24 10:00 AM',
    Medico: 'Dr. José Fernández',
    Estatus: 'Atendido',
  },
  {
    Paciente: 'Roberto Gutiérrez',
    Edad: '60',
    Fecha: '2024-08-24 10:00 AM',
    Medico: 'Dr. José Fernández',
    Estatus: 'Atendido',
  },
  {
    Paciente: 'Roberto Gutiérrez',
    Edad: '60',
    Fecha: '2024-08-24 10:00 AM',
    Medico: 'Dr. José Fernández',
    Estatus: 'Atendido',
  },
  {
    Paciente: 'Roberto Gutiérrez',
    Edad: '60',
    Fecha: '2024-08-24 10:00 AM',
    Medico: 'Dr. José Fernández',
    Estatus: 'Atendido',
  },
];

export function Appointments() {
  return (
    <div className='w-full h-full flex flex-row items-center relative'>
      <Card className='h-full w-[316px] bg-green-400 border-none rounded-none'>
        <Sidebar></Sidebar>
      </Card>
      <Card className='h-full w-[calc(100%-285px)] p-10 bg-green-600 border-none absolute left-72 rounded-none rounded-l-xl'>
        <Card className='bg-white h-[50px] w-full mb-4 flex fles-rows justify-end items-center px-20'>
          <UserType></UserType>
        </Card>
        <Card className='bg-white w-full h-full flex flex-col p-8 gap-5'>
          <CardHeader className='w-full flex p-3 flex-col gap-5'>
            <CardTitle className=' text-green-400 font-montserrat font-bold text-[18px] text-left'>
              CITAS MÉDICAS
            </CardTitle>
            <div className='w-full h-full flex flex-row gap-5'>
              <Input
                placeholder='Buscar'
                className='w-full h-[36px] bg-green-100/50 border-none rounded-md text-[12px] font-montserrat placeholder:text-green-400 placeholder:font-roboto placeholder:font-bold placeholder:text-[15px] focus-visible:ring-green-400'
              ></Input>
              <Button variant='btnGreen' className='h-[36px]'>
                <Search className='h-[17px] w-[17px] fill-current text-white mr-2' />
                Buscar
              </Button>
            </div>
          </CardHeader>
          <CardContent className='h-full p-3 overflow-auto scrollbar-edit'>
            <Table className='min-w-full text-sm'>
              <TableHeader className='border-b-8 border-white bg-green-500   text-white'>
                <TableRow className='hover:bg-green-500'>
                  <TableHead>Paciente</TableHead>
                  <TableHead>Edad</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Medico</TableHead>
                  <TableHead>Estatus</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className='h-[35px]'>
                {Pacientes.map((Pacientes) => (
                  <TableRow
                    className='bg-green-600 border-b-2 border-white text-black font-roboto'
                    key={Pacientes.Paciente}
                  >
                    <TableCell>{Pacientes.Paciente}</TableCell>
                    <TableCell>{Pacientes.Edad}</TableCell>
                    <TableCell>{Pacientes.Fecha}</TableCell>
                    <TableCell>{Pacientes.Medico}</TableCell>
                    <TableCell>{Pacientes.Estatus}</TableCell>
                    <TableCell className='flex justify-center items-center'>
                      <View className='fill-current text-green-400 h-4 w-4' />
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
