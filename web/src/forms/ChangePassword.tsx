import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCallback } from "react";
import { Alert, AlertDescription, Button, Flex } from "@chakra-ui/react";
import { CustomFormControl } from "../common/forms";
import supabase from "../supabase";

const formSchema = z
  .object({
    currentPassword: z.string(),
    newPassword: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
type FieldValues = z.infer<typeof formSchema>;

export default function ChangePasswordForm() {
  const form = useForm<FieldValues>({
    resolver: zodResolver(formSchema),
  });
  const { setError } = form;
  const onSubmit = useCallback<SubmitHandler<FieldValues>>(
    async (data) => {
      const { data: correct } = await supabase
        .rpc("verify_password", {
          password: data.currentPassword,
        })
        .single();
      if (!correct) {
        setError("currentPassword", {
          message: "Incorrect password",
        });
      } else {
        await supabase.auth.updateUser({
          password: data.newPassword,
        });
      }
    },
    [setError]
  );
  return (
    <>
      {form.formState.isSubmitSuccessful && (
        <Alert status="success">
          <AlertDescription>Password updated</AlertDescription>
        </Alert>
      )}
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Flex direction="column" gap={4}>
          <CustomFormControl
            form={form}
            field="currentPassword"
            input={{ type: "password" }}
          />
          <CustomFormControl
            form={form}
            field="newPassword"
            input={{ type: "password" }}
          />
          <CustomFormControl
            form={form}
            field="confirmPassword"
            input={{ type: "password" }}
          />

          <Button isLoading={form.formState.isSubmitting} type="submit">
            Update Password
          </Button>
        </Flex>
      </form>
    </>
  );
}
