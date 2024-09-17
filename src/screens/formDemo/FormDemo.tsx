import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from 'src/components/ui/button';
import Calendar from 'src/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from 'src/components/ui/card';
import { Form } from 'src/components/ui/form';
import { Input } from 'src/components/ui/input';
import { InputPassword } from 'src/components/ui/inputPassword';
import { Label } from 'src/components/ui/label';

import { DemoSchema, demoSchema } from './schema';

export function FormDemo() {
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
          <CardTitle>Form Demo</CardTitle>
        </CardHeader>
        <CardContent className='overflow-auto'>
          <Form {...form}>
            <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
              <div className='flex gap-4'>
                <div className='space-y-2 w-full flex-1'>
                  <Label htmlFor='name'>Name</Label>
                  <Input id='name' className='w-full' {...form.register('name')} />
                  {form.formState.errors.name && (
                    <span className='text-red-500'>{form.formState.errors.name.message}</span>
                  )}
                </div>
                <div className='space-y-2 w-full flex-1'>
                  <Label htmlFor='email'>Email</Label>
                  <Input id='email' className='w-full' {...form.register('email')} />
                  {form.formState.errors.email && (
                    <span className='text-red-500'>{form.formState.errors.email.message}</span>
                  )}
                </div>
              </div>
              <div className='space-y-2'>
                <Label htmlFor='password'>Password</Label>
                <InputPassword id='password' className='w-full' {...form.register('password')} />
                {form.formState.errors.password && (
                  <span className='text-red-500'>{form.formState.errors.password.message}</span>
                )}
              </div>
              <div className='space-y-2'>
                <Label htmlFor='confirmPassword'>Confirm Password</Label>
                <InputPassword id='confirmPassword' {...form.register('confirmPassword')} />
                {form.formState.errors.confirmPassword && (
                  <span className='text-red-500'>{form.formState.errors.confirmPassword.message}</span>
                )}
              </div>
              <Button className='bg-purple-500 hover:bg-purple-600' type='submit'>
                Submit
              </Button>
            </form>
          </Form>
          <Calendar></Calendar>
        </CardContent>
      </Card>
    </div>
  );
}
