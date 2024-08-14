import { Card, CardContent, CardDescription, CardImg, CardTitle } from 'src/components/ui/card';
import { TableRow } from 'src/components/ui/table';

const invoices = [
  {
    Persona: 'Persona 1',
    Especialidad: 'Especialidad',
  },
];

export function listCard() {
  return (
    <div className='bg-white-0 w-full h-full flex justify-center flex-col items-center p-5 gap-4'>
      <h1 className='text-white text-2xl font-bold uppercase'>Lista de Cartas</h1>

      {invoices.map((Persona) => (
        <TableRow className='grid-cols-4' key={Persona.Persona}>
          <Card className='bg-white-100 shadow-md h-52 w-52 flex flex-col rounded-none border-spacing-0 border-0'>
            <CardImg className='h-32 overflow-hidden'></CardImg>
            <CardContent className='px-1 py-1 overflow-y-aut text-center'>
              <CardTitle className='text-black font-montserrat font-bold text-sm'>{Persona.Persona}</CardTitle>
              <CardDescription className='text-black font-roboto font-medium text-xs '>
                {Persona.Especialidad}
              </CardDescription>
            </CardContent>
          </Card>
        </TableRow>
      ))}
    </div>
  );
}
