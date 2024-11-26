import { FieldQuestionTypeEnum, StatisticsTimeEnum } from 'src/utils/constants';

import { FieldQuestion, getLista, WithPagination } from '../interface';

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

export type propsStatus2 = {
  label: string;
  time: StatisticsTimeEnum;
  date: Date;
};

export type dayTop = {
  weekday: string;
  requests: number;
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

export interface statisticsGraph {
  histograms: Histogram[];
  tarts: Tart[];
}

export interface Histogram {
  label: string;
  description: string;
  data: HistogramDatum[];
}

export interface HistogramDatum {
  label: string;
  frequency: number;
}

export interface Tart {
  label: string;
  description: string;
  data: TartDatum[];
}

export interface TartDatum {
  label: string;
  probabilities: number;
}

export interface elementDiagnosis {
  name: string;
  description: string;
  requests: number;
}

export abstract class modelStatistics {
  abstract getTopElementDiagnosis: (props: propsStatus2) => Promise<elementDiagnosis[]>;
  abstract getTopMedics: (props: propsStatus) => Promise<elementTopMedic[]>;
  abstract getTopSpecialties: (props: propsStatus) => Promise<elementTopSpecialty[]>;
  abstract getTopWeekdays: (props: propsStatus) => Promise<dayTop[]>;
  abstract getFieldQuestions: (props: propsQuestions) => Promise<getLista<propsFieldQuestions>>;
  abstract getAvailableSpecialtiesFilter: ({ id }: { id: string }) => Promise<getLista<propsSpecialtiesFilter>>;
  abstract postCreateStatisticData: (props: propsCreateStatisticData) => Promise<Metadata>;
  abstract getStatistics: () => Promise<statisticsGraph>;
}
