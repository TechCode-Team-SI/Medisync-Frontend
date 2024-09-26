import * as React from 'react';
import { Link } from 'react-router-dom';

import { UserType } from 'src/components/navbar/userType/userType';
import { Button } from 'src/components/ui/button';
import { Card, CardTitle, CardContent, CardHeader } from 'src/components/ui/card';
import Attend from 'src/components/ui/icons/attend';
import Search from 'src/components/ui/icons/search';
import { Input } from 'src/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from 'src/components/ui/pagination';
import { TableCell, TableRow, TableBody, Table, TableHead, TableHeader } from 'src/components/ui/table';
import { paths } from 'src/paths';

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
];

export function AttendAppointment() {
  const itemsPerPage = 8; // Número de elementos por página
  const [currentPage, setCurrentPage] = React.useState(1);

  // Calcula los elementos a mostrar en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Pacientes.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(Pacientes.length / itemsPerPage);

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  return (
    <div className='w-full h-full flex flex-row items-center bg-green-400 relative'>
      <Card className='h-full w-full flex flex-col px-8 sm:px-9 lg:px-10 pt-8 sm:pt-9 lg:pt-10 bg-green-600 border-none rounded-none rounded-l-xl'>
        <Card className='bg-white min-h-[60px] max-h-[60px] w-full mb-4 flex fles-row justify-end items-center px-5 sm:px-10 lg:px-20'>
          <UserType />
        </Card>
        <Card className='bg-white w-full h-full overflow-auto flex flex-col p-6 sm:p-8 lg:p-10'>
          <CardHeader className='w-full flex p-3 flex-col gap-5'>
            <CardTitle className=' text-green-400 font-montserrat font-bold text-[18px] text-left'>
              CITAS MÉDICAS
            </CardTitle>
            <div className='w-full h-full flex flex-row space-x-5'>
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
                {currentItems.map((Pacientes) => (
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
                      <Link to={paths.createReference}>
                        <Attend className='fill-current text-green-400 h-4 w-4' />
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Pagination className='mt-4 space-x-1'>
              <PaginationPrevious
                onClick={goToPreviousPage}
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
              />
              <PaginationContent>
                {Array.from({ length: totalPages }, (_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      className='border-green-400 font-montserrat'
                      isActive={currentPage === index + 1}
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
              </PaginationContent>
              <PaginationNext
                onClick={goToNextPage}
                className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
              />
            </Pagination>
          </CardContent>
        </Card>
      </Card>
    </div>
  );
}
