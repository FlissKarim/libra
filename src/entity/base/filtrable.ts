export class Operators {
  eq?: number | string | number[] | string[]
  lte?: number
  gte?: number
  exists?: boolean
  not?: any
  regex?: string
  before?: string
  after?: string
};

export class Aggregations {
  count?: number
  sum?: number
  avg?: number
};

export enum Operator {
  eq,
  lte,
  gte,
  exists,
  not,
  regex,
  before,
  after,
};

export enum Aggregation {
  count,
  sum,
  avg,
}

export type Property<T> = {
  [P in keyof T]: Operators;
}

export abstract class Filtrable<T> {
  public abstract map<T>(): Property<T>;
}

