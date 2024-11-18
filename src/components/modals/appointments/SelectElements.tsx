import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import { useState } from 'react';

import { Button } from 'src/components/ui/button';
import { CardContent } from 'src/components/ui/card';
import { Checkbox } from 'src/components/ui/checkbox';
import { DialogClose, DialogContent, DialogHeader, DialogTitle } from 'src/components/ui/dialog';
import Logo from 'src/components/ui/icons/logo';
import { Input } from 'src/components/ui/input';
import { Label } from 'src/components/ui/label';
import LoadingWrapper from 'src/components/wrappers/LoadingWrapper';
import { getLista, GlossaryType } from 'src/services/api/interface';
import { DEBOUNCE_DELAY } from 'src/utils/constants';

interface SelectElements {
  title?: string;
  selectedElements?: { name: string; id: string }[];
  queryFn: (props: { search: string }) => Promise<getLista<Pick<GlossaryType, 'id' | 'name'>>>;
  queryKey: string;
  onClose?: () => void;
  onSelect?: (data: { name: string; id: string }[]) => void;
}

export function SelectElements({ queryFn, queryKey, onClose, title, onSelect, selectedElements }: SelectElements) {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, DEBOUNCE_DELAY);
  const { data, isPending } = useQuery({
    queryKey: [queryKey, debouncedSearchTerm],
    queryFn: () => queryFn({ search: debouncedSearchTerm }),
  });
  const [selectedItems, setSelectedItems] = useState<{ name: string; id: string }[]>(selectedElements || []);

  const onSubmit = () => {
    if (onSelect) onSelect(selectedItems);
    if (onClose) onClose();
  };

  return (
    <DialogContent
      onCloseAutoFocus={onClose}
      className=' max-w-[552px] h-full max-h-[75vh] flex flex-col gap-0 p-0 bg-green-400 border-none rounded-xl sm:max-w-md'
    >
      <DialogHeader className='gap-4 flex flex-row mx-6 my-1 space-x-4 sm:space-x-6'>
        <Logo className='fill-current text-white h-[50px] w-[50px] sm:h-[69px] sm:w-[60px]' />
        <DialogTitle className='text-white font-montserrat text-[20px] sm:text-[24px] font-medium'>
          {`Seleccionar ${title}`}
        </DialogTitle>
      </DialogHeader>
      <CardContent className='w-full h-full flex flex-col rounded-b-xl bg-white p-3 sm:p-6 lg:p-6 gap-5'>
        <div className='w-full flex flex-row gap-5'>
          <Input
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder='Buscar'
            className='w-full h-[36px] bg-green-100/50 border-none rounded-md text-[15px] font-montserrat placeholder:text-green-400 placeholder:font-roboto placeholder:font-bold placeholder:text-[15px] focus-visible:ring-green-400'
          ></Input>
          <Button variant='btnGreen' className='h-[36px]'>
            Buscar
          </Button>
        </div>
        <LoadingWrapper isLoading={isPending}>
          <div className='flex flex-col gap-3 scrollbar-edit overflow-auto'>
            {data?.data &&
              data.data.map((item) => (
                <Label
                  htmlFor={item.id}
                  key={item.id}
                  className='flex cursor-pointer p-4 gap-2 items-center rounded-md w-full hover:bg-green-50 transform transition-colors'
                >
                  <Checkbox
                    id={item.id}
                    checked={selectedItems.map((s) => s.id).includes(item.id)}
                    onCheckedChange={(checked) => {
                      const newValue = selectedItems || [];
                      return checked
                        ? setSelectedItems([...newValue, { id: item.id, name: item.name }])
                        : setSelectedItems(newValue.filter((val) => val.id !== item.id));
                    }}
                    className='flex text-center justify-center w-[20px] h-[20px] mr-1 border-2 border-green-400'
                  />
                  <span className='text-green-400 font-roboto font-bold h-5 text-[14px] justify-center flex text-center'>
                    {item.name}
                  </span>
                </Label>
              ))}
          </div>
        </LoadingWrapper>
        <div className='flex flex-row justify-center pt-5 mt-auto'>
          <DialogClose asChild>
            <Button className='w-[420px] py-6 rounded-[10px] text-[20px] ' variant={'btnGreen'} onClick={onSubmit}>
              Seleccionar
            </Button>
          </DialogClose>
        </div>
      </CardContent>
    </DialogContent>
  );
}
