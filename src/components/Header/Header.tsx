import './Header.scss';

import { FavouriteButton } from 'components/Buttons/FavouriteButton';
import { ShoppingBag } from 'components/Buttons/ShoppingBag';
import { Search } from 'components/Search';
import { Logo } from 'components/Logo';
import { Menu } from './Menu';

export const Header = () => {
  return (
    <header className="header">
      <div className="header__info">
        <Logo />
        <Menu />
      </div>

      <div className="header__info">
        <Search />
        <FavouriteButton />
        <ShoppingBag />
      </div>
    </header>
  );
};
