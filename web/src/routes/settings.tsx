import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Box,
  Text,
  Divider,
  Stack,
} from "@chakra-ui/react";
import ChangePasswordForm from "../forms/ChangePassword";
import ProfileForm from "../forms/Profile";

export default function SettingsPage() {
  return (
    <Stack spacing={4}>
      <Box maxW="xl">
        <Text fontSize="2xl">Profile</Text>
        <Divider />
        <Box maxW="xs" my={4}>
          <ProfileForm />
        </Box>
      </Box>

      <Box maxW="xl">
        <Text fontSize="2xl">Account</Text>
        <Divider />
        <Box maxW="xs" my={4}>
          <ChangePasswordForm />
        </Box>
      </Box>
    </Stack>
  );
}
