import { useQuery } from '@tanstack/react-query';

import { SearchNav } from 'src/components/navbar/search/search';
import { UserType } from 'src/components/navbar/userType/userType';
import { Loading } from 'src/components/ui/loading';
import { centerConfigHttp } from 'src/services/api/CenterConfig';

import { MedicalCenterForm } from './medicalCenterForm';

export function MedicalCenterUpdate() {
  const { data: getData, isFetching } = useQuery({
    queryKey: [''],
    queryFn: centerConfigHttp.get,
  });

  if (isFetching) {
    return (
      <div className='w-full h-screen flex justify-center items-center relative'>
        <Loading />
      </div>
    );
  }
  console.log(isFetching);
  return (
    <div className='bg-green-400 w-full h-full flex flex-row items-center relative'>
      <div className='h-full w-full p-10 bg-green-600 border-none rounded-none rounded-l-xl'>
        <div className='bg-white min-h-[60px] max-h-[60px] w-full mb-4 flex fles-row justify-end items-center px-5 sm:px-10 lg:px-20'>
          <SearchNav />
          <UserType />
        </div>
        <div className='bg-white w-full h-full overflow-y-auto scrollbar-edit flex flex-col shadow-lg rounded-t-3xl px-6 py-4'>
          {getData && <MedicalCenterForm defaultCenterData={getData} />}
        </div>
      </div>
    </div>
  );
}
