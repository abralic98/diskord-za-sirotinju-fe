import { useFormContext, FieldValues, Path, PathValue } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export type SelectItemOption = {
  label: ReactNode;
  value: string;
};

type FormRadioGroupProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  options: SelectItemOption[];
  className?: string;
  classNameOptions?: string;
};

export const FormRadioGroup = <T extends FieldValues>({
  name,
  label,
  options,
  className,
  classNameOptions,
}: FormRadioGroupProps<T>) => {
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext<T>();

  const error = errors[name];

  return (
    <div className="flex flex-col gap-3">
      <Label className="text-md">{label}</Label>
      <RadioGroup
        value={getValues(name) as string}
        onValueChange={(value) =>
          setValue(name, value as PathValue<T, Path<T>>, {
            shouldValidate: true,
          })
        }
        className={cn(
          error && "border border-red-500 rounded-md p-2",
          className,
        )}
      >
        {options.map((option) => (
          <div
            key={option.value}
            className={cn(
              "flex items-center rounded-md pr-4 pl-4",
              classNameOptions,
            )}
          >
            <RadioGroupItem id={option.value} value={option.value} />
            <Label className="w-full" htmlFor={option.value}>
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
      {error && (
        <span className="text-red-500 text-sm">{String(error.message)}</span>
      )}
    </div>
  );
};
