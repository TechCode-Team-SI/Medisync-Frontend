import { useLocation } from 'react-router-dom';

import { UserType } from 'src/components/navbar/userType/userType';
import { Card, CardTitle, CardHeader } from 'src/components/ui/card';

import { FormAgenda } from './formAgenda';

export function EditAgenda() {
  const location = useLocation();
  const data = location.state;

  console.log(data);

  return (
    <div className='w-full h-screen flex flex-col sm:flex-row items-center bg-green-400 relative'>
      <Card className='h-full w-full flex flex-col px-6 sm:px-8 lg:px-10 pt-6 sm:pt-8 lg:pt-10 bg-green-600 border-none rounded-none rounded-l-xl'>
        <Card className='bg-white min-h-[60px] max-h-[60px] w-full mb-4 flex flex-row justify-end items-center px-5 sm:px-10 lg:px-20'>
          <UserType></UserType>
        </Card>
        <Card className='bg-white w-full h-full overflow-auto scrollbar-edit flex flex-col p-4 sm:p-6 lg:p-10'>
          <CardHeader className='w-full flex flex-col'>
            <CardTitle className='text-green-400 font-montserrat font-bold text-[18px] text-left'>
              EDITAR AGENDA
            </CardTitle>
          </CardHeader>
          {<FormAgenda defaultAgenda={data} />}
        </Card>
      </Card>
    </div>
  );
}
