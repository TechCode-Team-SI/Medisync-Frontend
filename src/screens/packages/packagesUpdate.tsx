import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { SearchNav } from 'src/components/navbar/search/search';
import { UserType } from 'src/components/navbar/userType/userType';
import { Button } from 'src/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from 'src/components/ui/card';
import { Checkbox } from 'src/components/ui/checkbox';
import { Form, FormField, FormItem } from 'src/components/ui/form';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'src/components/ui/table';
import { paths } from 'src/paths';
import { packageHttp } from 'src/services/api/Packages';

import { packageSchema } from './schema';

export function PackagesUpdate() {
  const navigate = useNavigate();

  const form = useForm<packageSchema>({
    resolver: zodResolver(packageSchema),
    defaultValues: {
      slug: [],
    },
  });
  const packageInstallation = useMutation({
    mutationKey: [''],
    mutationFn: packageHttp.post,
    onSuccess: () => {
      navigate(paths.packagesupdate);
    },
    onError: () => {
      console.log('no funciono');
    },
  });
  const onSubmit = (data: packageSchema) => packageInstallation.mutate({ slugs: data.slug });

  const { data: datalist } = useQuery({
    queryKey: [''],
    queryFn: packageHttp.get,
  });
  return (
    <div className='w-full h-screen flex flex-row items-center bg-green-400 relative'>
      <Card className='h-full w-full flex flex-col px-8 sm:px-9 lg:px-10 pt-8 sm:pt-9 lg:pt-10 bg-green-600 border-none rounded-none rounded-l-xl'>
        <Card className='bg-white min-h-[60px] max-h-[60px] w-full mb-4 flex fles-row justify-end items-center px-5 sm:px-10 lg:px-20'>
          <SearchNav></SearchNav>
          <UserType></UserType>
        </Card>

        <Card className='bg-white w-full h-full overflow-auto flex flex-col p-6 sm:p-8 lg:p-10 gap-5'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='relative z-10 w-full max-w-full flex flex-col'>
              <CardHeader>
                <CardTitle className=' text-green-400 font-montserrat font-bold text-[18px] text-center'>
                  PAQUETES INSTALADOS
                </CardTitle>
              </CardHeader>
              <CardContent className='h-full overflow-auto scrollbar-edit'>
                <Table className='min-w-full text-xs'>
                  <TableHeader className='border-b-8 border-white text-green-400 text-lg'>
                    <TableRow className='hover:bg-white'>
                      <TableHead></TableHead>
                      <TableHead className='pl-5 text-left'>Paquete</TableHead>
                      <TableHead>Descripción</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {datalist?.data &&
                      datalist.data.map((datalist) => (
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
                          <TableCell className='pl-5 text-left border-b-2 border-gray-100/80'>
                            {datalist.name}
                          </TableCell>
                          <TableCell className='pl-5 text-left border-b-2 border-gray-100/80'>
                            {datalist.description}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
              <div className='w-full sm:max-w-sm sm:max-h-sm md:max-w-md md:max-h-md lg:max-w-lg lg:max-h-lg flex justify-between'>
                <Button variant='btnGreen' type='submit'>
                  Guardar
                </Button>
              </div>
            </form>
          </Form>
        </Card>
      </Card>
    </div>
  );
}
