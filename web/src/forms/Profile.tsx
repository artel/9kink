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
import { useMe } from "../hooks";
import { CustomFormControl } from "../common/forms";
import { isUniqueConstraintError } from "../utils";
import supabase from "../supabase";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
];
const formSchema = z.object({
  username: z.string().min(3),
  bio: z.string().optional(),
  avatar: z
    .instanceof(FileList)
    .refine(
      (files) =>
        !files.length || ACCEPTED_IMAGE_TYPES.includes(files?.[0].type),
      "Invalid file type"
    ),
});
type FieldValues = z.infer<typeof formSchema>;

export default function ProfileForm() {
  const [profile, refetch] = useMe();
  const form = useForm<FieldValues>({
    resolver: zodResolver(formSchema),
    defaultValues: profile
      ? {
          username: profile.username,
          bio: profile.bio ?? undefined,
        }
      : undefined,
  });
  const onSubmit = useCallback<SubmitHandler<FieldValues>>(
    async (data) => {
      if (!profile) {
        return;
      }
      const prefix = Math.random().toString(36);
      try {
        if (data.avatar.length) {
          await supabase.storage
            .from("userdata")
            .upload(
              `${profile.user_id}/avatar/${prefix}-${data.avatar[0].name}`,
              data.avatar[0],
              {
                upsert: true,
              }
            );
        }
        await supabase
          .from("profile")
          .update({
            username: data.username,
            avatarFile: prefix + "-" + data.avatar?.[0]?.name,
            bio: data.bio,
          })
          .eq("user_id", profile.user_id)
          .throwOnError();
        await refetch();
      } catch (err) {
        console.error(err);
        if (isUniqueConstraintError(err)) {
          form.setError("username", {
            ...err,
            message: "Username already exists",
          });
        }
      }
    },
    [form, profile, refetch]
  );
  return (
    <>
      {form.formState.isSubmitSuccessful && (
        <Alert status="success">
          <AlertDescription>Profile updated</AlertDescription>
        </Alert>
      )}
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Flex direction="column" gap={4}>
          <CustomFormControl form={form} field="username" />
          <CustomFormControl form={form} field="bio" textarea={{}} />
          <CustomFormControl
            form={form}
            field="avatar"
            input={{ type: "file", padding: 0, border: "none" }}
          />

          <Button isLoading={form.formState.isSubmitting} type="submit">
            Save Profile
          </Button>
        </Flex>
      </form>
    </>
  );
}
