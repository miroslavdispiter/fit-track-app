import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import Brand from "../common/Brand";
import BackgroundFX from "../common/BackgroundFX";

interface AuthCardProps {
  children: ReactNode;
  title: string;
  subtitle: string;
  footerText: string;
  footerLinkText: string;
  footerLinkTo: string;
}

export default function AuthCard({
  children,
  title,
  subtitle,
  footerText,
  footerLinkText,
  footerLinkTo,
}: AuthCardProps) {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-12">
      <BackgroundFX />

      {/* Logo - top left */}
      <div className="absolute top-6 left-6 z-10">
        <Brand />
      </div>

      {/* Card */}
      <div className="relative w-full max-w-md">
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-gray-100 shadow-xl p-8 sm:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-emerald-700 to-emerald-400 bg-clip-text text-transparent">
                {title}
              </span>
            </h1>
            <p className="mt-2 text-gray-600 text-sm">{subtitle}</p>
          </div>

          {/* Form content */}
          {children}

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-gray-600">
            {footerText}{" "}
            <Link
              to={footerLinkTo}
              className="font-semibold text-emerald-600 hover:text-emerald-700 transition"
            >
              {footerLinkText}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}