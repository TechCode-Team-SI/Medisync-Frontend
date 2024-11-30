import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from 'react';

import { CardContent } from 'src/components/ui/card';
import ChartGraph from 'src/components/ui/ChartGraph';
import { DialogContent, DialogHeader, DialogTitle } from 'src/components/ui/dialog';
import Logo from 'src/components/ui/icons/logo';
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
import { ChartTypeEnum, DemographicFilter, StatisticsTimeEnum } from 'src/utils/constants';

export function DemographicChart() {
  const { user } = useSessionStore();
  const [selectedTime, setSelectedTime] = useState<StatisticsTimeEnum>();
  const [selectedFilter, setSelectedFilter] = useState<DemographicFilter>();
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | undefined>(undefined);
  const queryClient = useQueryClient();

  const periodos = {
    [StatisticsTimeEnum.ALL_TIME]: 'Todo el tiempo',
    [StatisticsTimeEnum.THIS_YEAR]: 'Este año',
    [StatisticsTimeEnum.THIS_MONTH]: 'Este mes',
    [StatisticsTimeEnum.TODAY]: 'Hoy',
  };

  const diagnosis = {
    [DemographicFilter.SEX]: 'Sexo',
    [DemographicFilter.AGE]: 'Edad',
  };

  const { data: specialtiesList } = useQuery({
    queryKey: ['specialties'],
    queryFn: statisticsHttp.getAllAvailableSpecialties,
    enabled: true,
  });

  const chartType = (() => {
    switch (selectedFilter) {
      case DemographicFilter.SEX:
        return ChartTypeEnum.PIE;
      case DemographicFilter.AGE:
        return ChartTypeEnum.BAR;
    }
  })();

  const { data: datalist } = useQuery({
    queryKey: ['demographic', selectedTime, selectedFilter, selectedSpecialty],
    queryFn: () =>
      statisticsHttp.getTopStatisticsChart(
        {
          time: selectedTime ?? StatisticsTimeEnum.ALL_TIME,
          date: user()?.createdAt ?? new Date(),
          specialtyId: selectedSpecialty && selectedSpecialty !== 'none' ? selectedSpecialty : undefined,
          label: selectedFilter ?? DemographicFilter.SEX,
        },
        chartType ?? ChartTypeEnum.PIE,
      ),
    enabled: !!selectedTime && !!selectedFilter,
  });

  useEffect(() => {
    if (selectedSpecialty) {
      queryClient.invalidateQueries({ queryKey: ['demographic'] });
    }
  }, [selectedSpecialty]);

  console.log(datalist);

  return (
    <DialogContent className=' max-w-[552px] h-full max-h-[90vh] flex flex-col gap-0 p-0 bg-green-400 border-none rounded-xl sm:max-w-md'>
      <DialogHeader className='gap-4 flex flex-row mx-6 my-1 space-x-4 sm:space-x-6'>
        <Logo className='fill-current text-white h-[50px] w-[50px] sm:h-[69px] sm:w-[60px]' />
        <DialogTitle className='text-white font-montserrat text-[20px] sm:text-[24px] font-medium'>
          Gráficos por<span className='font-bold'> Categorías Demográficas</span>
        </DialogTitle>
      </DialogHeader>
      <CardContent className='w-full h-full flex flex-col rounded-b-xl bg-white p-2 sm:p-4 lg:p-4 gap-4'>
        <Select value={selectedFilter} onValueChange={(value) => setSelectedFilter(value as DemographicFilter)}>
          <SelectTrigger
            id='element-selector'
            className='h-8 rounded-none text-green-400 font-roboto font-bold text-base text-[12px]'
          >
            <SelectValue placeholder='Seleccione una Categoria' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Período</SelectLabel>
              {Object.entries(diagnosis).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

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

        {datalist && (
          <div className='w-full h-auto justify-center items-center gap-5'>
            <ChartGraph dataChart={datalist} heightMax={320} className='' />
          </div>
        )}
      </CardContent>
    </DialogContent>
  );
}
