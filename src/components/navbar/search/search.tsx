import Search from 'src/components/ui/icons/search';
import { Input } from 'src/components/ui/input';

export function SearchNav() {
  return (
    <div className='flex flex-col grow justify-center items-start relative'>
      <Input className='w-[280px] h-[28px] bg-green-100/50 border-none rounded-md !pr-9 text-[12px] font-montserrat placeholder:font-montserrat placeholder:text-[12px] focus-visible:ring-green-400'></Input>
      <div className='absolute place-items-center left-[255px] top-2/4 -translate-y-2/4'>
        <Search className='fill-current text-green-400 h-[16px] w-[16px]'></Search>
      </div>
    </div>
  );
}
