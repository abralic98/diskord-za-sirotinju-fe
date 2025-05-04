import * as React from "react";
import { cn } from "@/lib/utils";
import { EyeIcon, EyeOffIcon } from "lucide-react"; // `EyeOffIcon` instead of `EyeClosedIcon` from lucide-react

type InputProps = {
  secure?: boolean;
};

function Input({
  className,
  secure,
  type,
  ...props
}: React.ComponentProps<"input"> & InputProps) {
  const [secured, setSecured] = React.useState(secure ?? false);

  return (
    <div className="relative w-full">
      <input
        type={secured ? "password" : type || "text"}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 pr-10 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className,
        )}
        {...props}
      />

      {secure && (
        <div
          onClick={() => setSecured(!secured)}
          className="absolute right-5 top-1/2 transform -translate-y-1/2 cursor-pointer text-muted-foreground"
        >
          {secured ? (
            <EyeIcon className="w-4 h-4" />
          ) : (
            <EyeOffIcon className="w-4 h-4" />
          )}
        </div>
      )}
    </div>
  );
}

export { Input };
