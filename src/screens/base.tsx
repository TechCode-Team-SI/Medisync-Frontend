import { Card } from 'src/components/ui/card';

import { Sidebar } from '../components/sidebar/sidebar';

export function Base() {
  return (
    <div className='w-full h-full flex flex-row items-center relative'>
      <Card className='h-full w-[316px] bg-green-400 border-none rounded-none'>
        <Sidebar></Sidebar>
      </Card>
      <Card className='h-full w-[calc(100%-285px)] p-10 bg-green-600 border-none absolute left-72 rounded-none rounded-l-xl'>
        <Card className='bg-white h-[50px] w-full mb-4'></Card>
        <Card className='bg-white w-full h-full'></Card>
      </Card>
    </div>
  );
}
