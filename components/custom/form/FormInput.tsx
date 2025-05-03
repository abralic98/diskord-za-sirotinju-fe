import { useFormContext, FieldValues, Path } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils"; // Optional for className merging
import { Label } from "@/components/ui/label";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

type FormInputProps<T extends FieldValues> = {
  name: Path<T>;
  label: String;
} & InputProps;

export const FormInput = <T extends FieldValues>({
  name,
  label,
  className,
  ...rest
}: FormInputProps<T>) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();

  const error = errors[name];

  return (
    <div className="flex flex-col gap-1">
      <Label>{label}</Label>
      <Input
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
