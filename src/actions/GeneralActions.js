//TYPES
import { FETCH , CANCEL_FETCH } from './types';

export const fetching = () => ({
  type: FETCH,
});

export const notFetching = () => ({
  type: CANCEL_FETCH,
});
