import { StatisticComponent } from '../runtime';
import { Encode } from './encode';

export type Statistic =
  | StackYStatistic
  | DodgeXStatistic
  | StackDurationStatistic
  | SplitPositionStatistic
  | CustomStatistic
  | KeyStatistic
  | GroupXStatistic
  | TitleStatistic;

export type StatisticTypes =
  | 'dodgeX'
  | 'stackY'
  | 'stackEnter'
  | 'splitPosition'
  | 'key'
  | 'groupX'
  | 'title'
  | StatisticComponent;

export type DodgeXStatistic = {
  type?: 'dodgeX';
};

export type StackYStatistic = {
  type?: 'stackY';
};

export type StackDurationStatistic = {
  type?: 'stackEnter';
  by?: string[];
};

export type SplitPositionStatistic = {
  type?: 'splitPosition';
};

export type KeyStatistic = {
  type?: 'key';
};

export type GroupXStatistic = {
  type?: 'groupX';
  output?: Record<string, string>;
};

export type TitleStatistic = {
  type?: 'title';
};

export type CustomStatistic = {
  type?: StatisticComponent;
  [key: string]: any;
};
