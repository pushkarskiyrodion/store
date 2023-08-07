import './Footer.scss';

import { useScreen } from 'app/hooks/useScreen';
import { Logo } from 'components/Logo';
import { Links } from 'components/Links';

export const Footer = () => {
  const screenWidth = useScreen();

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer">
      <Logo classNameOfLink="footer__logo" />

      {screenWidth > 730 && (
        <Links
          containerClassName="footer__links"
          linkClassName="footer__link"
        />
      )}

      <div className="footer__back-to-top">
        <label
          className="footer__back-to-top__label"
          htmlFor="back-to-top"
        >
          Back to top
        </label>

        <button
          onClick={handleScrollTop}
          type="button"
          className="footer__back-to-top__button"
          aria-label="none"
          id="back-to-top"
        />
      </div>
    </footer>
  );
};
