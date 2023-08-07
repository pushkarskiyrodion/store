import { ErrorTemplate } from './ErrorTemplate';

export const NotFound = () => (
  <ErrorTemplate
    src="./img/not-found.jpg"
    title="Sorry, something went wrong 😕"
    alt="not found"
  />
);
