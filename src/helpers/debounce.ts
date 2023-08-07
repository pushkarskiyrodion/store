import { QueryParams } from 'types/QueryParams';

export const debounce = (
  f: (params: QueryParams) => void,
  delay: number,
) => {
  let timeoutId: NodeJS.Timeout;

  return (params: QueryParams) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => f(params), delay);
  };
};
