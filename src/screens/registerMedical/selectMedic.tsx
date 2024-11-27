/* eslint-disable prettier/prettier */
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import PaginationController from 'src/components/common/pagination';
import { Button } from 'src/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardImg, CardTitle } from 'src/components/ui/card';
import MedicalStaff from 'src/components/ui/icons/medicalStaff';
import { TableBody, TableCell, TableRow } from 'src/components/ui/table';
import LoadingWrapper from 'src/components/wrappers/LoadingWrapper';
import { MainContentWrapper } from 'src/components/wrappers/mainContentWrapper';
import { paths } from 'src/paths';
import { User } from 'src/services/api/interface';
import { registerMedicalHttp } from 'src/services/api/registerMedical';

export function SelectMedics() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { state } = useLocation();

  const { data: datalist, isFetching } = useQuery({
    queryKey: [page, state?.specialtyId, 'active-medics'],
    queryFn: () => {
      return registerMedicalHttp.getListMedicsBySpecialty({
        specialtyId: state?.specialtyId as string,
        page: `${page}`,
      });
    },
  });

  const onSelect = (user: User) => {
    navigate(paths.createappointments, {
      state: { specialtyId: state?.specialtyId, isGroup: state?.isGroup, requestedDrId: user.id },
    });
  };

  return (
    <MainContentWrapper>
      <MainContentWrapper.Header title='Selecciona un médico' withBrowser />
      <MainContentWrapper.Body>
        <LoadingWrapper isLoading={!(datalist?.data && !isFetching)}>
          <TableBody className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 mb-20'>
            {datalist &&
              datalist.data.map((Persona) => (
                <TableRow className='border-b-0' key={Persona.id}>
                  <TableCell>
                    <Card className='bg-green-50 shadow-md h-52 w-52 flex flex-col rounded-none border-spacing-0 border-0'>
                      <CardHeader className='bg-green-400 h-32 p-0 flex justify-center items-center rounded-none border-spacing-0'>
                        <CardImg
                          src={''}
                          fallback={<MedicalStaff fill='white' className='h-24 w-24' />}
                          className='w-20 h-20'
                        />
                      </CardHeader>
                      <CardContent className='bg-green-50 px-2 py-1  text-center'>
                        <CardTitle className='text-black font-montserrat font-bold text-sm'>
                          {Persona.fullName}
                        </CardTitle>
                        <CardDescription className='text-black font-roboto font-medium text-xs '>
                          {'Especialidad'}
                        </CardDescription>
                        <Button
                          onClick={() => onSelect(Persona)}
                          className={`w-full rounded-sm text-black hover:text-white py-2 text-sm mt-4 bg-green-300`}
                        >
                          Seleccionar
                        </Button>
                      </CardContent>
                    </Card>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </LoadingWrapper>
      </MainContentWrapper.Body>
      <MainContentWrapper.Footer>
        <PaginationController setPage={setPage} totalPages={datalist?.totalPages} />
      </MainContentWrapper.Footer>
    </MainContentWrapper>
  );
}
