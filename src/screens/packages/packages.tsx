import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { AlertExclamation } from 'src/components/alerts/alertExclamation';
import { Button } from 'src/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from 'src/components/ui/card';
import { Checkbox } from 'src/components/ui/checkbox';
import { Form, FormField, FormItem } from 'src/components/ui/form';
import Logo from 'src/components/ui/icons/logo';
import Search from 'src/components/ui/icons/search';
import { Input } from 'src/components/ui/input';
import { Loading } from 'src/components/ui/loading';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'src/components/ui/table';
import { paths } from 'src/paths';
import { packageHttp } from 'src/services/api/Packages';

import { packageSchema } from './schema';

export function Packages() {
  const navigate = useNavigate();

  const form = useForm<packageSchema>({
    resolver: zodResolver(packageSchema),
    defaultValues: {
      slug: [],
    },
  });
  const packageInstallation = useMutation({
    mutationKey: [''],
    mutationFn: packageHttp.postInstallation,
    onSuccess: () => {
      navigate(paths.medicalCenterConfig);
    },
    onError: () => {
      return <AlertExclamation title={'Instalación de Paquetes Incorrectas'} />;
    },
  });
  const onSubmit = (data: packageSchema) => packageInstallation.mutate({ slugs: data.slug });

  const { data: datalist, isFetching } = useQuery({
    queryKey: [''],
    queryFn: packageHttp.getInstallation,
  });

  if (isFetching || packageInstallation.isPending) {
    return (
      <div className='w-full h-screen flex justify-center items-center relative'>
        <Loading />
      </div>
    );
  }

  return (
    <div className='bg-green-300 w-full h-[calc(100%-40px)] flex justify-center flex-col items-center gap-4 relative'>
      <div className='absolute inset-0 h-full flex justify-center items-center'>
        <Logo className='fill-current text-white w-full h-full max-w-xs max-h-xs sm:max-w-sm sm:max-h-sm md:max-w-md md:max-h-md lg:max-w-lg lg:max-h-lg opacity-25' />
      </div>
      <div className='relative z-10 w-full max-w-full flex flex-col items-center'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='relative z-10 w-full max-w-full flex flex-col items-center'
          >
            <Card className='w-full max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-2xl max-h-[100vh] h-auto overflow-y-auto flex flex-col mb-4'>
              <CardHeader>
                <CardTitle className='text-2xl font-montserrat font-bold text-green-400'>Configuración</CardTitle>
                <div className='flex items-center space-x-2'>
                  <Search className='fill-current text-green-400 h-[25px] w-[25px]' />
                  <Input
                    placeholder='buscar paquetes'
                    className='h-6 rounded-md text-[12px] font-montserrat placeholder:font-montserrat placeholder:text-[12px] focus-visible:ring-green-400 focus:border-none focus-visible:ring-offset-0'
                  />
                </div>
              </CardHeader>
              <CardContent className='h-full overflow-auto scrollbar-edit'>
                <Table className='min-w-full text-xs'>
                  <TableHeader className='border-b-8 border-white text-green-400 text-lg'>
                    <TableRow className='hover:bg-white'>
                      <TableHead></TableHead>
                      <TableHead>Paquete</TableHead>
                      <TableHead>Descripción</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {datalist?.data.map((datalist) => (
                      <TableRow
                        className='bg-white hover:bg-white border-b-1 border-white text-black font-roboto text-[15px]'
                        key={datalist.id}
                      >
                        <TableCell className='flex justify-center items-center'>
                          <FormField
                            control={form.control}
                            name='slug'
                            render={({ field }) => (
                              <FormItem>
                                <Checkbox
                                  checked={field.value?.includes(datalist.slug)}
                                  {...field}
                                  value={datalist.slug}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, datalist.slug])
                                      : field.onChange(field.value?.filter((value) => value !== datalist.slug));
                                  }}
                                  className='h-[18px] w-[18px] border-2  accent-green-400 border-green-400'
                                  disabled={datalist.applied}
                                />
                              </FormItem>
                            )}
                          />
                        </TableCell>
                        <TableCell>{datalist.name}</TableCell>
                        <TableCell>{datalist.description}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <div className='w-1/3 sm:max-w-sm sm:max-h-sm md:max-w-md md:max-h-md lg:max-w-lg lg:max-h-lg flex justify-between'>
              <Button variant='btnTransparent' type='submit'>
                Guardar
              </Button>
              <Button variant='btnTransparent'>Cancelar</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
