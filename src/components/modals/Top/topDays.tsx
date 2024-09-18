import { Card, CardContent, CardTitle } from 'src/components/ui/card';
import { DialogContent, DialogHeader, DialogTitle } from 'src/components/ui/dialog';
import Logo from 'src/components/ui/icons/logo';

const Dias = [
  {
    Pos: '1',
    Dia: 'Lunes',
  },
  {
    Pos: '2',
    Dia: 'Lunes',
  },
  {
    Pos: '3',
    Dia: 'Lunes',
  },
  {
    Pos: '4',
    Dia: 'Lunes',
  },
  {
    Pos: '5',
    Dia: 'Lunes',
  },
  {
    Pos: '6',
    Dia: 'Lunes',
  },
  {
    Pos: '7',
    Dia: 'Lunes',
  },
  {
    Pos: '8',
    Dia: 'Lunes',
  },
  {
    Pos: '9',
    Dia: 'Lunes',
  },
  {
    Pos: '10',
    Dia: 'Lunes',
  },
];

export function TopDays() {
  return (
    <DialogContent className=' max-w-[552px] h-full max-h-[90vh] flex flex-col gap-0 p-0 bg-green-400 border-none rounded-xl sm:max-w-md'>
      <DialogHeader className='gap-4 flex flex-row mx-6 my-1 space-x-4 sm:space-x-6'>
        <Logo className='fill-current text-white h-[50px] w-[50px] sm:h-[69px] sm:w-[60px]' />
        <DialogTitle className='text-white font-montserrat text-[20px] sm:text-[24px] font-medium'>
          TOP 10 <span className='font-bold'>Días más Concurridos</span>
        </DialogTitle>
      </DialogHeader>
      <CardContent className='w-full h-full flex flex-col overflow-auto scrollbar-edit rounded-b-xl bg-white p-3 sm:p-6 lg:p-6 gap-5'>
        {Dias.map((Dias) => (
          <Card
            key={Dias.Pos}
            className='w-full h-24 bg-white border-[0.2px] border-black/5 shadow-lg shadow-black/30 flex flex-row items-center p-5 gap-5'
          >
            <div className='flex flex-col gap-1 grow'>
              <CardTitle className='font-roboto font-bold text-[18px] text-green-400'>{Dias.Dia}</CardTitle>
            </div>
            <div className='flex-shrink-0 h-[40px] w-[40px] rounded-full bg-green-300 flex flex-col overflow-hidden items-center justify-center'>
              <CardTitle className='font-roboto font-bold text-[18px] text-white'>#{Dias.Pos}</CardTitle>
            </div>
          </Card>
        ))}
      </CardContent>
    </DialogContent>
  );
}
