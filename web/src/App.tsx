import {
  Box,
  Button,
  Flex,
  Spacer,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { SkipNavLink, SkipNavContent } from '@chakra-ui/skip-nav'
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useProfileQuery } from "./features/databaseApi";
import OnboardingFlow from "./features/onboarding/OnboardingFlow";
import { useAppSelector } from "./hooks";

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useAppSelector((state) => state.auth.user);
  const initialized = useAppSelector((state) => state.app.initialized);
  const { data: profile } = useProfileQuery(
    user ? { userId: user.userId } : skipToken
  );

  if (!initialized) {
    return <></>;
  }

  return (
    <>
      <SkipNavLink>Skip to content</SkipNavLink>
      <OnboardingFlow />
      <Box m={2}>
        {profile && (
          <Text>
            Logged in as{" "}
            <Link to={`/u/${profile?.username}`}>{profile?.username}</Link>
          </Text>
        )}
        <Flex gap={2}>
          <NavLink to="/">Home</NavLink>
          {!user && (
            <>
              <NavLink to="/register">Sign Up</NavLink>
              <NavLink to="/login">Sign In</NavLink>
            </>
          )}
          {user && <NavLink to="/settings">Settings</NavLink>}
          <Spacer />
          <Link to="/logout">Logout</Link>
        </Flex>

        <Button onClick={toggleColorMode}>{colorMode}</Button>
      </Box>
      <Box m={4}>
        <SkipNavContent />
        <Outlet />
      </Box>
    </>
  );
}

export default App;
