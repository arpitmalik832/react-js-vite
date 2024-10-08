/**
 * This file is used to create the redux store for development environment.
 * @file This file is saved as `redux/store/store.dev.js`.
 */
import { thunk } from 'redux-thunk';
import { logger } from 'redux-logger';
import {
  slices,
  queries,
  configureStore,
} from '@arpitmalik832/react-js-rollup-monorepo-library';

export default configureStore({
  reducer: {
    app: slices.appSlice.reducer,
    apis: slices.apisSlice.reducer,
    navigation: slices.navigationSlice.reducer,
    sampleQuery: queries.sampleQuery.reducer,
  },
  middleware: getDefault =>
    getDefault({
      serializableCheck: {
        ignoredActions: [
          'apis/updateApi1AxiosInstance',
          'navigation/pushStack',
        ],
        ignoredPaths: ['apis', 'sampleQuery', 'navigation'],
      },
    }).concat(queries.sampleQuery.middleware, thunk, logger),
});
