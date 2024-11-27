/* eslint-disable prettier/prettier */
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import { useState } from 'react';

import PaginationController from 'src/components/common/pagination';
import { RegisterPost } from 'src/components/modals/Post/modalRegisterPost';
import { UserType } from 'src/components/navbar/userType/userType';
import { Badge } from 'src/components/ui/badge';
import { Button } from 'src/components/ui/button';
import { Card, CardContent, CardFooter, CardImg } from 'src/components/ui/card';
import { Dialog, DialogTrigger } from 'src/components/ui/dialog';
import Edit from 'src/components/ui/icons/edit';
import MedicalStaff from 'src/components/ui/icons/medicalStaff';
import Spinner from 'src/components/ui/icons/spinner';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'src/components/ui/table';
import { MainContentWrapper } from 'src/components/wrappers/mainContentWrapper';
import { ArticlesHttp } from 'src/services/api/post';
import { DEBOUNCE_DELAY } from 'src/utils/constants';
import { formatDate } from 'src/utils/utils';

export function EditPost() {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const debouncedSearchTerm = useDebounce(searchTerm, DEBOUNCE_DELAY);
  const {
    data: getData,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: [debouncedSearchTerm, `${page}`, ``],
    queryFn: ({ queryKey }) =>
      ArticlesHttp.getMyArticles({
        search: queryKey[0],
        page: queryKey[1],
      }),
  });
  return (
    <div className='w-full h-full flex flex-col items-center bg-green-400 relative'>
      <Card className='h-full w-full flex flex-col px-8 sm:px-9 lg:px-10 pt-8 sm:pt-9 lg:pt-10 bg-green-600 border-none rounded-none rounded-l-xl'>
        <Card className='bg-white min-h-[60px] max-h-[60px] w-full mb-4 flex fles-row justify-end items-center px-5 sm:px-10 lg:px-20'>
          <UserType></UserType>
        </Card>
        <Card className='bg-white w-full h-full rounded-b-none overflow-auto scrollbar-edit flex flex-col p-6 pb-0 sm:p-8 sm:pb-0 lg:p-10 lg:pb-0 space-y-5'>
          <MainContentWrapper.Header withBrowser setSearchTerm={setSearchTerm} title='EDITAR PUBLICACIONES' />
          <CardContent className=' h-full'>
            {isFetching ? (
              <div className='w-full h-full flex justify-center items-center'>
                <Spinner />
              </div>
            ) : (
              <Table className='min-w-full text-sm mb-4'>
                <TableHeader className='border-b-8 border-white bg-green-500 text-white'>
                  <TableRow className='hover:bg-green-500'>
                    <TableHead className='w-10 text-[12px] text-left'>Titulo</TableHead>
                    <TableHead className='w-10 text-[12px] text-left'>Contenido</TableHead>
                    <TableHead className='w-10 text-[12px] text-left'>Categorias</TableHead>
                    <TableHead className='w-10 text-[12px] text-left'>Foto</TableHead>
                    <TableHead className='w-10 text-[12px] text-left'>Fecha</TableHead>
                    <TableHead className='w-10 text-[12px] text-center'>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className='h-[35px]'>
                  {getData &&
                    getData.data.map((Post) => (
                      <TableRow className='bg-green-600 border-b-2 border-white text-black font-roboto' key={Post.id}>
                        <TableCell className='pl-4 text-left'>{Post.title}</TableCell>
                        <TableCell className='pl-4 text-left'>
                          <span className='line-clamp-2'>{Post.description}</span>
                        </TableCell>
                        <TableCell className='pl-4 text-left'>
                          {(Post.categories || []).slice(0, 4).map((category) => (
                            <Badge key={category.id} className='bg-green-400 m-0.5 text-white mr-2'>
                              {category.name}
                            </Badge>
                          ))}
                          {(Post.categories?.length || 0) > 4 && (
                            <Badge className='bg-gray-300 m-0.5 text-white mr-2'>...</Badge>
                          )}
                        </TableCell>
                        <TableCell className='pl-4 text-left'>
                          <div className='flex flex-col items-center justify-center h-7 w-7 rounded-full bg-green-400 overflow-hidden relative'>
                            <CardImg
                              src={Post.image ? Post.image.path : ''}
                              fallback={<MedicalStaff className='h-5 w-5 fill-current text-white' />}
                              className='w-full h-full'
                            />
                          </div>
                        </TableCell>
                        <TableCell className='text-left'>{formatDate(Post.createdAt)}</TableCell>
                        <TableCell className='flex justify-center items-center'>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant={'ghost'}>
                                <Edit className='fill-current text-green-400 h-4 w-4' />
                              </Button>
                            </DialogTrigger>
                            <RegisterPost
                              post={{ photo: Post.image, ...Post }}
                              title={'EDITAR PUBLICACION'}
                              alert={'PUBLICACIÓN EDITADA'}
                              Recargar={refetch}
                            />
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
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
