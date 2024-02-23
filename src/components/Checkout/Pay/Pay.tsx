import { useRef, useState } from 'react';
import classNames from 'classnames';

import { PaymentSystem } from '../PaymentSystem';
import { PayDetails } from '../Checkout';

import { expirationDateRegex } from 'helpers/payValitation';

import './Pay.scss';

type Props = {
  onSetPayDetails: React.Dispatch<React.SetStateAction<PayDetails>>;
  payDetails: PayDetails;
  isSubmitted: boolean;
};

export const Pay: React.FC<Props> = ({
  onSetPayDetails,
  payDetails,
  isSubmitted,
}) => {
  const [selectedInput, setSelectedInput] = useState<HTMLInputElement | null>(null);
  const expirationDateRef = useRef<HTMLInputElement>(null);
  const cardholderNameRef = useRef<HTMLInputElement>(null);
  const cardNumbersRef = useRef<HTMLInputElement[]>([]);
  const cvvRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState({
    cardNumber: false,
    expirationDate: false,
    cardHolderName: false,
    cvv: false,
  });

  const getCardRef = (index: number) => cardNumbersRef.current[index];

  const handleNextInputFocus = (
    e: React.ChangeEvent<HTMLInputElement>,
    ref: HTMLInputElement | null
  ) => {
    const { value, minLength } = e.target;

    if (ref && value.length >= minLength) {
      ref.focus();
    }
  };

  const handleCardInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    ref: HTMLInputElement | null
  ) => {
    const { name, value } = e.target;
    const newValue = value.length > 4 ? value.slice(0, 4) : value;

    onSetPayDetails((current) => ({
      ...current,
      cardNumber: {
        ...current.cardNumber,
        [name]: newValue,
      },
    }));

    handleNextInputFocus(e, ref);
  };

  const handleChangeCardHolder = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSetPayDetails((current) => ({
      ...current,
      cardHolderName: e.target.value,
    }));
  };

  const handleChangeCVV = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, minLength } = e.target;
    const regexCVV = /[0-9]/;

    if (value === '' || regexCVV.test(value)) {
      const newValue = value.length >= minLength
        ? value.slice(0, minLength) 
        : value;

      onSetPayDetails((current) => ({
        ...current,
        cvv: newValue,
      }));
    }
  };

  const handleExpirationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const formattedValue = value
      .replace(/\D/g, '')
      .slice(0, 4)
      .replace(/(\d{2})(\d)/, '$1/$2');

    onSetPayDetails((current) => ({
      ...current,
      expirationDate: formattedValue,
    }));

    handleNextInputFocus(e, cvvRef.current);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setSelectedInput(e.currentTarget);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { minLength, value, name, dataset } = e.currentTarget;
    const key = dataset.type || name;

    if (value.length >= minLength) {
      if (key === 'expirationDate') {
        setErrors((current) => ({
          ...current,
          [key]: !expirationDateRegex.test(value),
        }));
      } else {
        setErrors((current) => ({
          ...current,
          [key]: false,
        }));
      }
    } else {
      if (key === 'expirationDate') {
        setErrors((current) => ({
          ...current,
          [key]: !value || expirationDateRegex.test(value),
        }));
      } else {
        setErrors((current) => ({
          ...current,
          [key]: true,
        }));
      }
    }

    setSelectedInput(null);
  };

  const { cardNumber, cardHolderName, expirationDate, cvv } = payDetails;
  const isCardValid = Object.values(cardNumber).some((c) => c.length < 4);
  const isCardNumbersSelected = cardNumbersRef.current.some(
    (ref) => ref === selectedInput
  );

  return (
    <div className="pay">
      <label
        className={classNames('pay__text', {
          'pay__text--selected': isCardNumbersSelected,
          'pay__text--error': isCardValid && (isSubmitted || errors.cardNumber),
        })}
        htmlFor="cardNumber-first"
      >
        {isCardValid && (isSubmitted || errors.cardNumber)
          ? 'Enter a card number'
          : 'CARDNUMBER'}
      </label>

      <div className="pay__card">
        <div className="pay__card__container">
          <input
            type="number"
            name="first"
            data-type="cardNumber"
            className={classNames('pay__card-input', {
              'pay__input--error':
                cardNumber.first.length < 4 &&
                (isSubmitted || errors.cardNumber),
              'pay__input--selected': selectedInput === getCardRef(0),
            })}
            placeholder="0000"
            value={cardNumber.first}
            minLength={4}
            ref={(el) => el && (cardNumbersRef.current[0] = el)}
            onChange={(e) => handleCardInputChange(e, getCardRef(1))}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />

          <input
            type="number"
            name="second"
            data-type="cardNumber"
            className={classNames('pay__card-input', {
              'pay__input--error':
                cardNumber.second.length < 4 &&
                (isSubmitted || errors.cardNumber),
              'pay__input--selected': selectedInput === getCardRef(1),
            })}
            placeholder="0000"
            value={cardNumber.second}
            minLength={4}
            ref={(el) => el && (cardNumbersRef.current[1] = el)}
            onChange={(e) => handleCardInputChange(e, getCardRef(2))}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />

          <input
            type="number"
            name="third"
            data-type="cardNumber"
            className={classNames('pay__card-input', {
              'pay__input--error':
                cardNumber.third.length < 4 &&
                (isSubmitted || errors.cardNumber),
              'pay__input--selected': selectedInput === getCardRef(2),
            })}
            placeholder="0000"
            value={cardNumber.third}
            minLength={4}
            ref={(el) => el && (cardNumbersRef.current[2] = el)}
            onChange={(e) => handleCardInputChange(e, getCardRef(3))}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />

          <input
            type="number"
            name="fourth"
            data-type="cardNumber"
            className={classNames('pay__card-input', {
              'pay__input--error':
                cardNumber.fourth.length < 4 &&
                (isSubmitted || errors.cardNumber),
              'pay__input--selected': selectedInput === getCardRef(3),
            })}
            placeholder="0000"
            value={cardNumber.fourth}
            minLength={4}
            ref={(el) => el && (cardNumbersRef.current[3] = el)}
            onChange={(e) => handleCardInputChange(e, cardholderNameRef.current)}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>

        {cardNumber.first && <PaymentSystem value={cardNumber.first} />}
      </div>

      <label
        className={classNames('pay__text', {
          'pay__text--selected':
            selectedInput === cardholderNameRef.current &&
            cardholderNameRef.current,
          'pay__text--error':
            !cardHolderName && (isSubmitted || errors.cardHolderName),
        })}
        htmlFor="cardholder-name"
      >
        {!cardHolderName && (isSubmitted || errors.cardHolderName)
          ? 'Enter a cardholder name'
          : 'CARDHOLDER NAME'}
      </label>

      <input
        type="text"
        id="cardholder-name"
        name="cardHolderName"
        className={classNames('pay__input', {
          'pay__input--selected':
            selectedInput === cardholderNameRef.current &&
            cardholderNameRef.current,
          'pay__input--error':
            !cardHolderName.length && (isSubmitted || errors.cardHolderName),
        })}
        value={cardHolderName}
        minLength={1}
        ref={cardholderNameRef}
        onChange={handleChangeCardHolder}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />

      <div className="pay__footer">
        <div className="pay__expiration">
          <label
            className={classNames('pay__text', {
              'pay__text--error':
                !expirationDateRegex.test(expirationDate) &&
                (isSubmitted || errors.expirationDate),
              'pay__text--selected':
                selectedInput === expirationDateRef.current &&
                expirationDateRef.current,
            })}
            htmlFor="expiration-date"
          >
            {!expirationDateRegex.test(expirationDate) &&
            (isSubmitted || errors.expirationDate)
              ? 'Invalid format'
              : 'Expiration Date'}
          </label>

          <input
            type="text"
            id="expiration-date"
            name="expirationDate"
            className={classNames('pay__expiration-input', {
              'pay__input--selected':
                selectedInput === expirationDateRef.current &&
                expirationDateRef.current,
              'pay__input--error':
                !expirationDateRegex.test(expirationDate) &&
                (isSubmitted || errors.expirationDate),
            })}
            minLength={5}
            placeholder="MM/YY"
            value={expirationDate}
            ref={expirationDateRef}
            onChange={handleExpirationChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>

        <div className="pay__cvv">
          <label
            className={classNames('pay__text', {
              'pay__text--selected':
                selectedInput === cvvRef.current && cvvRef.current,
              'pay__text--error': cvv.length < 3 && (isSubmitted || errors.cvv),
            })}
            htmlFor="cvv"
          >
            CVV
          </label>

          <input
            type="password"
            id="cvv"
            className={classNames('pay__cvv-input', {
              'pay__input--selected':
                selectedInput === cvvRef.current && cvvRef.current,
              'pay__input--error':
                cvv.length < 3 && (isSubmitted || errors.cvv),
            })}
            name="cvv"
            placeholder="000"
            minLength={3}
            value={cvv}
            ref={cvvRef}
            onChange={handleChangeCVV}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>
      </div>
    </div>
  );
};
