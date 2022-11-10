import { Box, Text } from "@chakra-ui/react";
import SignUpForm from "../forms/SignUp";

export default function SignUpPage() {
  return (
    <Box maxW="xs">
      <Text fontSize="4xl">Sign Up</Text>
      <SignUpForm />
    </Box>
  );
}
