import { Link } from 'react-router-dom';
import './Logo.scss';

type Props = {
  classNameOfLink?: string,
};

export const Logo: React.FC<Props> = ({ classNameOfLink = '' }) => (
  <Link to="/" className={`logo ${classNameOfLink}`}>
    <img src="./LOGO.svg" className="logo__image" alt="LOGO" />
  </Link>
);
