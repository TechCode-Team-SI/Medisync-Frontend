import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from 'react';

import { CardContent } from 'src/components/ui/card';
import ChartGraph from 'src/components/ui/ChartGraph';
import { DialogContent, DialogHeader, DialogTitle } from 'src/components/ui/dialog';
import Logo from 'src/components/ui/icons/logo';
import { Label } from 'src/components/ui/label';
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
import {
  ChartTypeEnum,
  DemographicFilter,
  GenderEnum,
  StatisticsTimeEnum,
  StatisticsTimeUnitEnum,
} from 'src/utils/constants';

export function DemographicChart() {
  const { user } = useSessionStore();
  const [selectedTime, setSelectedTime] = useState<StatisticsTimeEnum>();
  const [selectedFilter, setSelectedFilter] = useState<DemographicFilter>();
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>();
  const [selectedGender, setSelectedGender] = useState<GenderEnum>();
  const [age, setAge] = useState(['', '']);
  const [selectedOption, setSelectedOption] = useState<string>();

  const queryClient = useQueryClient();

  const handleChange = (index: number, value: string): void => {
    if (/^\d*$/.test(value) || value === '-') {
      const newAge = [...age];
      newAge[index] = value;

      if (value.length === 2 && index < 1) {
        const nextInput = document.getElementById(`age-input-${index + 1}`);
        if (nextInput) {
          if (newAge[index + 1] !== '') {
            newAge[index + 1] = '';
          }
          nextInput.focus();
        }
      }

      setAge(newAge);
    }
  };

  const periodos = {
    [StatisticsTimeEnum.ALL_TIME]: 'Todo el Tiempo',
    [StatisticsTimeEnum.THIS_YEAR]: 'Año',
    [StatisticsTimeEnum.THIS_MONTH]: 'Mes',
    [StatisticsTimeEnum.TODAY]: 'Día',
  };

  const diagnosis = {
    [DemographicFilter.SEX]: 'Sexo',
    [DemographicFilter.AGE]: 'Edad',
    [DemographicFilter.DETAILED]: 'Detallado',
  };

  const genders = {
    [GenderEnum.MALE]: 'Masculino',
    [GenderEnum.FEMALE]: 'Femenino',
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
      case DemographicFilter.DETAILED:
        return ChartTypeEnum.BAR;
    }
  })();

  const { data: datalist } = useQuery({
    queryKey: ['demographic', selectedTime, selectedFilter, selectedSpecialty, selectedGender, age, selectedOption],
    queryFn: () =>
      statisticsHttp.getTopStatisticsChart(
        {
          time: selectedTime ?? StatisticsTimeEnum.ALL_TIME,
          date: user()?.createdAt ?? new Date(),
          specialtyId: selectedSpecialty && selectedSpecialty !== 'none' ? selectedSpecialty : undefined,
          label: selectedFilter ?? DemographicFilter.SEX,
          gender: selectedGender ?? undefined,
          ageFrom: Number(age[0]) ?? undefined,
          ageTo: Number(age[1]) ?? undefined,
          grouping: timeUnit,
          filterByMe: selectedOption !== 'none' ? selectedOption : undefined,
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

  const timeUnit = (() => {
    switch (selectedTime) {
      case StatisticsTimeEnum.ALL_TIME:
        return StatisticsTimeUnitEnum.YEAR;
      case StatisticsTimeEnum.THIS_YEAR:
        return StatisticsTimeUnitEnum.MONTH;
      case StatisticsTimeEnum.THIS_MONTH:
        return StatisticsTimeUnitEnum.DAY;
      case StatisticsTimeEnum.TODAY:
        return StatisticsTimeUnitEnum.HOUR;
      default:
        return undefined;
    }
  })();

  console.log(datalist);

  return (
    <DialogContent className=' max-w-[50%] h-fit max-h-[90vh] flex flex-col gap-0 p-0 bg-green-400 border-none rounded-xl'>
      <DialogHeader className='gap-4 flex flex-row mx-6 my-1 space-x-4 sm:space-x-6'>
        <Logo className='fill-current text-white h-[50px] w-[50px] sm:h-[69px] sm:w-[60px]' />
        <DialogTitle className='text-white font-montserrat text-[20px] sm:text-[24px] font-medium'>
          Gráficos por<span className='font-bold'> Categorías Demográficas</span>
        </DialogTitle>
      </DialogHeader>
      <CardContent className='w-full min-h-[360px] flex rounded-b-xl bg-white p-2 sm:p-4 lg:p-4 gap-4'>
        <div className='w-[40%] h-full flex flex-col gap-4'>
          <Select
            value={selectedFilter}
            onValueChange={(value) => {
              setSelectedFilter(value as DemographicFilter);
              setSelectedGender(undefined);
            }}
          >
            <SelectTrigger
              id='element-selector'
              className='h-8 rounded-none text-green-400 font-roboto font-bold text-base text-[12px]'
            >
              <SelectValue placeholder='Seleccione una Categoría' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categoría</SelectLabel>
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
          {selectedFilter === DemographicFilter.DETAILED && (
            <>
              <Select value={selectedGender} onValueChange={(value) => setSelectedGender(value as GenderEnum)}>
                <SelectTrigger
                  id='gender-selector'
                  className='h-8 rounded-none text-green-400 font-roboto font-bold text-base text-[12px]'
                >
                  <SelectValue placeholder='Seleccione un Sexo' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Sexo</SelectLabel>
                    {Object.entries(genders).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Label className='leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-green-400 font-bold text-center text-[12px]'>
                Rango de Edad
              </Label>

              <div className='w-full flex gap-4'>
                {age.map((digit, index) => (
                  <input
                    key={index}
                    id={`age-input-${index}`}
                    type='text'
                    value={digit}
                    placeholder='Edad'
                    onChange={(e) => handleChange(index, e.target.value)}
                    maxLength={2}
                    className='bg-green-600 px-3 py-2 h-8 rounded-none text-green-400 font-roboto font-bold text-[12px] focus:outline-green-500 flex w-full border-none ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300'
                  />
                ))}
              </div>
              <Select value={selectedOption} onValueChange={(value) => setSelectedOption(value)}>
                <SelectTrigger
                  id='gender-selector'
                  className='h-8 rounded-none text-green-400 font-roboto font-bold text-base text-[12px]'
                >
                  <SelectValue placeholder='Seleccione la Fuente de Datos' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Fuente de Datos</SelectLabel>
                    <SelectItem key='none' value='none'>
                      Todas las Citas
                    </SelectItem>
                    <SelectItem key='personal' value='personal'>
                      Mis Citas
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </>
          )}
        </div>

        <div className='w-[60%] flex-1 justify-center items-center gap-4'>
          {datalist && (
            <ChartGraph
              dataChart={datalist}
              heightMax={320}
              className='flex-1 w-full shadow-sm shadow-black/30 rounded-lg border border-gray-300'
            />
          )}
        </div>
      </CardContent>
    </DialogContent>
  );
}
