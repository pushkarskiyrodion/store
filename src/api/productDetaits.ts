import axios from 'axios';
import { wait } from 'helpers/wait';
import { IProductDetails } from 'types/ProductDetails';

const PRODUCT_URL = process.env.REACT_APP_PRODUCT_DETAILS || '';

export const getProductsDetails = (id: string, delay: number) => {
  return wait(delay)
    .then(() => axios.get(`${PRODUCT_URL}${id}.json`))
    .then(response => response.data)
    .catch(error => {
      if (error.response) {
        throw new Error();
      }
    });
};

export const getSameModels = async (
  id: string,
  productsColor: string[],
  productsCapacity: string[],
) => {
  const splitted = id.split('-');
  const sliced = splitted.slice(0, splitted.length - 2);
  const urls: string[] = [];

  productsColor.forEach(color => {
    const capacities = productsCapacity.map(capacity => (
      sliced.concat(capacity.toLowerCase(), color).join('-')
    ));

    urls.push(...capacities);
  });

  const toFetch = urls.map(url => getProductsDetails(url, 0));
  const modelsArray = await Promise.allSettled(toFetch);

  return modelsArray
    .filter(result => result.status === 'fulfilled')
    .map(result => (result as PromiseFulfilledResult<IProductDetails>).value);
};
