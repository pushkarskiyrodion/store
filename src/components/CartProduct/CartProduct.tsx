import classNames from 'classnames';
import './CartProduct.scss';

import { actions as cartActions } from 'features/cartReducer';
import { useAppDispatch } from 'app/hooks/redux';
import { ICartProduct } from 'types/ICartProduct';

type Props = {
  product: ICartProduct,
};

export const CartProduct: React.FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();
  const {
    image,
    name,
    price,
    quantity,
  } = product;

  const handleAddQuantity = () => {
    dispatch(cartActions.addQuantity(product));
  };

  const handleRemoveQuantity = () => {
    dispatch(cartActions.removeQuantity(product));
  };

  const handleDelete = () => {
    dispatch(cartActions.remove(product));
  };

  return (
    <div className="cart-product">
      <div className="cart-product__wrapper">
        <button
          aria-label="none"
          className="cart-product__close"
          type="button"
          onClick={handleDelete}
        />

        <img
          className="cart-product__image"
          src={image}
          alt={name}
        />

        <p className="cart-product__name">
          {name}
        </p>
      </div>

      <div className="cart-product__count">
        <div className="cart-product__count__wrapper">
          <button
            aria-label="none"
            type="button"
            onClick={handleRemoveQuantity}
            className={classNames('cart-product__button', {
              'cart-product__button--minus': quantity > 1,
              'cart-product__button--minus-disabled': quantity === 1,
            })}
            disabled={quantity === 1}
          />

          <p className="cart-product__quantity">
            {quantity}
          </p>

          <button
            aria-label="none"
            type="button"
            onClick={handleAddQuantity}
            className="cart-product__button cart-product__button--plus"
          />
        </div>

        <p className="page__title-section">
          {`$${price}`}
        </p>
      </div>
    </div>
  );
};
