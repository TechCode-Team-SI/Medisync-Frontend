import { NotificationTypeEnum } from 'src/utils/constants';

import { WithPagination, getLista } from '../interface';

export type propsalert = {
  type: NotificationTypeEnum;
} & WithPagination;

export type Resp = {
  success: boolean;
};

export type propsNotifications = {
  id: string;
  notificationUserId: string;
  title: string;
  content: string;
  type: NotificationTypeEnum;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
} & WithPagination;

export abstract class modelNotifications {
  abstract getNotifications: (props: propsalert) => Promise<getLista<propsNotifications>>;
  abstract postReadMyNotifications: ({ id }: { id: string }) => Promise<Resp>;
}
