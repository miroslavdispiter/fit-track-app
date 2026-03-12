import type { ReactNode } from "react";

interface SocialLoginButtonProps {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
}

export default function SocialLoginButton({
  icon,
  label,
  onClick,
}: SocialLoginButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        w-full flex items-center justify-center gap-3
        rounded-lg border border-gray-200 bg-white
        px-4 py-2.5 text-sm font-medium text-gray-700
        hover:bg-gray-50 hover:border-gray-300
        focus:outline-none focus:ring-2 focus:ring-emerald-500/50
        transition duration-200
      "
    >
      {icon}
      {label}
    </button>
  );
}