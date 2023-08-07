import { ErrorTemplate } from 'components/ErrorPages/ErrorTemplate';
import { Link } from 'react-router-dom';

export const PageNotFound = () => (
  <div className="page__not-found">
    <Link to="/" className="page__go-home">
      Go Home
    </Link>

    <ErrorTemplate
      src="./img/page-not-found.jpg"
      alt="page not found"
      title="Page not found"
    />
  </div>
);
