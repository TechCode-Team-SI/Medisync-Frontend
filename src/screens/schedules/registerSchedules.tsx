import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ScheduleAdded } from 'src/components/alerts/schedules/alertScheduleAdd';
import { UserType } from 'src/components/navbar/userType/userType';
import { Button } from 'src/components/ui/button';
import { Card, CardTitle, CardContent, CardHeader } from 'src/components/ui/card';
import Search from 'src/components/ui/icons/search';
import { Input } from 'src/components/ui/input';
import { TableCell, TableRow, TableBody, Table, TableHead, TableHeader } from 'src/components/ui/table';
import { AddSchedule } from 'src/screens/schedules/addSchedule';

const Horarios = [
  { NombreDoctor: 'Dr. María Gómez', HoraInicio: '08:00 AM', HoraFin: '12:00 PM' },
  { NombreDoctor: 'Dr. Carlos Rivera', HoraInicio: '01:00 PM', HoraFin: '05:00 PM' },
  { NombreDoctor: 'Dra. Ana Torres', HoraInicio: '08:00 AM', HoraFin: '12:00 PM' },
  { NombreDoctor: 'Dr. Pedro Hernández', HoraInicio: '02:00 PM', HoraFin: '06:00 PM' },
];

export function Schedules() {
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para AddSchedule modal
  const [isAddedModalOpen, setIsAddedModalOpen] = useState(false); // Estado para ScheduleAdded modal
  const navigate = useNavigate();

  const handleOpenModal = () => {
    setIsModalOpen(true); // Abre el modal de AddSchedule
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Cierra el modal de AddSchedule
  };

  const handleScheduleAdded = () => {
    setIsModalOpen(false); // Cierra el modal de AddSchedule
    setIsAddedModalOpen(true); // Abre el modal de ScheduleAdded
  };

  const handleContinue = () => {
    setIsAddedModalOpen(false); // Cierra el modal de ScheduleAdded
    navigate('/register-schedules'); // Redirige a la pantalla de Schedules
  };

  return (
    <div className='w-full h-full flex flex-row items-center bg-green-400 relative'>
      <Card className='h-full w-full flex flex-col px-8 sm:px-9 lg:px-10 pt-8 sm:pt-9 lg:pt-10 bg-green-600 border-none rounded-none rounded-l-xl'>
        <Card className='bg-white min-h-[60px] max-h-[60px] w-full mb-4 flex flex-row justify-end items-center px-5 sm:px-10 lg:px-20'>
          <UserType />
        </Card>
        <Card className='bg-white w-full h-full overflow-auto flex flex-col p-6 sm:p-8 lg:p-10 gap-5 relative'>
          <CardHeader className='w-full flex p-3 flex-col gap-5'>
            <CardTitle className='text-green-400 font-montserrat font-bold text-[18px] text-left'>
              HORARIOS MÉDICOS
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
                  <TableHead>Nombre Doctor</TableHead>
                  <TableHead>Hora Inicio</TableHead>
                  <TableHead>Hora Fin</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className='h-[35px]'>
                {Horarios.map((horario) => (
                  <TableRow
                    className='bg-green-600 border-b-2 border-white text-black font-roboto'
                    key={horario.NombreDoctor}
                  >
                    <TableCell>{horario.NombreDoctor}</TableCell>
                    <TableCell>{horario.HoraInicio}</TableCell>
                    <TableCell>{horario.HoraFin}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>

          {/* Botón que abre el modal */}

          <div className='bg-green-400 rounded-full absolute bottom-4 right-4'>
            <Plus className='fill-current text-white w-[50px] h-[50px] cursor-pointer' onClick={handleOpenModal} />
          </div>

          {/* Modal de añadir horario */}
          {isModalOpen && (
            <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
              <div className='bg-white rounded-lg shadow-lg w-[350px] p-6 relative'>
                <AddSchedule onClose={handleCloseModal} onAdd={handleScheduleAdded} />
              </div>
            </div>
          )}

          {/* Modal de confirmación de horario añadido */}
          {isAddedModalOpen && (
            <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
              <div className='bg-white rounded-lg shadow-lg w-[350px] p-6 relative'>
                <ScheduleAdded onContinue={handleContinue} />
              </div>
            </div>
          )}
        </Card>
      </Card>
    </div>
  );
}
