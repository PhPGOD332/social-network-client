import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import { userReducer } from "@/store/reducers/user.slice";
import storage from 'redux-persist/lib/storage';
import {
    persistReducer
} from 'redux-persist';
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from "redux-persist/es/constants";
import autoMergeLevel1 from "redux-persist/es/stateReconciler/autoMergeLevel1";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import hardSet from "redux-persist/es/stateReconciler/hardSet";

const persistConfig = {
    key: 'user',
    storage,
    stateReconciler: hardSet,
}

const rootReducer = combineReducers({
    user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const setupStore = () => {
    return configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
                }
            })
    })
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;

export type AppDispatch = AppStore['dispatch'];