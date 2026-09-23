import { useState } from "react";
import { useAuth } from "@/store/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2Icon, AlertCircleIcon } from "lucide-react";

export default function UserProfile() {
  const user = useAuth((s) => s.user);
  const updateUser = useAuth((s) => s.updateUser);
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null); // { type: "ok" | "error", text }

  function handleSubmit(e) {
    e.preventDefault();
    setMsg(null);

    const result = updateUser({ username, password: password || undefined });
    if (!result.ok) return setMsg({ type: "error", text: result.error });

    setPassword("");
    setMsg({ type: "ok", text: "Profile updated ✓" });
  }

  return (
    <div className="mx-auto w-full max-w-xl px-4 py-12">
      <Card>
        <CardContent>
          {/* header */}
          <div className="mb-8 flex items-center gap-4">
            <Avatar className="size-14 shadow-neu-sm">
              <AvatarImage src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${user.email}`} />
              <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">Edit profile</h1>
              <p className="text-sm text-muted-foreground">
                Changes save instantly across the app.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                className="p-3"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email (read-only)</Label>
              <Input id="email" className="p-3 opacity-60" value={user.email} disabled />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">New password</Label>
              <Input
                id="password"
                className="p-3"
                type="password"
                placeholder="Leave blank to keep current"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* feedback message */}
            {msg && (
              <p
                className={`flex items-center gap-2 rounded-xl p-3 text-sm font-medium ${
                  msg.type === "ok"
                    ? "bg-primary/10 text-primary"
                    : "bg-destructive/10 text-destructive"
                }`}
              >
                {msg.type === "ok" ? <CheckCircle2Icon className="size-4" /> : <AlertCircleIcon className="size-4" />}
                {msg.text}
              </p>
            )}

            <Button type="submit" className="w-full">Save changes</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}