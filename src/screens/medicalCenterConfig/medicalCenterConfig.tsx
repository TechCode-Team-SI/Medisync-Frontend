import { Button } from 'src/components/ui/button';
import User from 'src/components/ui/icons/user';
import { Input } from 'src/components/ui/input';
import { Label } from 'src/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from 'src/components/ui/select';
import { TextArea } from 'src/components/ui/textArea';

export function MedicalCenterConfig() {
  return (
    <div className='bg-green-400 w-full h-full flex flex-row items-center relative'>
      <div className='h-full w-full p-10 bg-green-600 border-none rounded-none rounded-l-xl'>
        <div className='bg-white w-full min-h-[60px] max-h-[60px] shadow-lg rounded-lg flex flex-row-reverse px-16 mb-6'>
          <div className='flex items-center'>
            <User className='fill-current text-green-400 w-[23px] h-[22px] mr-3' />
            <div className='flex flex-col justify-center'>
              <p className='text-[14px] font-bold font-montserrat'>Usuario</p>
              <p className='text-[12px] font-montserrat'>Tipo de usuario</p>
            </div>
          </div>
        </div>
        <div className='bg-white w-full h-full overflow-y-auto scrollbar-edit flex flex-col shadow-lg rounded-t-3xl px-6 py-4'>
          <p className='text-green-400 font-bold text-[15px] mb-4'>INFORMACIÓN CENTRO MÉDICO</p>
          <div className='w-full h-full px-2 space-y-2 m-3'>
            <div className='w-full flex-1'>
              <Label className='text-[12px]'>Nombre</Label>
              <Input className='h-8 rounded-none' />
            </div>
            <div className='w-full flex-1'>
              <Label className='text-[12px]'>Dirección</Label>
              <Input className='h-8 rounded-none' />
            </div>
            <div className='w-full h-auto flex space-x-2'>
              <div className='w-full flex-1'>
                <Label className='text-[12px]'>Estado</Label>
                <Select>
                  <SelectTrigger className='h-8 rounded-none'>
                    <SelectValue placeholder='Seleccione estado' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value='1'>Item 1</SelectItem>
                      <SelectItem value='2'>Item 2</SelectItem>
                      <SelectItem value='3'>Item 3</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className='w-full flex-1'>
                <Label className='text-[12px]'>Municipio</Label>
                <Select>
                  <SelectTrigger className='h-8 rounded-none'>
                    <SelectValue placeholder='Seleccione municipio' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value='1'>Item 1</SelectItem>
                      <SelectItem value='2'>Item 2</SelectItem>
                      <SelectItem value='3'>Item 3</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className='w-full flex-1'>
                <Label className='text-[12px]'>Parroquia</Label>
                <Select>
                  <SelectTrigger className='h-8 rounded-none'>
                    <SelectValue placeholder='Seleccione parroquia' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value='1'>Item 1</SelectItem>
                      <SelectItem value='2'>Item 2</SelectItem>
                      <SelectItem value='3'>Item 3</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className='w-full h-auto flex space-x-2'>
              <div className='w-full flex-1'>
                <Label className='text-[12px]'>Telefono Local</Label>
                <Input className='h-8 rounded-none' />
              </div>
              <div className='w-full flex-1'>
                <Label className='text-[12px]'>Telefono Móvil</Label>
                <Input className='h-8 rounded-none' />
              </div>
            </div>
            <div className='w-full flex-1'>
              <Label className='text-[12px]'>Misión</Label>
              <TextArea className='rounded-none' />
            </div>
            <div className='w-full flex-1'>
              <Label className='text-[12px]'>Visión</Label>
              <TextArea className='rounded-none' />
            </div>
            <div className='flex justify-center space-x-8 pt-16 pb-8'>
              <Button variant={'btnGreen'}>Aceptar</Button>
              <Button variant={'btnGray'}>Cancelar</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
