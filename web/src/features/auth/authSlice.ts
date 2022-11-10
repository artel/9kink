import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import supabase from "../../supabase";

export interface AuthState {
  user: {
    userId: string;
  } | null;
}

const initialState: AuthState = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<AuthState["user"]>) {
      state.user = action.payload;
    },
  },
});

export const initUser = createAsyncThunk(
  "auth/initUser",
  async (_, { dispatch }) => {
    const sessionResult = await supabase.auth.getSession();
    const userResult = await supabase.auth.getUser();

    const {
      data: { session },
      error: sessionError,
    } = sessionResult;
    const {
      data: { user },
      error: userError,
    } = userResult;
    dispatch(
      authSlice.actions.setUser(
        session && user
          ? {
              userId: user.id,
            }
          : null
      )
    );
  }
);

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (
    { email, password }: { email: string; password: string },
    { dispatch }
  ) => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) {
      console.error(error);
      throw error;
    } else {
      dispatch(initUser());
    }
  }
);

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (
    { email, password }: { email: string; password: string },
    { dispatch }
  ) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      console.error(error);
      throw error;
    } else {
      dispatch(initUser());
    }
  }
);

export const signOut = createAsyncThunk(
  "auth/signOut",
  async (_, { dispatch }) => {
    const { error } = await supabase.auth.signOut();
    dispatch(initUser());
    if (error) {
      console.error(error);
      throw error;
    }
  }
);

// eslint-disable-next-line no-empty-pattern
export const {} = authSlice.actions;

export default authSlice.reducer;
