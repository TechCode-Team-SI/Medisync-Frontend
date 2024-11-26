/* eslint-disable prettier/prettier */
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import { Plus } from 'lucide-react';
import { useState } from 'react';

import PaginationController from 'src/components/common/pagination';
import { RegisterPost } from 'src/components/modals/Post/modalRegisterPost';
import { UserType } from 'src/components/navbar/userType/userType';
import { Badge } from 'src/components/ui/badge';
import { Card, CardContent, CardFooter, CardImg } from 'src/components/ui/card';
import { Dialog, DialogTrigger } from 'src/components/ui/dialog';
import MedicalStaff from 'src/components/ui/icons/medicalStaff';
import Spinner from 'src/components/ui/icons/spinner';
import { TableRow, TableBody, TableCell, Table, TableHeader, TableHead } from 'src/components/ui/table';
import { MainContentWrapper } from 'src/components/wrappers/mainContentWrapper';
import { ArticlesHttp } from 'src/services/api/post';
import { DEBOUNCE_DELAY } from 'src/utils/constants';
import { formatDate } from 'src/utils/utils';

export function CreatePost() {
  const [, setOpenModal] = useState(false);
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
          <MainContentWrapper.Header withBrowser setSearchTerm={setSearchTerm} title='CREAR PUBLICACIONES' />
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
                  </TableRow>
                </TableHeader>
                <TableBody className='h-[35px]'>
                  {getData &&
                    getData?.data.map((Post) => (
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
                              className='w-5 h-5'
                            />
                          </div>
                        </TableCell>
                        <TableCell className='pl-4 text-left'>{formatDate(Post.createdAt)}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
          <CardFooter className='h-20 flex flex-row'>
            <PaginationController totalPages={getData?.totalPages} setPage={setPage} />
            <Dialog>
              <DialogTrigger asChild>
                <div className='bg-green-400 rounded-full mb-8'>
                  <Plus className='fill-current text-white w-[50px] h-[50px] cursor-pointer' />
                </div>
              </DialogTrigger>
              <RegisterPost
                title={'AÑADIR PUBLICACION'}
                alert={'PUBLICACIÓN CREADA'}
                onClose={() => setOpenModal(false)}
                Recargar={() => refetch()}
              />
            </Dialog>
          </CardFooter>
        </Card>
      </Card>
    </div>
  );
}
