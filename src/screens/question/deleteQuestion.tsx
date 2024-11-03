/* eslint-disable prettier/prettier */
import { useMutation, useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useState } from 'react';

import { AlertExclamation } from 'src/components/alerts/alertExclamation';
import { UserType } from 'src/components/navbar/userType/userType';
import { Button } from 'src/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from 'src/components/ui/card';
import { Dialog, DialogTrigger } from 'src/components/ui/dialog';
import Search from 'src/components/ui/icons/search';
import Spinner from 'src/components/ui/icons/spinner';
import Trash from 'src/components/ui/icons/trash';
import { Input } from 'src/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'src/components/ui/table';
import { FieldQuestionHttp } from 'src/services/api/question';
import { DEBOUNCE_DELAY } from 'src/utils/constants';

export function deleteQuestion() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, DEBOUNCE_DELAY);
  const {
    data: question,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: [debouncedSearchTerm, `get-questions`],
    queryFn: ({ queryKey }) => FieldQuestionHttp.getFieldQuestion({ search: queryKey[0] }),
  });

  const deleteQuestion = useMutation({
    mutationKey: ['delete-question'],
    mutationFn: FieldQuestionHttp.deleteFieldQuestion,
    onSuccess: () => {
      console.log('eliminado');
      refetch();
    },
    onError: (err) => console.log(err),
  });

  const onDelete = (id: string) => {
    deleteQuestion.mutate(id);
  };

  return (
    <div className='w-full h-full flex flex-col items-center bg-green-400 relative'>
      <Card className='h-full w-full flex flex-col px-8 sm:px-9 lg:px-10 pt-8 sm:pt-9 lg:pt-10 bg-green-600 border-none rounded-none rounded-l-xl'>
        <Card className='bg-white min-h-[60px] max-h-[60px] w-full mb-4 flex fles-row justify-end items-center px-5 sm:px-10 lg:px-20'>
          <UserType></UserType>
        </Card>
        <Card className='bg-white w-full h-full rounded-b-none overflow-auto scrollbar-edit flex flex-col p-6 pb-0 sm:p-8 sm:pb-0 lg:p-10 lg:pb-0 space-y-5'>
          <CardHeader className='w-full flex p-3 flex-col space-y-5'>
            <CardTitle className=' text-green-400 font-montserrat font-bold text-[18px] text-left'>PREGUNTAS</CardTitle>
            <div className='w-full h-full flex flex-row gap-5'>
              <Input
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder='Buscar'
                className='w-full h-[36px] bg-green-100/50 border-none rounded-md text-[15px] font-montserrat placeholder:text-green-400 placeholder:font-roboto placeholder:font-bold placeholder:text-[15px] focus-visible:ring-green-400'
              ></Input>
              <Button disabled={isFetching} variant='btnGreen' className='h-[36px]'>
                <Search className='h-[17px] w-[17px] fill-current text-white mr-2' />
                Buscar
              </Button>
            </div>
          </CardHeader>
          <CardContent className='overflow-auto scrollbar-edit'>
            {question?.data && !isFetching ? (
              <Table className='min-w-full text-sm mb-4'>
                <TableHeader className='border-b-8 border-white bg-green-500 text-white'>
                  <TableRow className='hover:bg-green-500'>
                    <TableHead className='text-left'>Identificador</TableHead>
                    <TableHead className='text-left'>Pregunta</TableHead>
                    <TableHead className=' text-left'>Fecha</TableHead>
                    <TableHead className=' text-right '>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className='h-[35px]'>
                  {question?.data &&
                    !isFetching &&
                    question.data.map((question) => (
                      <TableRow
                        className='bg-green-600 border-b-2 border-white text-black font-roboto'
                        key={question.id}
                      >
                        <TableCell className='pl-4 text-left'>{question.name}</TableCell>
                        <TableCell className='pl-4 text-left'>{question.label}</TableCell>
                        <TableCell className='pl-4 text-left'>
                          {format(question.createdAt, 'P', { locale: es })}
                        </TableCell>
                        <TableCell className='flex justify-end items-center mr-5'>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button className='bg-transparent hover:bg-transparent'>
                                <Trash className='fill-current text-green-400 h-4 w-4' />
                              </Button>
                            </DialogTrigger>
                            <AlertExclamation
                              deletePost={() => onDelete(question.id)}
                              title='¿Desea eliminar la Pregunta?'
                            />
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            ) : (
              <div className='w-full flex justify-center'>
                <Spinner />
              </div>
            )}
          </CardContent>
          <CardFooter className='h-20 flex flex-row-reverse'></CardFooter>
        </Card>
      </Card>
    </div>
  );
}
