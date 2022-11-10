import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from './store'
import { useProfileQuery } from "./features/databaseApi";
import { skipToken } from "@reduxjs/toolkit/dist/query";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useMe = () => {
  const user = useAppSelector((state) => state.auth.user);
  const initialized = useAppSelector((state) => state.app.initialized);
  const { data: profile, refetch } = useProfileQuery(
    initialized && user ? { userId: user.userId } : skipToken
  );

  return [profile, refetch] as const;
};