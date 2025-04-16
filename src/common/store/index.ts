import createSagaMiddleware from 'redux-saga';
import { reducers } from './combineReducers';
import { sagas } from './combineSagas';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { configureStore } from '@reduxjs/toolkit';

const persistConfig = {
  key: 'root',
  whitelist: ["home"],
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2
};

const persistedReducer = persistReducer(persistConfig, reducers);
const initState: any = {};

const sagaMiddleware = createSagaMiddleware();
export const store: any = configureStore(
  {
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(sagaMiddleware),
    preloadedState: initState
  }
)

export const persistor: any = persistStore(store);
sagaMiddleware.run(sagas);

store.subscribe(() => {
  console.log("Store Changed ", store.getState());
});
