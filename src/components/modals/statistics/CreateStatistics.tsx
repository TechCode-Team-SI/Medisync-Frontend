import { Dispatch, SetStateAction } from 'react';

import { Button } from 'src/components/ui/button';
import { CardContent } from 'src/components/ui/card';
import { DialogClose, DialogContent, DialogHeader, DialogTitle } from 'src/components/ui/dialog';
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
import { FilteredByType, StatisticType } from 'src/utils/constants';

interface CreateStatistics {
  statisticType?: StatisticType;
  setStatisticType?: Dispatch<SetStateAction<StatisticType | undefined>>;
  filteredByType?: FilteredByType;
  setFilteredByType?: Dispatch<SetStateAction<FilteredByType | undefined>>;
}

export function CreateStatistics({
  statisticType,
  filteredByType,
  setStatisticType,
  setFilteredByType,
}: CreateStatistics) {
  const statistic = {
    [StatisticType.HISTOGRAM]: 'Grafica de Barra',
    [StatisticType.TART]: 'Grafica de Torta',
  };

  const Filtered = {
    [FilteredByType.NONE]: 'Ninguno',
    [FilteredByType.SPECIALTY]: 'Especialidad',
  };

  return (
    <DialogContent className=' max-w-[552px] max-h-[90vh] flex flex-col gap-0 p-0 bg-green-400 border-none rounded-xl sm:max-w-md'>
      <DialogHeader className='gap-4 flex flex-row mx-6 my-1 space-x-4 sm:space-x-6'>
        <Logo className='fill-current text-white h-[50px] w-[50px] sm:h-[69px] sm:w-[60px]' />
        <DialogTitle className='text-white font-montserrat text-[20px] sm:text-[24px] font-medium'>
          Generar Grafica <span className='font-bold'>Para Estadisticas</span>
        </DialogTitle>
      </DialogHeader>
      <CardContent className='w-full h-full flex flex-col overflow-auto scrollbar-edit rounded-b-xl bg-white p-3 sm:p-6 lg:p-6 gap-5'>
        <Select value={statisticType} onValueChange={(value) => setStatisticType?.(value as StatisticType)}>
          <SelectTrigger
            id='statistic-type-selector'
            className='h-8 rounded-none text-green-400 font-roboto font-bold text-base text-[12px]'
          >
            <SelectValue placeholder='Seleccione un tipo de estadística' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Tipo de Grafica</SelectLabel>
              {Object.entries(statistic).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select value={filteredByType} onValueChange={(value) => setFilteredByType?.(value as FilteredByType)}>
          <SelectTrigger
            id='time-selector'
            className='h-8 rounded-none text-green-400 font-roboto font-bold text-base text-[12px]'
          >
            <SelectValue placeholder='Como desea agrupar la informacion?' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Filtro</SelectLabel>
              {Object.entries(Filtered).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className='flex flex-row justify-center p-4'>
          <DialogClose asChild>
            <Button className='w-[163px] h-[46px] mr-4' type='submit' variant={'btnGreen'}>
              Guardar
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button className='w-[163px] h-[46px]' type='button' variant={'btnGray'}>
              Cancelar
            </Button>
          </DialogClose>
        </div>
      </CardContent>
    </DialogContent>
  );
}
