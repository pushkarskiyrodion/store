type Props = {
  value: string,
}

export const PaymentSystem: React.FC<Props> = ({ value }) => {
  const systemSrc = value.startsWith("4")
    ? "./img/payment-systems/visa.png"
    : "./img/payment-systems/mastercard.png";

  return (
    <div className="checkout__payment-system">
      <img alt="payment-system" src={systemSrc} />
    </div>
  );
};