/* eslint-disable prettier/prettier */

import { UserType } from 'src/components/navbar/userType/userType';
import { CardHeader, CardTitle } from 'src/components/ui/card';

import { MedicalStaffFrom } from './MedicalStaffForm';

export function RegisterMedicalStaff() {
  console.log();
  return (
    <div className='bg-green-400 w-full h-full flex flex-row items-center relative'>
      <div className='flex flex-col h-full w-full p-10 pb-0 bg-green-600 border-none rounded-none rounded-l-xl'>
        <div className='bg-white min-h-[60px] max-h-[60px] w-full mb-4 flex fles-row justify-end rounded-lg items-center px-5 sm:px-10 lg:px-20'>
          <UserType />
        </div>
        <div className='bg-white w-full h-full overflow-y-auto scrollbar-edit flex flex-col shadow-lg rounded-t-3xl px-6 py-4'>
          <CardHeader className='w-full flex p-3 flex-col gap-5'>
            <CardTitle className=' text-green-400 font-montserrat font-bold text-[15px] ml-2 text-left'>
              REGISTRAR PERSONAL
            </CardTitle>
          </CardHeader>
          {<MedicalStaffFrom defaultMedicalStaff={null} />}
        </div>
      </div>
    </div>
  );
}
