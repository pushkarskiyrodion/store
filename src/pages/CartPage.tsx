import { useAppSelector } from 'app/hooks/redux';
import { useNavigate } from 'react-router-dom';

import { BackButton } from 'components/Buttons/BackButton';
import { CartProduct } from 'components/CartProduct';
import { Container } from 'components/Container/Container';
import { EmptyCart } from 'components/ErrorPages/EmptyCart';

type Props = {
  onSetAuthNavigateTo: React.Dispatch<React.SetStateAction<string>>,
  handleOpenAuth: React.Dispatch<React.SetStateAction<boolean>>,
}

export const CartPage: React.FC<Props> = ({ handleOpenAuth, onSetAuthNavigateTo }) => {
  const cart = useAppSelector(state => state.cart);
  const auth = useAppSelector(state => state.auth);
  const navigate = useNavigate();

  const handleClick = () => {    
    if (!auth.isAuthorized) {
      onSetAuthNavigateTo('/checkout?step=1')
      handleOpenAuth(true);

      return;
    }

    navigate('/checkout?step=1')
  }

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
              className="page__button page__cart__checkout"
              type="button"
              onClick={handleClick}
            >
              Checkout
            </button>
          </div>
        </div>
      </section>
    </Container>
  );
};
