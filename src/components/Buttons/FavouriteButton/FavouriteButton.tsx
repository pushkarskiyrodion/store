import { Link } from 'react-router-dom';
import '../Button.scss';

import { useAppSelector } from 'app/hooks/redux';

export const FavouriteButton = () => {
  const favourites = useAppSelector(state => state.favourite);

  return (
    <Link
      to="favourite"
      className="button"
    >
      <img src="./icons/favourite-icon.svg" alt="favourite" />
      <span className="button__count">{favourites.length}</span>
    </Link>
  );
};
