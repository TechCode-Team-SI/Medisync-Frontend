import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PaginationController from 'src/components/common/pagination';
import { Button } from 'src/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardImg, CardTitle } from 'src/components/ui/card';
import Specialties from 'src/components/ui/icons/specialties';
import LoadingWrapper from 'src/components/wrappers/LoadingWrapper';
import { MainContentWrapper } from 'src/components/wrappers/mainContentWrapper';
import { paths } from 'src/paths';
import { Specialty } from 'src/services/api/interface';
import { specialtiesHttp } from 'src/services/api/specialties';

export function SelectActiveSpecialty() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { data: datalist, isFetching } = useQuery({
    queryKey: [page, 'specialties'],
    queryFn: () => specialtiesHttp.getActive({ page: `${page}` }),
  });

  const onSelect = (specialty: Specialty) => {
    switch (specialty.isGroup) {
      case true:
        return navigate(paths.createappointments, { state: { specialtyId: specialty.id, isGroup: specialty.isGroup } });
      default:
        return navigate(paths.selectMedics, { state: { specialtyId: specialty.id, isGroup: specialty.isGroup } });
    }
  };

  return (
    <MainContentWrapper>
      <MainContentWrapper.Header title='Selecciona una especialidad' withBrowser />
      <MainContentWrapper.Body>
        <LoadingWrapper isLoading={!(datalist?.data && !isFetching)}>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 mb-20'>
            {datalist &&
              datalist.data.map((specialty) => (
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
                  <CardContent className='bg-green-50 px-2 py-1 overflow-y-auto text-center'>
                    <CardTitle className='text-black font-montserrat font-bold text-sm mt-3 mb-5'>
                      {specialty.name}
                    </CardTitle>
                    <CardDescription className='text-black text-justify font-roboto line-clamp-1 font-medium text-[9px]'>
                      {specialty.description}
                    </CardDescription>
                    <Button
                      onClick={() => onSelect(specialty)}
                      className={`w-full rounded-sm text-black hover:text-white py-2 text-sm mt-4 bg-green-300`}
                    >
                      Seleccionar
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </LoadingWrapper>
      </MainContentWrapper.Body>
      <MainContentWrapper.Footer>
        <PaginationController setPage={setPage} totalPages={datalist?.totalPages} />
      </MainContentWrapper.Footer>
    </MainContentWrapper>
  );
}
