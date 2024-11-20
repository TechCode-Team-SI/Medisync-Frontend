import { zodResolver } from '@hookform/resolvers/zod';
// import { useMutation, useQuery } from '@tanstack/react-query';
// import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation } from 'react-router-dom';

import { UserType } from 'src/components/navbar/userType/userType';
import { Button } from 'src/components/ui/button';
import { Form } from 'src/components/ui/form';
import GoBack from 'src/components/ui/icons/goBack';
import User from 'src/components/ui/icons/user';
// import { SocketEnum, useWebScoket } from 'src/hooks/useWebSocket';
// import { TicketsHttp } from 'src/services/api/ticket';
// import { TicketChat } from 'src/services/api/ticket/interface';

import { demoSchema, DemoSchema } from './schema';

const dummy = [
  {
    id: 1,
    user: 'Usuario1',
    time: '14:36',
    message:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo nostrum similique ex reprehenderit eius.',
  },
  {
    id: 2,
    user: 'Usuario2',
    time: '14:37',
    message:
      'Tempore a enim, ipsum magnam dolor vel explicabo quasi pariatur voluptatibus et nihil autem quisquam quos?',
  },
  {
    id: 3,
    user: 'Usuario1',
    time: '14:44',
    message:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo nostrum similique ex reprehenderit eius.',
  },
  {
    id: 4,
    user: 'Usuario2',
    time: '14:47',
    message:
      'Tempore a enim, ipsum magnam dolor vel explicabo quasi pariatur voluptatibus et nihil autem quisquam quos?',
  },
  {
    id: 5,
    user: 'Usuario1',
    time: '14:50',
    message:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo nostrum similique ex reprehenderit eius.',
  },
  {
    id: 6,
    user: 'Usuario1',
    time: '14:50',
    message:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo nostrum similique ex reprehenderit eius.',
  },
  {
    id: 7,
    user: 'Usuario2',
    time: '14:55',
    message:
      'Tempore a enim, ipsum magnam dolor vel explicabo quasi pariatur voluptatibus et nihil autem quisquam quos?',
  },
];

export function ChatSuggestions() {
  const location = useLocation();
  const ticket = location.state;

  // const { socket } = useWebScoket();

  const form = useForm<DemoSchema>({
    resolver: zodResolver(demoSchema),
  });

  // const {
  //   data: datalist,
  //   isFetching,
  //   refetch,
  // } = useQuery({
  //   queryKey: [],
  //   queryFn: () => TicketsHttp.getTicketComplaint,
  // });

  // useEffect(() => {
  //   console.log(ticket);
  //   console.log(isFetching);
  //   setTimeout(() => {
  //     console.log(datalist);
  //   }, 5000);
  //   if (socket) {
  //     socket.emit(SocketEnum.JOIN_ROOM, ticket.id);
  //   }
  // }, []);

  // const registerTicket = useMutation({
  //   mutationKey: [''],
  //   mutationFn: TicketsHttp.postTicket,
  //   onSuccess: (data) => {
  //     const message: TicketChat = {
  //       id: data.id,
  //       message: data.comment,
  //       sender: JSON.parse(window.localStorage.getItem('user1')).state.session.user,
  //       createdAt: data.createdAt,
  //     };
  //     socket?.emit(SocketEnum.TICKET_CHANNEL, message);

  //     form.control._reset();
  //   },
  // });

  const onSubmit = (data: DemoSchema) => {
    dummy.push({ id: dummy.length + 1, user: 'Usuario1', message: data.message, time: '14:55' });
    form.reset();
    // console.log(data.message);
    // registerTicket.mutate({ id: ticket.id, comment: data.message });
  };

  return (
    <div className='bg-green-400 w-full h-full flex flex-row items-center relative'>
      <div className='flex flex-col h-full w-full p-10 pb-0 bg-green-600 border-none rounded-none rounded-l-xl'>
        <div className='bg-white min-h-[60px] max-h-[60px] w-full mb-4 flex fles-row justify-end rounded-lg items-center px-5 sm:px-10 lg:px-20'>
          <UserType />
        </div>
        <div className='flex flex-col relative items-center bg-white w-full h-full overflow-y-auto scrollbar-edit shadow-lg rounded-t-3xl px-6 py-4'>
          <Link
            to={'/attendClaims'}
            className='flex absolute items-center justify-center left-3 top-3 w-10 h-10 bg-green-500 rounded-full'
          >
            <GoBack fill='white' width={30} />
          </Link>
          <h1 className='text-3xl font-bold text-green-500 mb-2'>{ticket.title}</h1>
          <div className='flex flex-col p-2 gap-2 overflow-x-hidden overflow-y-auto scrollbar-edit w-full h-full'>
            {dummy ? (
              dummy.map((dum) =>
                dum.user === 'Usuario1' ? (
                  <div key={dum.id} className='flex flex-row-reverse gap-2'>
                    <div className='flex rounded-full w-14 h-14 bg-green-800 items-center justify-center'>
                      <User fill='white' width={32}></User>
                    </div>
                    <div className='flex flex-col w-full items-end'>
                      <span>{dum.user}</span>
                      <div className='p-2 bg-green-400 w-4/6 text-white rounded-md'>{dum.message}</div>
                      <span>{dum.time}</span>
                    </div>
                  </div>
                ) : (
                  <div key={dum.id} className='flex gap-2'>
                    <div className='flex rounded-full w-14 h-14 bg-gray-600 items-center justify-center'>
                      <User fill='white' width={32}></User>
                    </div>
                    <div className='flex flex-col w-full'>
                      <span>{dum.user}</span>
                      <div className='p-2 bg-gray-500 w-4/6 text-white rounded-md'>{dum.message}</div>
                      <span>{dum.time}</span>
                    </div>
                  </div>
                ),
              )
            ) : (
              <span className='self-center mt-16'>No hay mensajes</span>
            )}
          </div>
          <Form {...form}>
            <form
              className='flex mt-3 w-full left-0 bottom-0 border-green-300 border-2 p-2 rounded-lg'
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <input className='w-full' type='text' {...form.register('message')} placeholder='Mensaje' />
              <Button variant={'btnGreen'} type='submit'>
                Enviar
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
