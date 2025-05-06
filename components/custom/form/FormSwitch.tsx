
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Controller, useFormContext, FieldPath, FieldValues } from "react-hook-form";

type FormSwitchProps<TFieldValues extends FieldValues> = {
  name: FieldPath<TFieldValues>;
  label?: string;
};

export function FormSwitch<TFieldValues extends FieldValues>({
  name,
  label,
}: FormSwitchProps<TFieldValues>) {
  const { control } = useFormContext<TFieldValues>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="flex items-center space-x-2">
          <Switch
            id={name}
            checked={!!field.value}
            onCheckedChange={field.onChange}
          />
          {label && <Label htmlFor={name}>{label}</Label>}
        </div>
      )}
    />
  );
}
