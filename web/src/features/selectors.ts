import { createSelector } from "@reduxjs/toolkit";
import authSlice, { AuthState } from "./auth/authSlice";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const selectAuthState = (state: any) => state.auth as AuthState;

export const selectUserId = createSelector(
  selectAuthState,
  (auth) => auth.user?.userId as string | undefined
);
