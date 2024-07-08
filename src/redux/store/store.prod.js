import { configureStore } from '@reduxjs/toolkit';

import appReducer from '../slices/appSlice';
import apisReducer from '../slices/apisSlice';
import sampleQuery from '../query/sampleQuery';
import navigationReducer from '../slices/navigationSlice';

export default configureStore({
  reducer: {
    app: appReducer,
    apis: apisReducer,
    navigation: navigationReducer,
    sampleQuery: sampleQuery.reducer,
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
    }).concat(sampleQuery.middleware),
});
