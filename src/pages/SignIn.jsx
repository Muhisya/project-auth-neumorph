import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/store/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignIn() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const setField = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

function handleSubmit(e) {
  e.preventDefault();
  setError("");

  const result = useAuth.getState().signIn(form);
  if (!result.ok) return setError(result.error);

  navigate(result.user.role === "admin" ? "/admin" : "/user", { replace: true });
}

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">Welcome back</h1>
        <p className="text-sm text-muted-foreground">Sign in to your account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            className="p-3"
            id="email"
            type="email"
            placeholder="name@example.com"
            value={form.email}
            onChange={setField("email")}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            className="p-3"
            id="password"
            type="password"
            value={form.password}
            onChange={setField("password")}
            required
          />
        </div>

        {error && (
          <p className="text-sm font-medium text-destructive">{error}</p>
        )}

        <Button type="submit" className="w-full">
          Sign-In
        </Button>
        <Button type="button" variant="outline" asChild className="w-full">
          <Link to="/sign-up">Signup</Link>
        </Button>
      </form>
    </div>
  );
}
