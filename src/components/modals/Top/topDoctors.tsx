import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { Card, CardContent, CardTitle } from 'src/components/ui/card';
import { DialogContent, DialogHeader, DialogTitle } from 'src/components/ui/dialog';
import Logo from 'src/components/ui/icons/logo';
import MedicalStaff from 'src/components/ui/icons/medicalStaff';
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

export function TopDoctors() {
  const { user } = useSessionStore();
  const [selectedTime, setSelectedTime] = useState<StatisticsTimeEnum>();

  const periodos = {
    [StatisticsTimeEnum.ALL_TIME]: 'Todo el tiempo',
    [StatisticsTimeEnum.THIS_YEAR]: 'Este año',
    [StatisticsTimeEnum.THIS_MONTH]: 'Este mes',
    [StatisticsTimeEnum.TODAY]: 'Hoy',
  };

  const { data: datalist } = useQuery({
    queryKey: ['top-doctors', selectedTime],
    queryFn: () =>
      statisticsHttp.getTopMedics({
        time: selectedTime ?? StatisticsTimeEnum.ALL_TIME,
        date: user()?.createdAt ?? new Date(),
      }),
    enabled: !!selectedTime,
  });

  console.log(datalist);

  return (
    <DialogContent className=' max-w-[552px] h-full max-h-[90vh] flex flex-col gap-0 p-0 bg-green-400 border-none rounded-xl sm:max-w-md'>
      <DialogHeader className='gap-4 flex flex-row mx-6 my-1 space-x-4 sm:space-x-6'>
        <Logo className='fill-current text-white h-[50px] w-[50px] sm:h-[69px] sm:w-[60px]' />
        <DialogTitle className='text-white font-montserrat text-[20px] sm:text-[24px] font-medium'>
          TOP 10 <span className='font-bold'>Médicos más Solicitados</span>
        </DialogTitle>
      </DialogHeader>
      <CardContent className='w-full h-full flex flex-col overflow-auto scrollbar-edit rounded-b-xl bg-white p-3 sm:p-6 lg:p-6 gap-5'>
        <Select value={selectedTime} onValueChange={(value) => setSelectedTime(value as StatisticsTimeEnum)}>
          <SelectTrigger
            id='time-selector'
            className='h-8 rounded-none text-green-400 font-roboto font-bold text-base text-[12px]'
          >
            <SelectValue placeholder='Seleccione un período' />
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

        {datalist &&
          datalist.map((Doc) => (
            <Card
              key={Doc.id}
              className='w-full h-24 bg-white border-[0.2px] border-black/5 shadow-lg shadow-black/30 flex flex-row items-center p-5 gap-5'
            >
              <div className='flex-shrink-0 h-[55px] w-[55px] rounded-full bg-green-400 flex flex-col overflow-hidden items-center justify-center'>
                <MedicalStaff className='fill-current text-white h-[30px] w-[35px]' />
              </div>
              <div className='flex flex-col gap-1 grow'>
                <CardTitle className='font-roboto font-bold text-[18px] text-green-400'>{Doc.fullName}</CardTitle>
              </div>
              <div className='flex-shrink-0 h-[40px] w-[40px] rounded-full bg-green-300 flex flex-col overflow-hidden items-center justify-center'>
                <CardTitle className='font-roboto font-bold text-[18px] text-white'>
                  #{datalist.indexOf(Doc) + 1}
                </CardTitle>
              </div>
            </Card>
          ))}
      </CardContent>
    </DialogContent>
  );
}
