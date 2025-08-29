import browserHistory from '../../browser-history';
import { Middleware, PayloadAction } from '@reduxjs/toolkit';
import { reducer } from '../reducer';

type Reducer = ReturnType<typeof reducer>;

const redirect: Middleware<unknown, Reducer> = () => (next) => (action: PayloadAction<string>) => {
  if(action.type === 'redirectToRoute') {
    browserHistory.push(action.payload);
  }

  return next(action);
};

export { redirect };
