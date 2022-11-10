import { createSlice } from "@reduxjs/toolkit";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AppState {
  initialized: boolean;
}

const initialState: AppState = {
  initialized: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    initialized(state) {
      state.initialized = true;
    },
  },
});

// eslint-disable-next-line no-empty-pattern
export const { initialized } = appSlice.actions;

export default appSlice.reducer;
