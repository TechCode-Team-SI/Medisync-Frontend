/* eslint-disable prettier/prettier */
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import { useState } from 'react';

import PaginationController from 'src/components/common/pagination';
import { RequestTemplateSelectModal } from 'src/components/modals/RequestTemplate/modalSelectRequestTemplate';
import { Button } from 'src/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardImg, CardTitle } from 'src/components/ui/card';
import { Dialog } from 'src/components/ui/dialog';
import Specialties from 'src/components/ui/icons/specialties';
import LoadingWrapper from 'src/components/wrappers/LoadingWrapper';
import { MainContentWrapper } from 'src/components/wrappers/mainContentWrapper';
import { specialtiesHttp } from 'src/services/api/specialties';
import { DEBOUNCE_DELAY } from 'src/utils/constants';

export function AssignTemplate() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [specialtyData, setSpecialtyData] = useState<{ id: string; hasAssignedTemplate: boolean } | null>(null);
  const [searchTerm] = useState('');
  const [page, setPage] = useState(1);
  const debouncedSearchTerm = useDebounce(searchTerm, DEBOUNCE_DELAY);
  const {
    data: getData,
    isFetching,
  } = useQuery({
    queryKey: [debouncedSearchTerm, `${page}`, '8'],
    queryFn: async ({ queryKey }) =>
      specialtiesHttp.getMySpecialty({
        search: queryKey[0],
        page: queryKey[1],
        limit: queryKey[2],
        isDisabled: false,
      }),
  });

  const onSelect = (specialtyData: { id: string; hasAssignedTemplate: boolean }) => {
    setSpecialtyData(specialtyData);
    setIsModalOpen(true);
  };

  const onSelectionDone = () => {
    queryClient.invalidateQueries({ queryKey: [page, 'specialties'] });
  };

  return (
    <MainContentWrapper>
      <MainContentWrapper.Header title='ASIGNAR PLANTILLA' />
      <MainContentWrapper.Body>
        {isModalOpen && specialtyData && (
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <RequestTemplateSelectModal
              onSelect={onSelectionDone}
              specialtyData={specialtyData}
              closeModal={() => setIsModalOpen(false)}
              
            />
          </Dialog>
        )}
        <LoadingWrapper isLoading={!(getData?.data && !isFetching)}>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 mb-20'>
            {getData &&
              getData.data.map((specialty) => (
                <Card
                  key={specialty.id}
                  className='bg-green-50 shadow-md min-h-[268px] max-h-[268px] w-[227px] flex flex-col rounded-none border-spacing-0 border-0'
                >
                  <CardHeader className='bg-green-400 h-32 p-0 flex justify-center items-center rounded-none border-spacing-0'>
                    <CardImg
                      src=''
                      fallback={<Specialties fill='white' className='h-24 w-24' />}
                      className='w-20 h-20'
                    />
                  </CardHeader>
                  <CardContent className='bg-green-50 px-2 py-1 overflow-y-auto scrollbar-edit text-center'>
                    <CardTitle className='text-black font-montserrat font-bold text-sm mt-3 mb-5'>
                      {specialty.name}
                    </CardTitle>
                    <CardDescription className='text-black text-justify font-roboto font-medium text-[9px]'>
                      {specialty.description}
                    </CardDescription>
                    <Button
                      onClick={() => onSelect({ id: specialty.id, hasAssignedTemplate: !!specialty.requestTemplate })}
                      className={`w-full rounded-sm text-black hover:text-white py-2 text-sm mt-4 ${specialty.requestTemplate?.name ? 'bg-green-300' : 'bg-gray-300'}`}
                    >
                      {specialty.requestTemplate?.name || 'Asigne una plantilla'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </LoadingWrapper>
      </MainContentWrapper.Body>
      <MainContentWrapper.Footer>
      <PaginationController totalPages={getData?.totalPages} setPage={setPage} />
      </MainContentWrapper.Footer>
    </MainContentWrapper>
  );
}

// Pendiente (1):
