import * as React from 'react';
import { Link } from 'react-router-dom';

import { UserType } from 'src/components/navbar/userType/userType';
import { Button } from 'src/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from 'src/components/ui/card';
import Edit from 'src/components/ui/icons/edit';
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'src/components/ui/table';

const Agendas = [
  { Agenda: 'Agenda 1' },
  { Agenda: 'Agenda 2' },
  { Agenda: 'Agenda 3' },
  { Agenda: 'Agenda 4' },
  { Agenda: 'Agenda 5' },
  { Agenda: 'Agenda 6' },
  { Agenda: 'Agenda 7' },
  { Agenda: 'Agenda 8' },
  { Agenda: 'Agenda 9' },
  { Agenda: 'Agenda 10' },
  { Agenda: 'Agenda 11' },
  { Agenda: 'Agenda 12' },
  { Agenda: 'Agenda 13' },
  { Agenda: 'Agenda 14' },
];

export function EditWorkAgenda() {
  const itemsPerPage = 8; // Número de elementos por página
  const [currentPage, setCurrentPage] = React.useState(1);

  // Calcula los elementos a mostrar en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Agendas.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(Agendas.length / itemsPerPage);

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className='w-full h-screen flex flex-row items-center bg-green-400 relative'>
      <Card className='h-full w-full flex flex-col px-8 sm:px-9 lg:px-10 pt-8 sm:pt-9 lg:pt-10 bg-green-600 border-none rounded-none rounded-l-xl'>
        <Card className='bg-white min-h-[60px] max-h-[60px] w-full mb-4 flex flex-row justify-end items-center px-5 sm:px-10 lg:px-20'>
          <UserType />
        </Card>
        <Card className='bg-white w-full h-full overflow-auto flex flex-col p-6 sm:p-8 lg:p-10'>
          <CardHeader className='w-full flex p-3 flex-col gap-5'>
            <CardTitle className=' text-green-400 font-montserrat font-bold text-[18px] text-left'>
              EDITAR AGENDA
            </CardTitle>
            <div className='w-full h-full flex flex-row gap-5'>
              <Input
                placeholder='Buscar'
                className='w-full h-[36px] bg-green-100/50 border-none rounded-md text-[15px] font-montserrat placeholder:text-green-400 placeholder:font-roboto placeholder:font-bold placeholder:text-[15px] focus-visible:ring-green-400'
              />
              <Button variant='btnGreen' className='h-[36px]'>
                <Search className='h-[17px] w-[17px] fill-current text-white mr-2' />
                Buscar
              </Button>
            </div>
          </CardHeader>
          <CardContent className='h-full p-3 overflow-auto scrollbar-edit'>
            <Table className='min-w-full text-sm'>
              <TableHeader className='border-b-8 border-white bg-green-500 text-white'>
                <TableRow className='hover:bg-green-500'>
                  <TableHead className='text-left'>Nombre</TableHead>
                  <TableHead className='text-right'>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className='h-[35px]'>
                {currentItems.map((agenda) => (
                  <TableRow className='bg-green-600 border-b-2 border-white text-black font-roboto' key={agenda.Agenda}>
                    <TableCell className='px-4 text-left'>{agenda.Agenda}</TableCell>
                    <TableCell className='flex justify-end items-center mr-10'>
                      <Link to='/editAgenda'>
                        <Edit className='fill-current text-green-400 h-4 w-4' />
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
