import { useFormContext, FieldValues, Path } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { TextareaHTMLAttributes } from "react";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

type FormTextareaProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
} & TextareaProps;

export const FormTextarea = <T extends FieldValues>({
  name,
  label,
  className,
  ...rest
}: FormTextareaProps<T>) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();

  const error = errors[name];

  return (
    <div className="flex flex-col gap-1">
      {label && <Label htmlFor={name}>{label}</Label>}
      <Textarea
        id={name}
        {...register(name)}
        className={cn("border", error && "border-red-500", className)}
        {...rest}
      />
      {error && (
        <span className="text-red-500 text-sm">{String(error.message)}</span>
      )}
    </div>
  );
};
