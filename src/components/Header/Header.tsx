import { useAppSelector } from 'app/hooks/redux';
import { Link } from 'react-router-dom';

import './Header.scss';

import { FavouriteButton } from 'components/Buttons/FavouriteButton';
import { ShoppingBag } from 'components/Buttons/ShoppingBag';
import { Search } from 'components/Search';
import { Logo } from 'components/Logo';
import { Menu } from './Menu';

type Props = {
  onSetAuthNavigateTo: React.Dispatch<React.SetStateAction<string>>,
  handleOpenAuth: React.Dispatch<React.SetStateAction<boolean>>,
}

export const Header: React.FC<Props> = ({ handleOpenAuth, onSetAuthNavigateTo }) => {
  const auth = useAppSelector((state) => state.auth);

  const handleClickAuth = () => {
    handleOpenAuth(true);
    onSetAuthNavigateTo('/profile');
  }

  return (
    <header className="header">
      <div className="header__info">
        <Logo />
        <Menu />
      </div>

      <div className="header__info">
        <Search />

        {auth.isAuthorized ? (
          <Link title="Profile" to="/profile" className="header__sign-out">
            <img src="./icons/profile.svg" alt="sign-out" />
          </Link>
        ) : (
          <button
            title="Log In"
            className="header__sign-out"
            onClick={handleClickAuth}
          >
            <img src="./icons/sign-out.svg" alt="sign-out" />
          </button>
        )}

        <FavouriteButton />
        <ShoppingBag />
      </div>
    </header>
  );
};
