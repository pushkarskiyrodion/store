import { ErrorTemplate } from './ErrorTemplate';

export const NoFavourites = () => (
  <ErrorTemplate
    src="./img/no-favourites.jpg"
    alt="empty cart"
    title="Click the heart icon on any product to add a favorite ❤"
  />
);
