import { useFormContext, FieldValues, Path } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { ReactNode } from "react";

type FormChatInputProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  icon?: ReactNode;
  placeholder?: string
  inputClassName?: string
  containerClassName?: string
};

export const FormChatInput = <T extends FieldValues>({
  name,
  label,
  icon,
  placeholder,
  inputClassName,
  containerClassName,
  ...rest

}: FormChatInputProps<T>) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();

  const error = errors[name];

  return (
    <div className={cn("flex flex-col gap-1", containerClassName)}>
      {label && <Label>{label}</Label>}
      <Input
        icon={icon}
        placeholder={placeholder}
        {...register(name)}
        className={cn("border", error && "border-red-500", inputClassName)}
        {...rest}
      />
      {error && (
        <span className="text-red-500 text-sm">{String(error.message)}</span>
      )}
    </div>
  );
};
