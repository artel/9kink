import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  InputProps,
  Textarea,
  TextareaProps,
} from "@chakra-ui/react";
import { HTMLInputTypeAttribute } from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { deCamelCase } from "../utils";

type Props<TFieldValues extends FieldValues = FieldValues> = {
  form: UseFormReturn<TFieldValues>;
  field: Path<TFieldValues>;
  label?: string;
  placeholder?: string;
  input?: Partial<InputProps>;
  textarea?: Partial<TextareaProps>;
};

export function CustomFormControl<
  TFieldValues extends FieldValues = FieldValues
>({ form, field, label, placeholder, input, textarea }: Props<TFieldValues>) {
  const {
    register,
    formState: { errors },
  } = form;
  return (
    <FormControl isInvalid={!!errors[field]}>
      <FormLabel htmlFor={field}>{label ?? deCamelCase(field)}</FormLabel>
      {textarea ? (
        <Textarea
          id={field}
          placeholder={placeholder ?? label ?? deCamelCase(field)}
          {...register(field)}
          {...textarea}
        />
      ) : (
        <Input
          id={field}
          placeholder={placeholder ?? label ?? deCamelCase(field)}
          {...register(field)}
          {...input}
        />
      )}
      <FormErrorMessage>
        {errors[field] && errors[field]?.message?.toString()}
      </FormErrorMessage>
    </FormControl>
  );
}
