import { configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
} from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import { AppSate, rootReducer } from './reducers';
import createWebStorage from 'redux-persist/es/storage/createWebStorage';
import { rootSaga } from './sagas';

// ----------------------------------------------------------------------

const createNoopStorage = () => ({
  getItem(_key: string) {
    return Promise.resolve(null);
  },
  setItem(_key: string, value: any) {
    return Promise.resolve(value);
  },
  removeItem(_key: string) {
    return Promise.resolve();
  },
});

const storage =
  typeof window !== 'undefined'
    ? createWebStorage('local')
    : createNoopStorage();

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

export type AppDispatch = typeof store.dispatch;

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: persistReducer(rootPersistConfig, rootReducer),
  middleware: [sagaMiddleware],
});

const persistor = persistStore(store);

const { dispatch } = store;

const useSelector: TypedUseSelectorHook<AppSate> = useAppSelector;

const useDispatch = () => useAppDispatch<AppDispatch>();

sagaMiddleware.run(rootSaga);

export { store, persistor, dispatch, useSelector, useDispatch };
