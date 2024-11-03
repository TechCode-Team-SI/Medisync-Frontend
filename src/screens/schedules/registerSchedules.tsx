import { Dialog } from '@radix-ui/react-dialog';
import { useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AlertDanger } from 'src/components/alerts/alertDanger';
import { ModalSchedule } from 'src/components/modals/Schedules/modalSchedule';
import { ModalRegisterSpecialty } from 'src/components/modals/Specialty/modalRegisterSpecialty';
import { UserType } from 'src/components/navbar/userType/userType';
import { Button } from 'src/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from 'src/components/ui/card';
import { DialogTrigger } from 'src/components/ui/dialog';
import Search from 'src/components/ui/icons/search';
import { Input } from 'src/components/ui/input';
import { Loading } from 'src/components/ui/loading';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'src/components/ui/table';
import { AddSchedule } from 'src/screens/schedules/addSchedule';
import { ScheduleAdded } from 'src/screens/schedules/alertScheduleAdd'; // Importa tu componente ScheduleAdded
import { SchedulesHttp } from 'src/services/api/Schedules';

export function Schedules() {
  const {
    data: schedules,
    isFetching,
    isRefetching,
    refetch,
  } = useQuery({
    queryKey: [],
    queryFn: SchedulesHttp.getSchedule,
  });

  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para AddSchedule modal
  const [isAddedModalOpen, setIsAddedModalOpen] = useState(false); // Estado para ScheduleAdded modal
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false); // Estado para Error modal
  const [description, setDescription] = useState('');
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
    refetch();
  };

  const handleServerError = (message: string) => {
    setDescription(message);
    setIsModalOpen(false); // Cierra el modal de AddSchedule
    setIsErrorModalOpen(true); // Abre el modal de ScheduleAdded
  };

  const handleContinue = () => {
    setIsAddedModalOpen(false); // Cierra el modal de ScheduleAdded
    navigate('/register-schedules'); // Redirige a la pantalla de Schedules
  };

  if (isFetching || isRefetching) {
    return (
      <div className='w-full h-screen flex justify-center items-center relative'>
        <Loading />
      </div>
    );
  }

  return (
    <div className='w-full h-full flex flex-row items-center bg-green-400 relative'>
      <Card className='h-full w-full flex flex-col px-8 sm:px-9 lg:px-10 pt-8 sm:pt-9 lg:pt-10 bg-green-600 border-none rounded-none rounded-l-xl'>
        <Card className='bg-white min-h-[60px] max-h-[60px] w-full mb-4 flex flex-row justify-end items-center px-5 sm:px-10 lg:px-20'>
          <UserType />
        </Card>
        <Card className='bg-white w-full h-full overflow-auto flex flex-col px-2 relative'>
          <CardHeader className='w-full flex py-3 px-6 flex-col gap-2'>
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
                  <TableHead>Identificador</TableHead>
                  <TableHead>Hora Inicio</TableHead>
                  <TableHead>Hora Fin</TableHead>
                  <TableHead>Tiempo entre citas (min)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className='h-[35px]'>
                {schedules?.data &&
                  schedules.data.map((schedule) => (
                    <TableRow className='bg-green-600 border-b-2 border-white text-black font-roboto' key={schedule.id}>
                      <TableCell>{schedule.name}</TableCell>
                      <TableCell>{schedule.from}</TableCell>
                      <TableCell>{schedule.to}</TableCell>
                      <TableCell>{schedule.slotTime}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className='h-20 flex flex-row-reverse'>
            <Dialog>
              <DialogTrigger asChild>
                <div className='bg-green-400 rounded-full mb-8'>
                  <Plus className='fill-current text-white w-[50px] h-[50px] cursor-pointer' />
                </div>
              </DialogTrigger>
              <ModalSchedule onClose={refetch} />
            </Dialog>
          </CardFooter>
        </Card>
      </Card>
    </div>
  );
}
