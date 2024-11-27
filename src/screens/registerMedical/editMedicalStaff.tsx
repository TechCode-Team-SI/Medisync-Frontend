/* eslint-disable prettier/prettier */

import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';

import { UserType } from 'src/components/navbar/userType/userType';
import { CardHeader, CardTitle } from 'src/components/ui/card';
import { Loading } from 'src/components/ui/loading';
import { registerMedicalHttp } from 'src/services/api/registerMedical';

import { MedicalStaffFrom } from './MedicalStaffForm';

export function EditMedicalStaff() {
  const location = useLocation();
  const data = location.state;
  console.log(data);

  const { data: getData, isFetching } = useQuery({
    queryKey: ['roles', data],
    queryFn: () => registerMedicalHttp.getListMedicalStaffById(data),
  });
  if (isFetching) {
    return (
      <div className='w-full h-screen flex justify-center items-center relative'>
        <Loading />
      </div>
    );
  }
  return (
    <div className='bg-green-400 flex flex-row w-full h-full items-center relative'>
      <div className='flex flex-col h-full w-full p-10 pb-0 bg-green-600 border-none rounded-none rounded-l-xl'>
        <div className='bg-white min-h-[60px] max-h-[60px] w-full mb-4 flex fles-row justify-end rounded-lg items-center px-5 sm:px-10 lg:px-20'>
          <UserType />
        </div>
        <div className='bg-white w-full h-full overflow-y-auto scrollbar-edit flex flex-col shadow-lg rounded-t-3xl px-6 py-4'>
          <CardHeader className='w-full flex p-3 flex-col gap-5'>
            <CardTitle className=' text-green-400 font-montserrat font-bold text-[15px] ml-2 text-left'>
              EDITAR PERSONAL
            </CardTitle>
          </CardHeader>
          {getData && <MedicalStaffFrom defaultMedicalStaff={getData} />}
        </div>
      </div>
    </div>
  );
}
