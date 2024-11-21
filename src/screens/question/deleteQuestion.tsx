/* eslint-disable prettier/prettier */
import { useMutation, useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useState } from 'react';

import { AlertExclamation } from 'src/components/alerts/alertExclamation';
import PaginationController from 'src/components/common/pagination';
import { UserType } from 'src/components/navbar/userType/userType';
import { Button } from 'src/components/ui/button';
import { Card, CardContent, CardFooter } from 'src/components/ui/card';
import { Dialog, DialogTrigger } from 'src/components/ui/dialog';
import Spinner from 'src/components/ui/icons/spinner';
import Trash from 'src/components/ui/icons/trash';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'src/components/ui/table';
import { MainContentWrapper } from 'src/components/wrappers/mainContentWrapper';
import { FieldQuestionHttp } from 'src/services/api/question';
import { DEBOUNCE_DELAY } from 'src/utils/constants';

export function deleteQuestion() {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const debouncedSearchTerm = useDebounce(searchTerm, DEBOUNCE_DELAY);
  const {
    data: getData,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: [debouncedSearchTerm, `${page}`, ``],
    queryFn: ({ queryKey }) =>
      FieldQuestionHttp.getMyFieldQuestion({
        search: queryKey[0],
        page: queryKey[1],
      }),
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
        <MainContentWrapper.Header withBrowser setSearchTerm={setSearchTerm} title='PREGUNTAS' />
        <CardContent className='h-[450px] overflow-auto scrollbar-edit pb-0'>
            {getData?.data && !isFetching ? (
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
                  {getData.data.map((question) => (
                    <TableRow className='bg-green-600 border-b-2 border-white text-black font-roboto' key={question.id}>
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
          <CardFooter className='h-20 flex flex-row-reverse'>
          <PaginationController totalPages={getData?.totalPages} setPage={setPage} />
          </CardFooter>
        </Card>
      </Card>
    </div>
  );
}
