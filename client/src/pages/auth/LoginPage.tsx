import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import AuthCard from "../../components/auth/AuthCard";
import FormInput from "../../components/auth/FormInput";
import { authApi } from "../../api_services/auth/AuthAPIService";
import { useAuth } from "../../hooks/auth/useAuthHook";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    if (!formData.username)
      newErrors.username = "Username is required";

    if (!formData.password)
      newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      const response = await authApi.login(
        formData.username,
        formData.password
      );

      if (response.success && response.data) {
        login(response.data);
        navigate("/");
      } else {
        setErrors({ general: response.message });
      }
    } catch {
      setErrors({ general: "Login failed" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthCard
      title="Welcome Back"
      subtitle="Sign in to continue your fitness journey"
      footerText="Don't have an account?"
      footerLinkText="Create one"
      footerLinkTo="/register"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {errors.general && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
            {errors.general}
          </div>
        )}

        <FormInput
          label="Username"
          name="username"
          type="text"
          placeholder="example@email.com"
          icon={Mail}
          value={formData.username}
          onChange={handleChange}
          error={errors.username}
          autoComplete="username"
        />

        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>

            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
              className="w-full rounded-lg border border-gray-200 bg-white/50 pl-10 pr-10 py-2.5"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>

          {errors.password && (
            <p className="text-sm text-red-600">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-lg bg-emerald-600 text-white px-4 py-3 font-semibold"
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </AuthCard>
  );
}