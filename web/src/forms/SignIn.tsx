import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCallback } from "react";
import {
  Alert,
  AlertDescription,
  Button,
  Flex,
} from "@chakra-ui/react";
import { useAppDispatch } from "../hooks";
import { signIn } from "../features/auth/authSlice";
import { CustomFormControl } from "../common/forms";
import { Link, useNavigate } from "react-router-dom";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  ApiAuthError: z.void(),
});
type FieldValues = z.infer<typeof formSchema>;

export default function SignInForm() {
  const form = useForm<FieldValues>({
    resolver: zodResolver(formSchema),
  });
  const {
    setError,
    formState: { errors },
  } = form;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onSubmit = useCallback<SubmitHandler<FieldValues>>(
    async (data) => {
      const res = await dispatch(signIn(data));
      if (signIn.rejected.match(res)) {
        if (res.error.name === "AuthApiError") {
          setError("ApiAuthError", {
            message: res.error.message,
          });
        }
      } else {
        navigate("/", { replace: true });
      }
    },
    [dispatch, setError, navigate]
  );

  return (
    <>
      {errors.ApiAuthError && (
        <Alert status="error">
          <AlertDescription>{errors.ApiAuthError.message}</AlertDescription>
        </Alert>
      )}
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Flex direction="column" gap={4}>
          <CustomFormControl form={form} field="email" />
          <CustomFormControl
            form={form}
            field="password"
            input={{ type: "password" }}
          />

          <Button isLoading={form.formState.isSubmitting} type="submit">
            Sign In
          </Button>
        </Flex>
      </form>
    </>
  );
}
