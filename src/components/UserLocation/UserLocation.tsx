import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from 'react-router-dom';

import './UserLocation.scss';

type Props = {
  productName?: string,
};

export const UserLocation: React.FC<Props> = ({ productName }) => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { productId = '' } = useParams();
  const pathname = location.pathname.replace('/', '');
  const endIndex = pathname.indexOf('/') === -1
    ? pathname.length
    : pathname.indexOf('/');
  const directory = pathname[0].toUpperCase() + pathname.slice(1, endIndex);
  const arrow = <span className="user-location__gap">{'>'}</span>;

  return (
    <div className="user-location">
      <Link to="/">
        <img src="./icons/home.svg" alt="" />
      </Link>

      {directory && (
        <>
          {arrow}

          <Link
            className="user-location__link-page"
            to={{
              pathname: `/${directory.toLowerCase()}`,
              search: searchParams.toString(),
            }}
          >
            {directory}
          </Link>
        </>
      )}

      {productName && (
        <>
          {arrow}

          <Link
            className="user-location__link-product"
            to={{
              pathname: `../${productId}`,
              search: searchParams.toString(),
            }}
          >
            {productName}
          </Link>
        </>
      )}
    </div>
  );
};
