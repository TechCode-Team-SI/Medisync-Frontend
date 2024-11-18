import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

import { AlertExclamation } from 'src/components/alerts/alertExclamation';
import { UserType } from 'src/components/navbar/userType/userType';
import { Badge } from 'src/components/ui/badge';
import { Button } from 'src/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardImg, CardTitle } from 'src/components/ui/card';
import { Dialog, DialogTrigger } from 'src/components/ui/dialog';
import MedicalStaff from 'src/components/ui/icons/medicalStaff';
import Search from 'src/components/ui/icons/search';
import Trash from 'src/components/ui/icons/trash';
import { Input } from 'src/components/ui/input';
import { Loading } from 'src/components/ui/loading';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'src/components/ui/table';
import { ArticlesHttp } from 'src/services/api/post';
import { formatDate } from 'src/utils/utils';

export function DeletePost() {
  const {
    data: datalist,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: [''],
    queryFn: ArticlesHttp.getArticles,
  });

  const deleteArticles = useMutation({
    mutationKey: [],
    mutationFn: ArticlesHttp.deleteArticlesById,
    onSuccess: () => {
      toast.success('Articulo Eliminado Correctamente');
      console.log('Eliminado');
      refetch();
    },
    onError: () => {
      toast.error('Articulo Eliminado Correctamente');
      console.log(deleteArticles.error?.message);
    },
  });
  if (isFetching) {
    return (
      <div className='w-full h-screen flex justify-center items-center relative'>
        <Loading />
      </div>
    );
  }
  return (
    <div className='w-full h-full flex flex-col items-center bg-green-400 relative'>
      <Card className='h-full w-full flex flex-col px-8 sm:px-9 lg:px-10 pt-8 sm:pt-9 lg:pt-10 bg-green-600 border-none rounded-none rounded-l-xl'>
        <Card className='bg-white min-h-[60px] max-h-[60px] w-full mb-4 flex fles-row justify-end items-center px-5 sm:px-10 lg:px-20'>
          <UserType></UserType>
        </Card>
        <Card className='bg-white w-full h-full rounded-b-none overflow-auto scrollbar-edit flex flex-col p-6 pb-0 sm:p-8 sm:pb-0 lg:p-10 lg:pb-0 space-y-5'>
          <CardHeader className='w-full flex p-3 flex-col space-y-5'>
            <CardTitle className=' text-green-400 font-montserrat font-bold text-[18px] text-left'>
              ELIMINAR PUBLICACIONES
            </CardTitle>
            <div className='w-full h-full flex flex-row gap-5'>
              <Input
                placeholder='Buscar'
                className='w-full h-[36px] bg-green-100/50 border-none rounded-md text-[15px] font-montserrat placeholder:text-green-400 placeholder:font-roboto placeholder:font-bold placeholder:text-[15px] focus-visible:ring-green-400'
              ></Input>
              <Button variant='btnGreen' className='h-[36px]'>
                <Search className='h-[17px] w-[17px] fill-current text-white mr-2' />
                Buscar
              </Button>
            </div>
          </CardHeader>
          <CardContent className='overflow-auto scrollbar-edit'>
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
                {datalist &&
                  datalist.data.map((Post) => (
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
                            src={''}
                            fallback={<MedicalStaff className='h-5 w-5 fill-current text-white' />}
                            className='w-5 h-5'
                          />
                        </div>
                      </TableCell>
                      <TableCell className='pl-4 text-left'>{formatDate(Post.createdAt)}</TableCell>
                      <TableCell className='flex justify-center items-center'>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant={'ghost'}>
                              <Trash className='fill-current text-green-400 h-4 w-4' />
                            </Button>
                          </DialogTrigger>
                          <AlertExclamation
                            title={'¿Desea Eliminar la Publicación?'}
                            deletePost={() => {
                              deleteArticles.mutate({ id: Post.id, description: Post.description, title: Post.title });
                              refetch();
                            }}
                          />
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className='h-20 flex flex-row-reverse'></CardFooter>
        </Card>
      </Card>
    </div>
  );
}
