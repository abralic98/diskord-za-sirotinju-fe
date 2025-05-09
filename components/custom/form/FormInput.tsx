import { useFormContext, FieldValues, Path } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { ReactNode } from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  secure?: boolean;
};

type FormInputProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  icon?: ReactNode;
} & InputProps;

export const FormInput = <T extends FieldValues>({
  name,
  label,
  className,
  secure = false,
  icon,
  ...rest
}: FormInputProps<T>) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();

  const error = errors[name];

  return (
    <div className="flex flex-col gap-1">
      {label && <Label>{label}</Label>}
      <Input
        secure={secure}
        icon={icon}
        {...register(name, {
          valueAsNumber: rest.type === "number" ? true : false,
        })}
        className={cn("border", error && "border-red-500", className)}
        {...rest}
      />
      {error && (
        <span className="text-red-500 text-sm">{String(error.message)}</span>
      )}
    </div>
  );
};
