import { UserType } from 'src/components/navbar/userType/userType';
import { Button } from 'src/components/ui/button';
import { Card, CardTitle } from 'src/components/ui/card';
import Search from 'src/components/ui/icons/search';
import { Input } from 'src/components/ui/input';

export function AssignTemplate() {
  return (
    <div className='w-full h-screen flex flex-row items-center bg-green-400 relative'>
      <Card className='h-full w-full flex flex-col px-8 sm:px-9 lg:px-10 pt-8 sm:pt-9 lg:pt-10 bg-green-600 border-none rounded-none rounded-l-xl'>
        <Card className='bg-white min-h-[60px] max-h-[60px] w-full shadow-md mb-6 flex fles-row justify-end items-center px-5 sm:px-10 lg:px-20'>
          <UserType></UserType>
        </Card>
        <Card className='bg-white w-full h-full rounded-b-none overflow-auto scrollbar-edit flex flex-col p-6 pb-0 sm:p-8 sm:pb-0 lg:p-10 lg:pb-0 space-y-5'>
          <div className='flex flex-col'>
            <CardTitle className=' text-green-400 font-montserrat font-bold text-[15px] text-left'>
              ESPECIALIDADES
            </CardTitle>
          </div>
          <div className='w-full h-full flex flex-row space-x-5'>
            <Input
              placeholder='Buscar'
              className='w-full h-[36px] bg-green-100/50 border-none rounded-md text-[15px] font-montserrat placeholder:text-green-400 placeholder:font-roboto placeholder:font-bold placeholder:text-[15px] focus-visible:ring-green-400'
            ></Input>
            <Button variant='btnGreen' className='h-[36px]'>
              <Search className='h-[17px] w-[17px] fill-current text-white mr-2' />
              Buscar
            </Button>
          </div>
        </Card>
      </Card>
    </div>
  );
}

// Pendiente (1):
