import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from '../common';
import type { Product } from './types';

type Variables = { id: number };
type Response = Product;

export const useProduct = createQuery<Response, Variables, AxiosError>(
  'products',
  ({ queryKey: [primaryKey, variables] }) => {
    return client
      .get(`${primaryKey}/${variables.id}`)
      .then((response) => response.data);
  }
);
