import { FieldQuestionTypeEnum } from 'src/utils/constants';

import { getLista, WithPagination } from '../interface';

export type elementTopSpecialty = {
  specialtyId: string;
  name: string;
  avatar: File;
  requests: number;
};

export type elementTopMedic = {
  id: string;
  fullName: string;
  avatar: File;
  requests: number;
};

export type propsStatus = {
  time: StatisticsTimeEnum;
  date: Date;
};

export type dayTop = {
  weekday: string;
  requests: number;
};

export enum StatisticsTimeEnum {
  ALL_TIME = 'ALL_TIME',
  THIS_YEAR = 'THIS_YEAR',
  THIS_MONTH = 'THIS_MONTH',
  TODAY = 'TODAY',
}

export type propsFieldQuestions = {
  id: string;
  name: string;
  type: FieldQuestionTypeEnum;
};

export type propsQuestions = {
  type: FieldQuestionTypeEnum;
} & WithPagination;

export abstract class modelStatistics {
  abstract getTopMedics: (props: propsStatus) => Promise<elementTopMedic[]>;
  abstract getTopSpecialties: (props: propsStatus) => Promise<elementTopSpecialty[]>;
  abstract getTopWeekdays: (props: propsStatus) => Promise<dayTop[]>;
  abstract getFieldQuestions: (props: propsQuestions) => Promise<getLista<propsFieldQuestions>>;
}
