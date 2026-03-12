import type { InputHTMLAttributes } from "react";
import { forwardRef } from "react";
import type { LucideIcon } from "lucide-react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: LucideIcon;
  error?: string;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, icon: Icon, error, className = "", ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <div className="relative">
          {Icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon className="h-5 w-5 text-gray-400" />
            </div>
          )}
          <input
            ref={ref}
            className={`
              w-full rounded-lg border border-gray-200 bg-white/50
              px-4 py-2.5 text-gray-900 placeholder:text-gray-400
              focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500
              transition duration-200
              ${Icon ? "pl-10" : ""}
              ${error ? "border-red-300 focus:ring-red-500/50 focus:border-red-500" : ""}
              ${className}
            `}
            {...props}
          />
        </div>
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;