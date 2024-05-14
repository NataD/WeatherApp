import rootReducer, {RootState} from './reducers';
import type {ThunkAction} from 'redux-thunk';
import {createEpicMiddleware} from 'redux-observable';
import {rootEpic} from './epics';
import {persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Action, configureStore} from '@reduxjs/toolkit';

const epicMiddleware = createEpicMiddleware();

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['saga'],
};

const pReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: pReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(epicMiddleware),
});

epicMiddleware.run(rootEpic);

const hotModule = module as typeof module & {hot: any};
if (process.env.NODE_ENV === 'development' && hotModule.hot) {
    hotModule.hot.accept('./reducers', () => {
        const newRootReducer = require('./reducers').default;
        store.replaceReducer(newRootReducer);
    });
}

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
export default store;
