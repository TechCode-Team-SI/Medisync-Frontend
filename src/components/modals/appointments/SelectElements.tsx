import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { CardContent } from 'src/components/ui/card';
import { Checkbox } from 'src/components/ui/checkbox';
import { DialogContent, DialogHeader, DialogTitle } from 'src/components/ui/dialog';
import { FormField, FormItem } from 'src/components/ui/form';
import Logo from 'src/components/ui/icons/logo';
import { Label } from 'src/components/ui/label';
import { TableCell, TableRow } from 'src/components/ui/table';
import { Symptoms, Injury, Disease, Pathology } from 'src/services/api/interface';

import { selectElementschema, SelectElementschema } from './SelectElementschema';

interface SelectElements {
  title?: string;
  symptoms?: Array<Symptoms>;
  injury?: Array<Injury>;
  pathology?: Array<Disease>;
  Disease?: Array<Pathology>;
  onClose?: () => void;
}

function getFirstAvailableData({ symptoms, injury, pathology, Disease }: SelectElements) {
  if (symptoms && symptoms.length > 0) return symptoms;
  if (injury && injury.length > 0) return injury;
  if (pathology && pathology.length > 0) return pathology;
  if (Disease && Disease.length > 0) return Disease;
  return null;
}

export function SelectElements({ symptoms, injury, pathology, Disease, onClose, title }: SelectElements) {
  const data = getFirstAvailableData({ symptoms, injury, pathology, Disease });

  const form = useForm<SelectElementschema>({
    resolver: zodResolver(selectElementschema),
  });

  return (
    <DialogContent
      onCloseAutoFocus={onClose}
      className=' max-w-[552px] h-full max-h-[90vh] flex flex-col gap-0 p-0 bg-green-400 border-none rounded-xl sm:max-w-md'
    >
      <DialogHeader className='gap-4 flex flex-row mx-6 my-1 space-x-4 sm:space-x-6'>
        <Logo className='fill-current text-white h-[50px] w-[50px] sm:h-[69px] sm:w-[60px]' />
        <DialogTitle className='text-white font-montserrat text-[20px] sm:text-[24px] font-medium'>
          {`Seleccionar ${title}`}
        </DialogTitle>
      </DialogHeader>
      <CardContent className='w-full h-full flex flex-col overflow-auto scrollbar-edit rounded-b-xl bg-white p-3 sm:p-6 lg:p-6 gap-5'>
        {data &&
          data.map((item) => (
            <TableRow className='border-b-0' key={item.id}>
              <TableCell>
                <div className='flex px-4 w-[218px] '>
                  <FormField
                    control={form.control}
                    name='item'
                    render={({ field }) => (
                      <FormItem>
                        <Checkbox
                          checked={(field.value || []).includes(item.id)}
                          onCheckedChange={(checked) => {
                            console.log(checked);
                            const newValue = field.value || [];
                            return checked
                              ? field.onChange([...newValue, item.id])
                              : field.onChange(newValue.filter((rol) => rol !== item.id));
                          }}
                          className='flex text-center justify-center w-[20px] h-[20px] mr-1 border-2 border-green-400'
                        />
                      </FormItem>
                    )}
                  />
                  <Label className='text-green-400 font-roboto font-bold h-5 text-[14px] justify-center flex text-center'>
                    {item.name}
                  </Label>
                </div>
              </TableCell>
            </TableRow>
          ))}
      </CardContent>
    </DialogContent>
  );
}
