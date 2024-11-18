import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { AlertCheck } from 'src/components/alerts/alertCheck';
import { SelectDays } from 'src/components/modals/agenda/selectDays';
import { Button } from 'src/components/ui/button';
import { CardTitle, CardContent } from 'src/components/ui/card';
import { Checkbox } from 'src/components/ui/checkbox';
import { DialogTrigger, Dialog } from 'src/components/ui/dialog';
import { Form, FormField, FormItem } from 'src/components/ui/form';
import Spinner from 'src/components/ui/icons/spinner';
import Trash from 'src/components/ui/icons/trash';
import { Input } from 'src/components/ui/input';
import { Label } from 'src/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'src/components/ui/table';
import { paths } from 'src/paths';
import { AgendaHttp } from 'src/services/api/agenda';
import { Agenda } from 'src/services/api/interface';

import { agendaSchema, AgendaSchema } from './agendaSchema';

const diasSemana = [
  { id: '1', name: 'LUNES' },
  { id: '2', name: 'MARTES' },
  { id: '3', name: 'MIERCOLES' },
  { id: '4', name: 'JUEVES' },
  { id: '5', name: 'VIERNES' },
  { id: '6', name: 'SABADO' },
  { id: '7', name: 'DOMINGO' },
];

interface FormAgenda {
  defaultAgenda: Agenda | null;
}

type DateRange2 = {
  id?: string;
  from: Date | undefined;
  to?: Date | undefined;
};

export function FormAgenda({ defaultAgenda }: FormAgenda) {
  const navigate = useNavigate();
  const [, setOpenModal] = useState(false);
  const [datePicked, setDatePicked] = useState<DateRange2[]>([]);

  useEffect(() => {
    if (defaultAgenda?.daysOffs) {
      const convertedDates = defaultAgenda.daysOffs.map((date) => ({
        from: new Date(date.from),
        to: new Date(date.to),
      }));
      setDatePicked(convertedDates);
    }
  }, [defaultAgenda]);

  const handleDateSelect = (dateSelect: DateRange2) => {
    const dateExists = datePicked.some(
      (date) => date.from?.getTime() === dateSelect.from?.getTime() && date.to?.getTime() === dateSelect.to?.getTime(),
    );
    if (!dateExists) {
      setDatePicked((prev) => [...prev, dateSelect]);
      setOpenModal(false);
    } else {
      toast.error('La fecha seleccionada ya existe');
    }
  };

  const form = useForm<AgendaSchema>({
    resolver: zodResolver(agendaSchema),
    defaultValues: defaultAgenda
      ? {
          name: defaultAgenda.name ?? null,
          weekdays: defaultAgenda.weekdays ?? [],
          from: defaultAgenda.from ?? null,
          to: defaultAgenda.to ?? null,
          slotTime: defaultAgenda.slotTime.toString() ?? null,
        }
      : {
          weekdays: [],
        },
  });

  const RegisterAgenda = useMutation({
    mutationKey: [''],
    mutationFn: AgendaHttp.postAgenda,
    onSuccess: () => {
      console.log('Creada');
      navigate(paths.workagenda);
    },
    onError: () => {
      console.log('no funciono');
      console.log(RegisterAgenda.error?.message);
      toast.error('No se Creo Correctamente la Agenda');
    },
  });

  const EditAgenda = useMutation({
    mutationKey: [''],
    mutationFn: AgendaHttp.patchAgenda,
    onSuccess: () => {
      console.log('Creada');
      navigate(paths.editworkagenda);
    },
    onError: () => {
      console.log('no funciono');
      console.log(RegisterAgenda.error?.message);
      toast.error('No se Edito Correctamente la Agenda');
    },
  });

  const onSubmit = (data: AgendaSchema) => {
    if (defaultAgenda?.id) {
      EditAgenda.mutate({
        id: defaultAgenda.id,
        name: data.name,
        weekdays: data.weekdays,
        from: data.from,
        to: data.to,
        slotTime: parseInt(data.slotTime),
        daysOffs: datePicked.map((range) => ({
          id: range.id ? range.id : '',
          from: range.from ? range.from.toISOString() : '',
          to: range.to ? range.to.toISOString() : '',
        })),
      });
    } else {
      RegisterAgenda.mutate({
        name: data.name,
        weekdays: data.weekdays,
        from: data.from,
        to: data.to,
        slotTime: parseInt(data.slotTime),
        daysOffs: datePicked.map((range) => ({
          from: range.from ? range.from.toISOString() : '',
          to: range.to ? range.to.toISOString() : '',
        })),
      });
    }
  };

  return (
    <Form {...form}>
      <form className='space-y-4 ' onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className='w-full flex flex-col space-y-5'>
          <div className='w-full space-y-[2px]'>
            <Label className='text-green-400 font-roboto text-base'>Nombre de la Agenda</Label>
            <Input
              id='name'
              className='w-full h-[36px] bg-green-100/50 border-none rounded-none text-[15px] font-montserrat placeholder:text-green-400 placeholder:font-roboto placeholder:font-bold placeholder:text-[15px] focus-visible:ring-green-400'
              {...form.register('name')}
            />
            {form.formState.errors.name && <span className='text-red-500'>{form.formState.errors.name.message}</span>}
          </div>
          <CardTitle className='text-green-400 font-montserrat font-bold text-[15px] text-left'>
            DÍAS LABORABLES
          </CardTitle>
          <CardContent className=''>
            <TableBody className='grid grid-cols-2'>
              {diasSemana.map((dia) => (
                <TableRow className='border-b-0' key={dia.id}>
                  <TableCell>
                    <div className='flex px-4 w-[218px] '>
                      <FormField
                        control={form.control}
                        name='weekdays'
                        render={({ field }) => (
                          <FormItem>
                            <Checkbox
                              checked={field.value.includes(dia.name)}
                              onCheckedChange={(checked) => {
                                const newValue = field.value;
                                return checked
                                  ? field.onChange([...newValue, dia.name])
                                  : field.onChange(newValue.filter((agenda) => agenda !== dia.name));
                              }}
                              className='flex text-center justify-center w-[20px] h-[20px] mr-1 border-2 border-green-400'
                            />
                          </FormItem>
                        )}
                      />
                      <Label className='text-green-400 font-roboto font-bold h-5 text-[14px] justify-center flex text-center'>
                        {dia.name}
                      </Label>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

            <div className='p-2 flex flex-col gap-3 mt-3'>
              {/* Hora Inicio y Hora Fin */}
              <div className='flex justify-between gap-2'>
                <div className='flex flex-col w-1/2'>
                  <label htmlFor='schedule-from' className='text-sm text-green-400 font-bold'>
                    HORA INICIO
                  </label>
                  <Input
                    {...form.register('from')}
                    id='schedule-from'
                    placeholder='HH:MM'
                    className='mt-1 w-full h-[35px] bg-green-100/50 border-none rounded-md text-[14px] placeholder:text-green-300 focus-visible:ring-green-400'
                  />
                  {form.formState.errors.from && (
                    <div className='flex column-flex'>
                      <span className='text-red-500 absolute'>{form.formState.errors.from.message}</span>
                    </div>
                  )}
                </div>

                <div className='flex flex-col w-1/2'>
                  <label htmlFor='schedule-to' className='text-sm text-green-400 font-bold'>
                    HORA FIN
                  </label>
                  <Input
                    {...form.register('to')}
                    id='schedule-to'
                    placeholder='HH:MM'
                    className='mt-1 w-full h-[35px] bg-green-100/50 border-none rounded-md text-[14px] placeholder:text-green-300 focus-visible:ring-green-400'
                  />
                  {form.formState.errors.to && (
                    <div className='flex column-flex'>
                      <span className='text-red-500 absolute'>{form.formState.errors.to.message}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Tiempo entre citas (minutos) */}
              <div className='flex flex-col'>
                <label htmlFor='schedule-slotTime' className='text-sm text-green-400 font-bold'>
                  Tiempo entre citas (minutos)
                </label>
                <Input
                  {...form.register('slotTime')}
                  id='schedule-slotTime'
                  placeholder='Ingrese el tiempo'
                  className='mt-1 w-full h-[35px] bg-green-100/50 border-none rounded-md text-[14px] placeholder:text-green-300 focus-visible:ring-green-400'
                />
                {form.formState.errors.slotTime && (
                  <div className='flex column-flex'>
                    <span className='text-red-500 absolute'>{form.formState.errors.slotTime.message}</span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
          <div className='flex flex-col mt-6'>
            <CardTitle className='text-green-400 font-montserrat font-bold text-[15px] text-left'>
              DÍAS NO LABORABLES
            </CardTitle>
            <div className='px-4 sm:px-6 py-4 sm:py-6 overflow-x-auto'>
              <Table className='min-w-full text-sm'>
                <TableHeader className='border-b-8 border-white bg-green-500 text-white'>
                  <TableRow className='hover:bg-green-500'>
                    <TableHead className='w-auto text-[12px] text-left'>Días Inicial</TableHead>
                    <TableHead className='w-auto text-[12px] text-left'>Días Final</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {datePicked &&
                    datePicked.map((nonWorkingDay) => (
                      <TableRow
                        className='bg-green-600 border-b-2 border-white text-black font-roboto'
                        key={nonWorkingDay.from ? nonWorkingDay.from.toString() : 'sin-fecha'}
                      >
                        <TableCell className='pl-4 text-left'>
                          {nonWorkingDay.from ? format(nonWorkingDay.from, 'P', { locale: es }) : 'Sin fecha'}
                        </TableCell>
                        <TableCell className='pl-4 text-left'>
                          {nonWorkingDay.to ? format(nonWorkingDay.to, 'P', { locale: es }) : 'Sin fecha'}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              <div className='flex justify-end mt-4'>
                <Button
                  variant={'ghost'}
                  type='button'
                  onClick={() => {
                    setDatePicked([]);
                  }}
                >
                  <div className='bg-green-400 rounded-full flex items-center justify-center w-[50px] h-[50px]'>
                    <Trash className='fill-current text-white w-8 h-8 cursor-pointer' />
                  </div>
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant={'ghost'} type='button'>
                      <div className='bg-green-400 rounded-full'>
                        <Plus className='fill-current text-white w-[50px] h-[50px] cursor-pointer' />
                      </div>
                    </Button>
                  </DialogTrigger>
                  <SelectDays onClose={() => setOpenModal(false)} dateSelect={handleDateSelect} />
                </Dialog>
              </div>
            </div>
          </div>
          <div className='mt-1 w-full flex flex-row justify-center space-x-20'>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className='w-[163px] h-[46px] mr-4'
                  type='submit'
                  variant={'btnGreen'}
                  disabled={RegisterAgenda.isPending || EditAgenda.isPending}
                >
                  {defaultAgenda?.id === undefined ? (
                    RegisterAgenda.isPending ? (
                      <Spinner />
                    ) : (
                      'Guardar'
                    )
                  ) : EditAgenda.isPending ? (
                    <Spinner />
                  ) : (
                    'Editar'
                  )}
                </Button>
              </DialogTrigger>
              <AlertCheck title='¡Agenda Guardada Exitosamente!' />
            </Dialog>
            <Button variant='btnGray' type='button' onClick={() => navigate(-1)}>
              Cancelar
            </Button>
          </div>
        </CardContent>
      </form>
    </Form>
  );
}
