import { useEffect, useState } from 'react';
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { useAppSelector } from 'app/hooks/redux';
import InputMask from 'react-input-mask';
import classNames from 'classnames';

import './Checkout.scss';

import { Pay } from './Pay';
import { delivery } from 'data/delivery';
import { payValidation } from 'helpers/payValitation';

export interface DeliveryDetails {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  city: string;
  address: string;
  phone: string;
}

export interface CardNumber {
  first: string;
  second: string;
  third: string;
  fourth: string;
}

export interface PayDetails {
  cardNumber: CardNumber;
  cardHolderName: string;
  expirationDate: string;
  cvv: string;
}

export const Checkout = () => {
  const [deliveryInputs, setDeliveryInputs] = useState(delivery);
  const auth = useAppSelector((state) => state.auth);
  const cart = useAppSelector((state) => state.cart);
  const [deliveryDetails, setDeliveryDetails] = useState<DeliveryDetails>({
    firstName: auth.user?.name || '',
    lastName: auth.user?.surname || '',
    email: auth.user?.email || '',
    country: '',
    city: '',
    address: '',
    phone: '',
  });
  const [payDetails, setPayDetails] = useState<PayDetails>({
    cardNumber: {
      first: '',
      second: '',
      third: '',
      fourth: '',
    },
    cardHolderName: '',
    expirationDate: '',
    cvv: '',
  });
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const step = parseInt(searchParams.get('step') || '1');

  const checkValidOfDeliveryDetails = () => {
    return deliveryInputs.every(({ name, pattern }) => {
      const regex = new RegExp(pattern);
      const value = deliveryDetails[name as keyof DeliveryDetails];

      return regex.test(value);
    });
  };

  const checkRequiredData = () => {
    const isDetailsValid = checkValidOfDeliveryDetails();
    const isPayValid = payValidation(payDetails);

    if (!isDetailsValid && step === 1) {
      return false;
    }

    if (!isPayValid && step === 2) {
      return false;
    }

    if (!isDetailsValid && !isPayValid && step === 3) {
      return false;
    }

    return true;
  };

  useEffect(() => {
    const handlePopstate = (e: PopStateEvent) => {
      if (e.state && e.state.step < step) {
        navigate(`${location.pathname}?step=${e.state.step}`, {
          replace: true,
        });
      }
    };

    window.addEventListener('popstate', handlePopstate);

    return () => {
      window.removeEventListener('popstate', handlePopstate);
    };
  }, []);

  useEffect(() => {
    if (step > 3) {
      navigate(`${location.pathname}?step=${currentStep}`, {
        replace: true,
      });
    }

    if (!checkValidOfDeliveryDetails()) {
      navigate(`${location.pathname}?step=${1}`, {
        replace: true,
      });

      return;
    }

    if (!payValidation(payDetails) && step >= 2) {
      navigate(`${location.pathname}?step=${2}`, {
        replace: true,
      });

      return;
    }

  }, [location.search]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setDeliveryDetails((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { pattern, name } = e.target;
    const value = deliveryDetails[name as keyof DeliveryDetails];
    const regex = new RegExp(pattern);

    if (!regex.test(value)) {
      setDeliveryInputs((current) =>
        current.map((input) => {
          if (input.name === name) {
            return {
              ...input,
              isValid: false,
            };
          }

          return input;
        })
      );
    }
  };

  const handleNext = () => {
    setIsButtonClicked(true);

    if (checkRequiredData()) {
      const nextStep = currentStep >= 3 ? 3 : currentStep + 1;
      setCurrentStep(nextStep);
      navigate(`${location.pathname}?step=${nextStep}`);
      setIsButtonClicked(false);
    }
  };

  const items = cart.length === 1 ? 'item' : 'items';
  const total = cart.reduce(
    (acum, curr) => acum + curr.price * (curr.quantity || 1),
    0
  );

  return (
    <section className="checkout">
      <div className="checkout__main">
        <header className="checkout__header">
          <div
            className={classNames('checkout__link', {
              'checkout__link--active': location.search === '?step=1',
              'checkout__link--passed': location.search !== '?step=1',
            })}
          >
            <span className="checkout__link__text">1</span>
          </div>

          <div
            className={classNames('checkout__step-line', {
              'checkout__step-line--passed': location.search !== '?step=1',
            })}
          />

          <div
            className={classNames('checkout__link', {
              'checkout__link--active': location.search === '?step=2',
              'checkout__link--passed':
                location.search !== '?step=1' && location.search !== '?step=2',
            })}
          >
            <span className="checkout__link__text">2</span>
          </div>

          <div
            className={classNames('checkout__step-line', {
              'checkout__step-line--passed':
                location.search !== '?step=1' && location.search !== '?step=2',
            })}
          />

          <div
            className={classNames('checkout__link', {
              'checkout__link--active': location.search === '?step=3',
              'checkout__link--passed':
                location.search !== '?step=1' && location.search !== '?step=2',
            })}
          >
            <span className="checkout__link__text">3</span>
          </div>
        </header>

        <div className="checkout__container">
          {location.search === '?step=1' && (
            <div>
              <h1 className="checkout__info__title">Delivery Details</h1>

              <div>
                {deliveryInputs.map(
                  ({
                    id,
                    type,
                    name,
                    label,
                    pattern,
                    isValid,
                    errorLabel,
                    disabled,
                  }) => {
                    const regex = new RegExp(pattern);
                    const value =
                      deliveryDetails[name as keyof DeliveryDetails];
                    const condition =
                      !regex.test(value) && (!isValid || isButtonClicked);

                    if (name === 'phone') {
                      return (
                        <label
                          className={classNames('page__label checkout__label', {
                            'page__label--error': condition,
                          })}
                          key={id}
                        >
                          {condition ? errorLabel : label}
                          <InputMask
                            key={id}
                            className={classNames('page__input', {
                              'page__input--error': condition,
                            })}
                            mask="+999 (99) 999 99 99"
                            maskChar=""
                            type="tel"
                            name={name}
                            pattern={pattern}
                            value={value}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled={disabled}
                          />
                        </label>
                      );
                    }

                    return (
                      <label
                        className={classNames('page__label checkout__label', {
                          'page__label--error': condition,
                          'page__label--disabled': disabled,
                        })}
                        key={id}
                      >
                        {condition ? errorLabel : label}
                        <input
                          className={classNames('page__input', {
                            'page__input--error': condition,
                            'page__input--disabled': disabled,
                          })}
                          title={
                            disabled && type !== 'email'
                              ? `It's a disabled field, you have to change it in your cabinet`
                              : ''
                          }
                          name={name}
                          value={value}
                          type={type}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          disabled={disabled}
                          pattern={pattern}
                        />
                      </label>
                    );
                  }
                )}
              </div>
            </div>
          )}

          {location.search === '?step=2' && (
            <Pay
              onSetPayDetails={setPayDetails}
              payDetails={payDetails}
              isSubmitted={isButtonClicked}
            />
          )}

          {location.search === '?step=3' && (
            <div className="checkout__completed">
              <h2 className="checkout__completed__title">
                THANK YOU FOR YOUR ORDER 🙂
              </h2>

              <div className="checkout__completed__image__container">
                <img
                  className="checkout__completed__image"
                  src="./img/order-completed.jpg"
                  alt="checkout-completed"
                />
              </div>
            </div>
          )}
        </div>

        <div className="checkout__button-container">
          {location.search === '?step=1' && (
            <button
              type="submit"
              className="page__button checkout__button"
              onClick={handleNext}
            >
              Purchase
            </button>
          )}

          {location.search === '?step=3' && (
            <Link to="/" className="page__go-home">
              Go Home
            </Link>
          )}

          {location.search === '?step=2' && (
            <div className="page__cart__total__wrapper">
              <div className="page__cart__total">
                <p className="page__title-section">{`$${total}`}</p>

                <Link to="/cart">
                  <p className="page__cart__items page__cart__items__link">
                    {`Total for ${cart.length} ${items}`}
                  </p>
                </Link>
              </div>

              <button
                type="submit"
                className="page__button checkout__button"
                onClick={handleNext}
              >
                Purchase
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
