import axios from 'axios';
import { wait } from 'helpers/wait';

const PRODUCTS_URL = process.env.REACT_APP_PRODUCTS_URL || '';

export const getProducts = () => {
  return wait(300)
    .then(() => axios.get(PRODUCTS_URL))
    .then(response => response.data)
    .catch(error => {
      if (error.response) {
        throw new Error();
      }
    });
};
