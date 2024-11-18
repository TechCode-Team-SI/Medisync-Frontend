import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import { Plus } from 'lucide-react';
import { useState } from 'react';

import PaginationController from 'src/components/common/pagination';
import { RegisterArticleCategories } from 'src/components/modals/article-category/RegisterArticleCategories';
import { Dialog, DialogTrigger } from 'src/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'src/components/ui/table';
import LoadingWrapper from 'src/components/wrappers/LoadingWrapper';
import { MainContentWrapper } from 'src/components/wrappers/mainContentWrapper';
import { articleCategoryHttp } from 'src/services/api/article-category';
import { DEBOUNCE_DELAY } from 'src/utils/constants';
import { formatDate } from 'src/utils/utils';

export function registerArticleCategory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const debouncedSearchTerm = useDebounce(searchTerm, DEBOUNCE_DELAY);
  const {
    data: getData,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: [page, debouncedSearchTerm, 'article-category'],
    queryFn: ({ queryKey }) =>
      articleCategoryHttp.getArticleCategory({
        search: queryKey[1] as string,
        page: queryKey[0] as string,
      }),
  });

  return (
    <MainContentWrapper>
      <MainContentWrapper.Header title='CATEGORIAS' withBrowser setSearchTerm={setSearchTerm} />
      <MainContentWrapper.Body>
        <LoadingWrapper isLoading={isFetching}>
          <Table className='min-w-full text-sm mb-4'>
            <TableHeader className='border-b-8 border-white bg-green-500 text-white'>
              <TableRow className='hover:bg-green-500'>
                <TableHead className='w-10 text-[12px] text-left'>Nombre</TableHead>
                <TableHead className='w-10 text-[12px] text-left'>Creado en</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className='h-[35px]'>
              {getData &&
                getData.data.map((articleCategory) => (
                  <TableRow
                    className='bg-green-600 border-b-2 border-white text-black font-roboto'
                    key={articleCategory.id}
                  >
                    <TableCell className='pl-4 text-left'>{articleCategory.name}</TableCell>
                    <TableCell className='pl-4 text-left'> {formatDate(articleCategory.createdAt)}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </LoadingWrapper>
      </MainContentWrapper.Body>
      <MainContentWrapper.Footer className='relative'>
        <PaginationController totalPages={getData?.totalPages} setPage={setPage} />
        <div className='bg-green-400 rounded-full mb-8 mt-18 absolute top-0 right-0'>
          <Dialog>
            <DialogTrigger asChild>
              <div className='bg-green-400 rounded-full'>
                <Plus className='fill-current text-white w-[50px] h-[50px] cursor-pointer' />
              </div>
            </DialogTrigger>
            <RegisterArticleCategories
              title='REGISTRAR CATEGORIA DE PUBLICACION'
              alert='Categoria'
              Recargar={refetch}
            />
          </Dialog>
        </div>
        ;
      </MainContentWrapper.Footer>
    </MainContentWrapper>
  );
}
