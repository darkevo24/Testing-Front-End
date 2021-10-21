import { configureStore } from '@reduxjs/toolkit';
import { routerMiddleware } from 'connected-react-router';

import createReducer from './reducers';

export function configureAppStore(initialState = {}, history) {
  // Create the store with saga middleware
  const middlewares = [routerMiddleware(history)];

  const store = configureStore({
    reducer: createReducer(),
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(middlewares),
    devTools:
      /* istanbul ignore next line */
      process.env.NODE_ENV !== 'production' || process.env.PUBLIC_URL.length > 0,
  });

  // Extensions
  store.injectedReducers = {}; // Reducer registry

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(createReducer(store.injectedReducers));
    });
  }

  return store;
}
