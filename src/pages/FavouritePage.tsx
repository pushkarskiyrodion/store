import { useAppSelector } from 'app/hooks/redux';
import { CatalogProduct } from 'components/CatalogProduct';
import { Container } from 'components/Container/Container';
import { NoFavourites } from 'components/ErrorPages/NoFavourites';
import { UserLocation } from 'components/UserLocation';

export const FavouritePage = () => {
  const favourites = useAppSelector(state => state.favourite);

  const items = favourites.length === 1 ? 'item' : 'items';

  if (!favourites.length) {
    return <NoFavourites />;
  }

  return (
    <Container>
      <section className="page__products">
        <UserLocation />

        <h3 className="page__title-main">
          Favourites
        </h3>

        <p className="page__products__quantities">
          {`${favourites.length} ${items}`}
        </p>

        <div className="page__cart__list">
          {favourites.map(favourite => (
            <CatalogProduct catalogProduct={favourite} key={favourite.id} />
          ))}
        </div>
      </section>
    </Container>
  );
};
