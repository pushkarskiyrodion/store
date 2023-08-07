type Param = string | number;

export interface QueryParams {
  [key: string]: Param | Param[] | null,
}
