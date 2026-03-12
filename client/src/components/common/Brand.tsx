import { Link } from "react-router-dom";
import { Dumbbell } from "lucide-react";

interface BrandProps {
  linkTo?: string;
  size?: "sm" | "md" | "lg";
}

export default function Brand({ linkTo = "/", size = "md" }: BrandProps) {
  const sizes = {
    sm: { icon: "h-5 w-5", text: "text-lg" },
    md: { icon: "h-6 w-6", text: "text-xl" },
    lg: { icon: "h-8 w-8", text: "text-2xl" },
  };

  const content = (
    <div className="flex items-center gap-2">
      <div className="p-1.5 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-700 text-white">
        <Dumbbell className={sizes[size].icon} />
      </div>
      <span
        className={`${sizes[size].text} font-bold bg-gradient-to-r from-emerald-700 to-emerald-500 bg-clip-text text-transparent`}
      >
        FitTrack
      </span>
    </div>
  );

  if (linkTo) {
    return (
      <Link to={linkTo} className="hover:opacity-80 transition">
        {content}
      </Link>
    );
  }

  return content;
}