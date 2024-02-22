import { PayDetails } from 'components/Checkout';

export const expirationDateRegex = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/;

export const payValidation = (payDetails: PayDetails) => {
  const { cardNumber, cardHolderName, expirationDate, cvv } = payDetails;

  const isCardValid = Object.values(cardNumber).some((c) => c.length !== 4);

  if (
    !isCardValid &&
    cardHolderName &&
    cvv.length === 3 &&
    expirationDateRegex.test(expirationDate)
  ) {
    return true;
  }

  return false;
};
