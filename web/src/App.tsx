import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Spacer,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useProfileQuery } from "./features/databaseApi";
import OnboardingFlow from "./features/onboarding/OnboardingFlow";
import { useAppSelector } from "./hooks";
import supabase from "./supabase";

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
      <OnboardingFlow />
      {profile?.avatarFile && (
        <>
          <Image
            boxSize="100px"
            objectFit="cover"
            src={
              supabase.storage
                .from("userdata")
                .getPublicUrl(`${profile.user_id}/avatar/${profile.avatarFile}`)
                .data.publicUrl
            }
          />
        </>
      )}
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
        <Outlet />
      </Box>
    </>
  );
}

export default App;
