import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { initUser } from "./features/auth/authSlice";
import { initialized } from "./features/appSlice";
import { databaseApi } from "./features/databaseApi";
import { selectUserId } from "./features/selectors";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/signin";
import SignInPage from "./routes/signin";
import SettingsPage from "./routes/settings";
import SignUpPage from "./routes/signup";
import SignOutPage from "./routes/signout";
import ResetPasswordPage from "./routes/resetpassword";
import ProfilePage from "./routes/profile";

export const init = createAsyncThunk(
  "app/init",
  async (_, { dispatch, getState }) => {
    await dispatch(initUser());
    const state = getState();
    const userId = selectUserId(state);
    if (userId) {
      await dispatch(databaseApi.endpoints.profile.initiate({ userId }));
    }
    dispatch(initialized());
  }
);

store.dispatch(init());

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/register",
        element: <SignUpPage />,
      },
      {
        path: "/login",
        element: <SignInPage />,
      },
      {
        path: "/logout",
        element: <SignOutPage />,
      },
      {
        path: "/reset-password",
        element: <ResetPasswordPage />,
      },
      {
        path: "/settings",
        element: <SettingsPage />,
      },
      {
        path: "/u/:username",
        element: <ProfilePage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <ChakraProvider theme={theme}>
          <RouterProvider router={router} />
        </ChakraProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
