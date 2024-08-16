import { Card, CardHeader, CardContent, CardDescription, CardTitle } from 'src/components/ui/card';
import Injuries from 'src/components/ui/icons/injuries';
import { TableRow, TableBody, TableCell } from 'src/components/ui/table';

const invoices = [
  {
    Persona: 'Persona 1',
    Especialidad: 'Especialidad',
  },
  {
    Persona: 'Persona 2',
    Especialidad: 'Especialidad',
  },
  {
    Persona: 'Persona 3',
    Especialidad: 'Especialidad',
  },
  {
    Persona: 'Persona 4',
    Especialidad: 'Especialidad',
  },
  {
    Persona: 'Persona 5',
    Especialidad: 'Especialidad',
  },
];

export function listCard() {
  return (
    <div className='bg-white w-full h-full flex justify-center flex-col items-center p-5 gap-4'>
      <h1 className='text-white text-2xl font-bold uppercase'>Lista de Cartas</h1>
      <TableBody className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {invoices.map((Persona) => (
          <TableRow className='border-b-0' key={Persona.Persona}>
            <TableCell>
              <Card className='bg-green-50 shadow-md h-52 w-52 flex flex-col rounded-none border-spacing-0 border-0'>
                <CardHeader className='bg-green-400 h-32 p-0 flex justify-center items-center rounded-none border-spacing-0'>
                  <Injuries fill='white' className='h-24 w-24' />
                </CardHeader>
                <CardContent className='bg-green-50 px-2 py-1 overflow-y-aut text-center'>
                  <CardTitle className='text-black font-montserrat font-bold text-sm'>{Persona.Persona}</CardTitle>
                  <CardDescription className='text-black font-roboto font-medium text-xs '>
                    {Persona.Especialidad}
                  </CardDescription>
                </CardContent>
              </Card>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </div>
  );
}
