import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardImg } from 'src/components/ui/card';
import MedicalStaff from 'src/components/ui/icons/medicalStaff';
import { TableRow, TableBody, TableCell } from 'src/components/ui/table';

const invoices = [
  {
    Persona: 'Persona 1',
    Especialidad: 'Especialidad',
    src: 'assets/img/installationImage.png',
  },
  {
    Persona: 'Persona 2',
    Especialidad: 'Especialidad',
    src: 'assets/img/Anotación 2024-08-14 164553.png',
  },
  {
    Persona: 'Persona 3',
    Especialidad: 'Especialidad',
    src: 'assets/img/Anotación 2024-08-14 164553.png',
  },
  {
    Persona: 'Persona 4',
    Especialidad: 'Especialidad',
    src: ' ',
  },
  {
    Persona: 'Persona 5',
    Especialidad: 'Especialidad',
    src: ' ',
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
                  <CardImg
                    src={Persona.src}
                    fallback={<MedicalStaff fill='white' className='h-24 w-24' />}
                    className='w-20 h-20'
                  />
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
