import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/store/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignUp() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState("");

  const setField = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (form.password.length < 6)
      return setError("Password must be at least 6 characters.");
    if (form.password !== form.confirm)
      return setError("Passwords do not match.");

    const { confirm, ...data } = form;
    const result = signUp(data);
    if (!result.ok) return setError(result.error);

    navigate("/", { replace: true }); // ✅ account created + logged in
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">Create account</h1>
        <p className="text-sm text-muted-foreground">Sign up to get started</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            className="p-3"
            id="username"
            placeholder="johndoe"
            value={form.username}
            onChange={setField("username")}
            required
          />
        </div>
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
        <div className="space-y-2">
          <Label htmlFor="confirm">Confirm Password</Label>
          <Input
            className="p-3"
            id="confirm"
            type="password"
            value={form.confirm}
            onChange={setField("confirm")}
            required
          />
        </div>

        {error && (
          <p className="text-sm font-medium text-destructive">{error}</p>
        )}

        <Button type="submit" className="w-full">
          Signup
        </Button>
        <Button type="button" variant="link" asChild className="w-full">
          <Link to="/sign-in">Already have an account? Sign in</Link>
        </Button>
      </form>
    </div>
  );
}
