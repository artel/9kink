import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCallback } from "react";
import { Button, Flex, VStack } from "@chakra-ui/react";
import { useAppDispatch } from "../hooks";
import { signUp } from "../features/auth/authSlice";
import { CustomFormControl } from "../common/forms";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
type FieldValues = z.infer<typeof formSchema>;

export default function SignUpForm() {
  const form = useForm<FieldValues>({
    resolver: zodResolver(formSchema),
  });
  const dispatch = useAppDispatch();
  const onSubmit = useCallback<SubmitHandler<FieldValues>>(
    async (data) => {
      await dispatch(signUp(data));
    },
    [dispatch]
  );
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Flex direction="column" gap={4}>
        <CustomFormControl form={form} field="email" />
        <CustomFormControl
          form={form}
          field="password"
          input={{ type: "password" }}
        />

        <Button isLoading={form.formState.isSubmitting} type="submit">
          Sign Up
        </Button>
      </Flex>
    </form>
  );
}
