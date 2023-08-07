import classNames from 'classnames';
import './AddItem.scss';

import { actions as favouriteActions } from 'features/favouriteReducer';
import { useAppDispatch, useAppSelector } from 'app/hooks/redux';
import { actions as cartActions } from 'features/cartReducer';
import { ICatalogProduct } from 'types/CatalogProduct';

type Props = {
  product: ICatalogProduct | null,
};

export const AddItem: React.FC<Props> = ({ product }) => {
  const favourite = useAppSelector(state => state.favourite);
  const cart = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();

  const isInFavourite = favourite.find(cartProduct => (
    cartProduct.phoneId === product?.phoneId
  ));

  const isInCart = cart.find(cartProduct => (
    cartProduct.phoneId === product?.phoneId
  ));

  const handleAddToCart = () => {
    if (product) {
      dispatch(cartActions.add(product));
    }
  };

  const handleAddToFavourite = () => {
    if (product) {
      if (isInFavourite) {
        dispatch(favouriteActions.remove(product));
      }

      if (!isInFavourite) {
        dispatch(favouriteActions.add(product));
      }
    }
  };

  const title = isInCart ? 'Added to cart' : 'Add to card';

  return (
    <div className="add-item__wrapper">
      <button
        type="button"
        className={classNames('add-item__to-card', {
          'add-item__to-card--added': isInCart,
        })}
        onClick={handleAddToCart}
      >
        {title}
      </button>

      <button
        aria-label="none"
        type="button"
        className={classNames('add-item__favorite', {
          'add-item__favorite--added': isInFavourite,
        })}
        onClick={handleAddToFavourite}
      />
    </div>
  );
};
