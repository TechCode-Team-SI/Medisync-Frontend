import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from 'src/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from 'src/components/ui/card';
import { DatePicker } from 'src/components/ui/datepicker';
import { DatePickerWithRange } from 'src/components/ui/datepicker-range';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from 'src/components/ui/form';

import { DemoSchema, demoSchema } from './schema';

export function DatePickerDemo() {
  const form = useForm<DemoSchema>({
    resolver: zodResolver(demoSchema),
  });

  const onSubmit = (data: DemoSchema) => {
    console.log(data);
  };

  return (
    <div className='bg-gray-800 w-full h-full flex justify-center flex-col items-center p-5 gap-4'>
      <h1 className='text-white text-2xl font-bold uppercase'>Table Demo</h1>
      <Card className='h-fit w-full max-w-2xl overflow-hidden flex flex-col'>
        <CardHeader>
          <CardTitle>Form Date Picker</CardTitle>
        </CardHeader>
        <CardContent className='overflow-auto'>
          <Form {...form}>
            <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name='birthday'
                render={({ field: { ...field } }) => (
                  <FormItem className='flex items-center gap-4'>
                    <FormLabel>Birthday</FormLabel>
                    <FormControl>
                      <DatePicker initialDate={field.value} onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='range'
                render={({ field: { ...field } }) => (
                  <FormItem className='flex items-center gap-4'>
                    <FormLabel>Range</FormLabel>
                    <FormControl>
                      <DatePickerWithRange initialDateRange={field.value} onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className='bg-purple-500 hover:bg-purple-600' type='submit'>
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
