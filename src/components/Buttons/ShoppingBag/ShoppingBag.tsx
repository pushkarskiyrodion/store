import { Link } from 'react-router-dom';
import '../Button.scss';

import { useAppSelector } from 'app/hooks/redux';

export const ShoppingBag = () => {
  const cart = useAppSelector(state => state.cart);

  return (
    <Link to="cart" className="button">
      <img src="./icons/shopping-bag.svg" alt="shopping" />
      <span className="button__count">{cart.length}</span>
    </Link>
  );
};
