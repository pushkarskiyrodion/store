import { useAppSelector } from 'app/hooks/redux';
import { BackButton } from 'components/Buttons/BackButton';
import { CartProduct } from 'components/CartProduct';
import { Container } from 'components/Container/Container';
import { EmptyCart } from 'components/ErrorPages/EmptyCart';
import { useState } from 'react';

export const CartPage = () => {
  const cart = useAppSelector(state => state.cart);
  const [isClicked, setisClicked] = useState(false);

  const handleClick = () => {
    setisClicked(true);
  };

  const handleCloseMessage = () => {
    setisClicked(false);
  };

  const total = cart.reduce((acum, curr) => (
    acum + (curr.price * (curr.quantity || 1))
  ), 0);

  const items = cart.length === 1 ? 'item' : 'items';

  if (!cart.length) {
    return <EmptyCart />;
  }

  return (
    <Container>
      <section className="page__cart__section">
        <BackButton />

        <h3 className="page__title-main">Cart</h3>

        <div className="page__cart">
          <div className="page__cart__products">
            {cart.map(product => (
              <CartProduct
                key={product.id}
                product={product}
              />
            ))}
          </div>

          <div className="page__cart__total__wrapper">
            <div className="page__cart__total">
              <p className="page__title-section">
                {`$${total}`}
              </p>

              <p className="page__cart__items">
                {`Total for ${cart.length} ${items}`}
              </p>
            </div>

            <button
              className="page__cart__checkout"
              type="button"
              onClick={handleClick}
            >
              Checkout
            </button>

            {isClicked && (
              <div className="page__cart__checkout__text">
                We are sorry, but this feature is not implemented yet
                <button
                  className="page__cart__checkout__close"
                  type="button"
                  aria-label="none"
                  onClick={handleCloseMessage}
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </Container>
  );
};
