import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/store/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignIn() {
  const signIn = useAuth((s) => s.signIn);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange", // validate while typing → isValid stays live
    defaultValues: { email: "", password: "" }, // requirement #2
  });

  const onSubmit = (data) => {
    const result = signIn(data);
    if (!result.ok) {
      setError("password", { type: "server", message: result.error });
      return;
    }
    navigate(result.user.role === "admin" ? "/admin" : "/user", {
      replace: true,
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">Welcome back</h1>
        <p className="text-sm text-muted-foreground">Sign in to your account</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            className="p-3"
            placeholder="name@example.com"
            aria-invalid={!!errors.email}
            {...register("email", {
              required: "Email is required.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address.",
              },
            })}
          />
          {errors.email && (
            <p className="text-sm font-medium text-destructive">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            className="p-3"
            aria-invalid={!!errors.password}
            {...register("password", {
              required: "Password is required.",
              minLength: {
                value: 6,
                message: "Password is at least 6 characters.",
              },
            })}
          />
          {errors.password && (
            <p className="text-sm font-medium text-destructive">
              {errors.password.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? "Signing in..." : "Sign-In"}
        </Button>

        <Button type="button" variant="outline" asChild className="w-full">
          <Link to="/sign-up">Signup</Link>
        </Button>
      </form>
    </div>
  );
}
