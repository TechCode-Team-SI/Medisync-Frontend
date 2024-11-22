import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation } from 'react-router-dom';

import { Button } from 'src/components/ui/button';
import { Form } from 'src/components/ui/form';
import GoBack from 'src/components/ui/icons/goBack';
import User from 'src/components/ui/icons/user';
import LoadingWrapper from 'src/components/wrappers/LoadingWrapper';
import { MainContentWrapper } from 'src/components/wrappers/mainContentWrapper';
import { SocketEnum, useWebScoket } from 'src/hooks/useWebSocket';
import { paths } from 'src/paths';
import { getLista, TicketComment } from 'src/services/api/interface';
import { TicketsHttp } from 'src/services/api/ticket';
import { TicketChat } from 'src/services/api/ticket/interface';
import { useSessionStore } from 'src/store/sessionStore';
import { cn } from 'src/utils';

import { demoSchema, DemoSchema } from './schema';

export function ChatClaims() {
  const location = useLocation();
  const ticket = location.state;

  const { data: comments, isFetching } = useQuery({
    queryKey: [`user-By-ID-${ticket?.id}`],
    queryFn: () => TicketsHttp.getTicketComments({ ticketId: ticket?.id ?? '' }),
  });

  return (
    <MainContentWrapper>
      <MainContentWrapper.Header>
        <div className='text-center relative'>
          <Link
            to={paths.attendclaims}
            className='flex absolute items-center justify-center left-0 top-0 w-10 h-10 bg-green-500 rounded-full'
          >
            <GoBack fill='white' width={30} />
          </Link>
          <h1 className='text-3xl font-bold text-green-500 mb-2'>{ticket.title}</h1>
        </div>
      </MainContentWrapper.Header>
      <MainContentWrapper.Body>
        <LoadingWrapper isLoading={isFetching}>{comments && <Chat comments={comments} />}</LoadingWrapper>
      </MainContentWrapper.Body>
    </MainContentWrapper>
  );
}

interface ChatProps {
  comments: getLista<TicketComment>;
}

function Chat(props: ChatProps) {
  const { user } = useSessionStore();
  const currentUser = user();
  const location = useLocation();
  const ticket = location.state;
  const [comments, setComments] = useState<TicketComment[]>(props.comments.data.reverse());
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { socket } = useWebScoket();

  const form = useForm<DemoSchema>({
    resolver: zodResolver(demoSchema),
  });

  useEffect(() => {
    if (socket) {
      socket.emit(SocketEnum.JOIN_ROOM, { roomId: ticket.id });

      socket.on(SocketEnum.TICKET_CHANNEL, (data: TicketChat) => {
        const newComment: TicketComment = {
          id: data.id,
          comment: data.message,
          createdBy: data.sender,
          createdAt: data.createdAt,
          updatedAt: data.createdAt,
        };
        setComments([...comments, newComment]);
      });
    }

    return () => {
      socket?.emit(SocketEnum.LEAVE_ROOM, { roomId: ticket.id });
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [comments]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ block: 'end', inline: 'nearest' });
  };

  const registerTicket = useMutation({
    mutationKey: [''],
    mutationFn: TicketsHttp.postTicket,
    onSuccess: (data: TicketComment) => {
      if (currentUser) {
        const message: TicketChat = {
          id: data.id,
          message: data.comment,
          sender: currentUser,
          createdAt: data.createdAt,
        };
        setComments([...comments, data]);
        socket?.emit(SocketEnum.TICKET_CHANNEL, {
          ...message,
          roomId: ticket.id,
        });
      }
    },
  });

  const onSubmit = (data: DemoSchema) => {
    form.reset();
    registerTicket.mutate({ id: ticket.id, comment: data.message });
  };

  return (
    <>
      <div className='flex flex-col p-2 gap-2 overflow-x-hidden overflow-y-auto scrollbar-edit w-full h-full'>
        {comments.map((comment) => {
          const isMyUser = comment.createdBy?.id === currentUser?.id;
          return (
            <div key={comment.id} className={cn('flex gap-2', isMyUser ? 'flex-row-reverse' : '')}>
              <div
                className={cn(
                  'flex rounded-full w-14 h-14 items-center justify-center',
                  isMyUser ? 'bg-green-800' : 'bg-gray-600',
                )}
              >
                <User fill='white' width={32}></User>
              </div>
              <div className={cn('flex flex-col w-full', isMyUser ? 'items-end' : '')}>
                <span>{comment?.createdBy?.fullName}</span>
                <div className={cn('p-2 w-4/6 text-white rounded-md', isMyUser ? 'bg-green-400' : 'bg-gray-500')}>
                  {comment.comment}
                </div>
                <span className='text-sm text-gray-400 font-light'>
                  {' '}
                  {format(comment.createdAt, 'P', { locale: es })}
                </span>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      <Form {...form}>
        <form
          className='flex mt-3 w-full left-0 bottom-0 border-green-300 border-2 p-2 rounded-lg'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <input
            className='w-full outline-none ring-0'
            type='text'
            {...form.register('message')}
            placeholder='Mensaje'
          />
          <Button isLoading={registerTicket.isPending} variant={'btnGreen'} type='submit'>
            Enviar
          </Button>
        </form>
      </Form>
    </>
  );
}
