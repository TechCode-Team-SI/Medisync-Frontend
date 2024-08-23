import { SearchNav } from 'src/components/navbar/search/search';
import { UserType } from 'src/components/navbar/userType/userType';
import { Card, CardTitle } from 'src/components/ui/card';

import { Sidebar } from '../components/sidebar/sidebar';

export function Base() {
  return (
    <div className='w-full h-full flex flex-row items-center relative'>
      <Card className='h-full w-[316px] bg-green-400 border-none rounded-none'>
        <Sidebar></Sidebar>
      </Card>
      <Card className='h-full w-[calc(100%-285px)] p-10 bg-green-600 border-none absolute left-72 rounded-none rounded-l-xl'>
        <Card className='bg-white h-[50px] w-full mb-4 flex fles-rows justify-end items-center px-20'>
          <SearchNav></SearchNav>
          <UserType></UserType>
        </Card>
        <Card className='bg-white w-full h-full flex flex-col p-8 gap-5'>
          <CardTitle className=' text-black font-montserrat font-bold text-[23px] text-center'>Bienvenido</CardTitle>
          <CardTitle className=' text-green-400 font-montserrat font-bold text-[18px] text-left'>
            CITAS MÉDICAS
          </CardTitle>
        </Card>
      </Card>
    </div>
  );
}
