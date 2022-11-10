import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCallback, useState } from "react";
import { Alert, AlertDescription, Button, Flex } from "@chakra-ui/react";
import { CustomFormControl } from "../common/forms";
import supabase from "../supabase";
import { useProfileQuery } from "../features/databaseApi";
import { useMe } from "../hooks";
import { useNavigate } from "react-router-dom";

const resetPasswordEmailFormSchema = z.object({
  email: z.string().email(),
});
type ResetPasswordEmailFormValues = z.infer<
  typeof resetPasswordEmailFormSchema
>;
const resetPasswordFormSchema = z.object({
  newPassword: z.string().min(6),
  confirmPassword: z.string().min(6),
});
type ResetPasswordFormValues = z.infer<typeof resetPasswordFormSchema>;

export default function ResetPasswordForm() {
  const [profile] = useMe();
  const navigate = useNavigate()
  const resetPasswordEmailForm = useForm<ResetPasswordEmailFormValues>({
    resolver: zodResolver(resetPasswordEmailFormSchema),
  });
  const onSubmitResetPasswordEmailForm = useCallback<
    SubmitHandler<ResetPasswordEmailFormValues>
  >(async (data) => {
    await supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: `${location.origin}/reset-password`,
    });
  }, []);

  const resetPasswordForm = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordFormSchema),
  });
  const onSubmitResetPasswordForm = useCallback<
    SubmitHandler<ResetPasswordFormValues>
  >(async (data) => {
    await supabase.auth.updateUser({
      password: data.newPassword,
    });
    navigate("/", { replace: true });
  }, [navigate]);
  const canChangePassword = !!profile;

  return (
    <>
      {canChangePassword ? (
        <>
          {resetPasswordForm.formState.isSubmitSuccessful && (
            <Alert status="success">
              <AlertDescription>Password updated</AlertDescription>
            </Alert>
          )}
          <form
            onSubmit={resetPasswordForm.handleSubmit(onSubmitResetPasswordForm)}
          >
            <Flex direction="column" gap={4}>
              <CustomFormControl
                form={resetPasswordForm}
                field="newPassword"
                input={{ type: "password" }}
              />
              <CustomFormControl
                form={resetPasswordForm}
                field="confirmPassword"
                input={{ type: "password" }}
              />

              <Button
                isLoading={resetPasswordForm.formState.isSubmitting}
                type="submit"
              >
                Update Password
              </Button>
            </Flex>
          </form>
        </>
      ) : (
        <>
          {resetPasswordEmailForm.formState.isSubmitSuccessful && (
            <Alert status="success">
              <AlertDescription>
                Check your email for a link to reset your password. If it
                doesn’t appear within a few minutes, check your spam folder.
              </AlertDescription>
            </Alert>
          )}
          <form
            onSubmit={resetPasswordEmailForm.handleSubmit(
              onSubmitResetPasswordEmailForm
            )}
          >
            <Flex direction="column" gap={4}>
              <CustomFormControl form={resetPasswordEmailForm} field="email" />

              <Button
                isLoading={resetPasswordEmailForm.formState.isSubmitting}
                type="submit"
              >
                Reset Password
              </Button>
            </Flex>
          </form>
        </>
      )}
    </>
  );
}
