import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from 'react';

import { Card, CardContent, CardTitle } from 'src/components/ui/card';
import { DialogContent, DialogHeader, DialogTitle } from 'src/components/ui/dialog';
import Calendar from 'src/components/ui/icons/calendar';
import Logo from 'src/components/ui/icons/logo';
import MedicalStaff from 'src/components/ui/icons/medicalStaff';
import Specialties from 'src/components/ui/icons/specialties';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from 'src/components/ui/select';
import { statisticsHttp } from 'src/services/api/statistics';
import { useSessionStore } from 'src/store/sessionStore';
import { StatisticsTimeEnum } from 'src/utils/constants';

interface TopStatisticsProps {
  label: string;
  title: string;
}

const periodos = {
  [StatisticsTimeEnum.ALL_TIME]: 'Todo el Tiempo',
  [StatisticsTimeEnum.THIS_YEAR]: 'Año',
  [StatisticsTimeEnum.THIS_MONTH]: 'Mes',
  [StatisticsTimeEnum.TODAY]: 'Día',
};

export function TopStatistics({ label, title }: TopStatisticsProps) {
  const { user } = useSessionStore();
  const [selectedTime, setSelectedTime] = useState<StatisticsTimeEnum>();
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>();
  const queryClient = useQueryClient();

  const { data: datalist } = useQuery({
    queryKey: [`top-${label}`, selectedTime, selectedSpecialty],
    queryFn: () =>
      statisticsHttp.getTopStatistics({
        label,
        time: selectedTime ?? StatisticsTimeEnum.ALL_TIME,
        date: user()?.createdAt ?? new Date(),
        specialtyId: selectedSpecialty && selectedSpecialty !== 'none' ? selectedSpecialty : undefined,
      }),
    enabled: !!selectedTime,
  });

  const { data: specialtiesList } = useQuery({
    queryKey: ['specialties'],
    queryFn: statisticsHttp.getAllAvailableSpecialties,
    enabled: true,
  });

  useEffect(() => {
    if (selectedSpecialty) {
      queryClient.invalidateQueries({ queryKey: [`top-${label}`] });
    }
  }, [selectedSpecialty]);

  const getIcon = () => {
    switch (label) {
      case 'medics':
        return <MedicalStaff className='fill-current text-white h-[30px] w-[35px]' />;
      case 'specialties':
        return <Specialties className='fill-current text-white h-[30px] w-[35px]' />;
      case 'weekdays':
        return <Calendar className='fill-current text-white h-[30px] w-[35px]' />;
      default:
        return null;
    }
  };

  return (
    <DialogContent className='max-w-[552px] h-full max-h-[90vh] flex flex-col gap-0 p-0 bg-green-400 border-none rounded-xl sm:max-w-md'>
      <DialogHeader className='gap-4 flex flex-row mx-6 my-1 space-x-4 sm:space-x-6'>
        <Logo className='fill-current text-white h-[50px] w-[50px] sm:h-[69px] sm:w-[60px]' />
        <DialogTitle className='text-white font-montserrat text-[20px] sm:text-[24px] font-medium'>
          TOP 10 <span className='font-bold'>{title}</span>
        </DialogTitle>
      </DialogHeader>
      <CardContent className='w-full h-full flex flex-col overflow-auto scrollbar-edit rounded-b-xl bg-white p-2 sm:p-4 lg:p-4 gap-4'>
        <Select value={selectedTime} onValueChange={(value) => setSelectedTime(value as StatisticsTimeEnum)}>
          <SelectTrigger
            id='time-selector'
            className='h-8 rounded-none text-green-400 font-roboto font-bold text-base text-[12px]'
          >
            <SelectValue placeholder='Seleccione un Período' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Período</SelectLabel>
              {Object.entries(periodos).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {label !== 'specialties' && (
          <Select value={selectedSpecialty} onValueChange={(value) => setSelectedSpecialty(value)}>
            <SelectTrigger
              id='specialty-selector'
              className='h-8 rounded-none text-green-400 font-roboto font-bold text-base text-[12px]'
            >
              <SelectValue placeholder='Seleccione una Especialidad' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Especialidad</SelectLabel>
                <SelectItem key='none' value='none'>
                  Ninguna
                </SelectItem>
                {specialtiesList?.data.map((specialty) => (
                  <SelectItem key={specialty.id} value={specialty.id}>
                    {specialty.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}

        {datalist &&
          datalist.map((item) => (
            <Card
              key={item.name}
              className='w-full h-24 bg-white border-[0.2px] border-black/5 shadow-lg shadow-black/30 flex flex-row items-center p-5 gap-5'
            >
              <div className='flex-shrink-0 h-[55px] w-[55px] rounded-full bg-green-400 flex flex-col overflow-hidden items-center justify-center'>
                {getIcon()}
              </div>
              <div className='flex flex-col gap-1 grow'>
                <CardTitle className='font-roboto font-bold text-[18px] text-green-400'>{item.name}</CardTitle>
                <span className='font-roboto text-[16px] text-gray-500'>
                  {item.requests} {item.requests === 1 ? 'cita' : 'citas'}
                </span>
              </div>
              <div className='flex-shrink-0 h-[40px] w-[40px] rounded-full bg-green-300 flex flex-col overflow-hidden items-center justify-center'>
                <CardTitle className='font-roboto font-bold text-[18px] text-white ml-1'>
                  {datalist.indexOf(item) + 1}°
                </CardTitle>
              </div>
            </Card>
          ))}
      </CardContent>
    </DialogContent>
  );
}