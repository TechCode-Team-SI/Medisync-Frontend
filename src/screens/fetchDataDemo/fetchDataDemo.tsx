import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';

import { Invoice } from 'src/@types/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'src/components/ui/card';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from 'src/components/ui/table';
import { getInvoices } from 'src/services/api/demo';

export function FetchDataDemo() {
  //IMPORTANTE: tipar el tipo de dato que espera obtener del query, de esta forma cuando pasemos de dummy
  //data a data real, reducimos la posibilidad de haber bugs inesperados ya que el tipado nos avisara
  //de cualquier cambio que entre en conflicto con la implementacion
  const query = useQuery<Invoice[]>({ queryKey: ['todos'], queryFn: getInvoices });

  return (
    <div className='bg-gray-800 w-full h-full flex justify-center flex-col items-center p-5 gap-4'>
      <h1 className='text-white text-2xl font-bold uppercase'>Table Demo</h1>
      <Card className='h-96 overflow-hidden flex flex-col'>
        <CardHeader>
          <CardTitle>Invoices Demo</CardTitle>
          <CardDescription>A list of your recent invoices.</CardDescription>
        </CardHeader>
        <CardContent className='h-72 overflow-auto'>
          {query.data ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className='w-[100px]'>Invoice</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead className='text-right'>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {query.data.map((invoice) => (
                  <TableRow key={invoice.invoice}>
                    <TableCell className='font-medium'>{invoice.invoice}</TableCell>
                    <TableCell>{invoice.paymentStatus}</TableCell>
                    <TableCell>{invoice.paymentMethod}</TableCell>
                    <TableCell className='text-right'>{invoice.totalAmount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>Total</TableCell>
                  <TableCell className='text-right'>$2,500.00</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          ) : (
            <div className='w-full h-full flex justify-center items-center flex-col gap-2'>
              <Loader2 className='animate-spin repeat-infinite' />
              <p>Cargando datos...</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
