import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import storage from "redux-persist/lib/storage";
import appSlice from "./features/appSlice";
import authSlice from "./features/auth/authSlice";
import { databaseApi } from "./features/databaseApi";

const rootReducer = combineReducers({
  app: appSlice,
  auth: authSlice,
  [databaseApi.reducerPath]: databaseApi.reducer,
});

const persistedReducer = persistReducer(
  {
    key: "root",
    version: 1,
    storage,
    whitelist: [],
  },
  rootReducer
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(databaseApi.middleware),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
