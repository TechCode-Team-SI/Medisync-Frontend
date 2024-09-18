import { SearchNav } from 'src/components/navbar/search/search';
import { UserType } from 'src/components/navbar/userType/userType';
import { Card, CardHeader, CardTitle } from 'src/components/ui/card';

export function Base() {
  return (
    <div className='w-full h-screen flex flex-row items-center bg-green-400 relative'>
      <Card className='h-full w-full flex flex-col px-8 sm:px-9 lg:px-10 pt-8 sm:pt-9 lg:pt-10 bg-green-600 border-none rounded-none rounded-l-xl'>
        <Card className='bg-white min-h-[60px] max-h-[60px] w-full mb-4 flex fles-row justify-end items-center px-5 sm:px-10 lg:px-20'>
          <SearchNav></SearchNav>
          <UserType></UserType>
        </Card>
        <Card className='bg-white w-full h-full overflow-auto flex flex-col p-6 sm:p-8 lg:p-10 gap-5'>
          <CardHeader>
            <CardTitle className=' text-green-400 font-montserrat font-bold text-[18px] text-left'>
              CITAS MÉDICAS
            </CardTitle>
          </CardHeader>
        </Card>
      </Card>
    </div>
  );
}
