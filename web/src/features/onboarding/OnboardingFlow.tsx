import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { CustomFormControl } from "../../common/forms";
import { useAppSelector, useMe } from "../../hooks";
import supabase from "../../supabase";
import { isUniqueConstraintError } from "../../utils";
import { useProfileQuery } from "../databaseApi";

const formSchema = z.object({
  username: z.string().min(3),
});
type FieldValues = z.infer<typeof formSchema>;

export default function OnboardingFlow() {
  const form = useForm<FieldValues>({
    resolver: zodResolver(formSchema),
  });

  const initialized = useAppSelector((state) => state.app.initialized);
  const user = useAppSelector((state) => state.auth.user);
  const { data: profile, refetch, isSuccess } = useProfileQuery(
    initialized && user ? { userId: user.userId } : skipToken
  );

  const onSubmit = useCallback<SubmitHandler<FieldValues>>(
    async (data) => {
      if (!user) {
        return;
      }
      try {
        await supabase.from("profile").insert({
          user_id: user.userId,
          username: data.username,
        });

        await refetch();
      } catch (err) {
        if (isUniqueConstraintError(err)) {
          form.setError("username", {
            ...err,
            message: "Username already exists",
          });
        }
      }
    },
    [form, refetch, user]
  );

  if (initialized && user && isSuccess && !profile) {
    return (
      <>
        <Modal
          isOpen={true}
          closeOnOverlayClick={false}
          closeOnEsc={false}
          onClose={() => {
            //
          }}
        >
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Welcome!</ModalHeader>
              <ModalBody>
                <Flex direction="column" gap={4}>
                  <div>Create your profile</div>
                  <CustomFormControl form={form} field="username" />
                </Flex>
              </ModalBody>

              <ModalFooter>
                <Button
                  isLoading={form.formState.isSubmitting}
                  type="submit"
                  variant="solid"
                >
                  Create Profile
                </Button>
              </ModalFooter>
            </ModalContent>
          </form>
        </Modal>
      </>
    );
  }

  return <></>;
}
