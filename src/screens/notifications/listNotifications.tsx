import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CheckCheck } from 'lucide-react';
import { useState } from 'react';

import PaginationController from 'src/components/common/pagination';
import { Button } from 'src/components/ui/button';
import { CardTitle } from 'src/components/ui/card';
import LoadingWrapper from 'src/components/wrappers/LoadingWrapper';
import { MainContentWrapper } from 'src/components/wrappers/mainContentWrapper';
import { NotificationsHttp } from 'src/services/api/notifications';
import { cn } from 'src/utils';
import { NotificationTypeEnum } from 'src/utils/constants';

export function ListNotifications() {
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();

  const {
    data: list,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: [`${page}`, `get-all-notifications`],
    queryFn: ({ queryKey }) =>
      NotificationsHttp.getNotifications({
        page: queryKey[0],
        type: NotificationTypeEnum.WORK,
      }),
  });

  const ReadNotifications = useMutation({
    mutationKey: [''],
    mutationFn: NotificationsHttp.postReadMyNotifications,
    onSuccess: () => {
      console.log('leida');
      queryClient.invalidateQueries({ queryKey: [`${page}`, `get-all-notifications`] });
    },
    onError: () => {
      console.log('no funciono');
    },
  });

  console.log(list);

  const onclick = (appointmentId: string) => {
    ReadNotifications.mutate({ id: appointmentId });
  };

  return (
    <MainContentWrapper>
      <MainContentWrapper.Header title='MIS NOTIFICACIONES' />
      <MainContentWrapper.Body>
        <LoadingWrapper isLoading={!(list?.data && !isFetching)}>
          {list?.data.map((notifications) => (
            <div
              key={notifications.id}
              className={cn(
                'w-full transition-all min-h-36 transform drop-shadow-md hover:drop-shadow-lg border-none rounded-md flex flex-col px-5 py-4 overflow-hidden items-start relative',
                notifications.read ? 'bg-white' : 'bg-green-100',
              )}
            >
              <CardTitle className='w-full font-roboto text-lg font-bold flex text-green-400 hover:text-green-400'>
                {notifications.title}
              </CardTitle>
              <div className='flex flex-row items-center justify-between w-full'>
                <span className='text-gray-600 text-sm font-medium flex-1'>{notifications.content}</span>
                <Button
                  onClick={() => onclick(notifications.notificationUserId)}
                  className='ml-4 p-3 drop-shadow-md hover:drop-shadow-lg h-fit rounded-full bg-white hover:bg-green-200'
                >
                  <CheckCheck className='fill-current text-green-400 h-4 w-4' />
                </Button>
              </div>
            </div>
          ))}
        </LoadingWrapper>
      </MainContentWrapper.Body>
      <MainContentWrapper.Footer>
        <PaginationController totalPages={list?.totalPages} setPage={setPage} />
      </MainContentWrapper.Footer>
    </MainContentWrapper>
  );
}
