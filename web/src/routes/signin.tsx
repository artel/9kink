import { Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import SignInForm from "../forms/SignIn";

export default function SignInPage() {
  return (
    <>
      <Text fontSize="4xl">Sign In</Text>
      <SignInForm />
      <Link to="/reset-password">Forgot password?</Link>
    </>
  );
}
