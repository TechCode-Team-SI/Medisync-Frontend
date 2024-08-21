import { Card } from 'src/components/ui/card';

export function Base() {
  return (
    <div className='w-[calc(100%-224px)] h-[calc(100%-40px)] flex flex-row items-center relative'>
      <Card className='h-full w-[316px] bg-green-400 border-none rounded-none'></Card>
      <Card className='h-full w-[calc(100%)] p-10 sm:w-[calc(100%)] md:w-[calc(100%)] lg:w-[calc(100%)] xl:w-[calc(100%)] bg-green-600 border-none absolute left-56 rounded-none rounded-l-xl'>
        <Card className='bg-white h-[50px] w-full mb-4'></Card>
        <Card className='bg-white w-full h-full'></Card>
      </Card>
    </div>
  );
}
