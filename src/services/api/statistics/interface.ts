import {
  ChartTypeEnum,
  FieldQuestionTypeEnum,
  GenderEnum,
  StatisticsTimeEnum,
  StatisticsTimeUnitEnum,
} from 'src/utils/constants';

import { FieldQuestion, getLista, WithPagination } from '../interface';

export type propsStatisticsTop = {
  time: StatisticsTimeEnum;
  date: Date;
  label?: string;
  specialtyId?: string;
  gender?: GenderEnum;
  ageFrom?: number;
  ageTo?: number;
  grouping?: StatisticsTimeUnitEnum;
};

export type propsFieldQuestions = {
  id: string;
  name: string;
  type: FieldQuestionTypeEnum;
};

export type propsSpecialtiesFilter = {
  id: string;
  name: string;
};

export type propsQuestions = {
  type: FieldQuestionTypeEnum;
} & WithPagination;

export type propsCreateStatisticData = {
  label: string;
  type: string;
  filteredByType?: string;
  filter?: string;
  fieldQuestion: propsFieldQuestion;
};

export type propsFieldQuestion = {
  id: string;
};

export type Metadata = {
  id: string;
  label: string;
  fieldQuestion: FieldQuestion;
  type: string;
  filteredByType: string;
  filter: null;
  createdAt: Date;
  updatedAt: Date;
};

export interface statisticsTopParams {
  [key: string]: string | number | undefined | StatisticsTimeUnitEnum;
  to: string;
  from: string;
  specialtyId?: string;
  gender?: string;
  ageFrom?: number;
  ageTo?: number;
  grouping?: StatisticsTimeUnitEnum;
}

export interface ChartGeneric {
  chart: Chart[];
}

export interface Chart {
  type: ChartTypeEnum;
  title: string;
  description: string;
  data: {
    category: string;
    value: number;
  }[];
}

export interface elementTop {
  name: string;
  requests: number;
}

export abstract class modelStatistics {
  abstract getTopStatistics: (props: propsStatisticsTop) => Promise<elementTop[]>;
  abstract getTopStatisticsChart: (props: propsStatisticsTop, chartType: ChartTypeEnum) => Promise<Chart[]>;
  abstract getFieldQuestions: (props: propsQuestions) => Promise<getLista<propsFieldQuestions>>;
  abstract getAvailableSpecialtiesFilter: ({ id }: { id: string }) => Promise<getLista<propsSpecialtiesFilter>>;
  abstract postCreateStatisticData: (props: propsCreateStatisticData) => Promise<Metadata>;
  abstract getStatistics: () => Promise<Chart[]>;
}
