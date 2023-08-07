import { ErrorTemplate } from './ErrorTemplate';

export const NoSearchResults = () => (
  <ErrorTemplate
    src="./img/no-search-results.jpg"
    alt="no-search-results"
    title="There are no products matching the query 🔍"
  />
);
