import { useAuth } from "@/store/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { LogOutIcon } from "lucide-react";

export default function Dashboard() {
  const { user, signOut } = useAuth();
  if (!user) return null; // RequireAuth already redirects

  const initials = user.username.slice(0, 2).toUpperCase();

  return (
    <section className="mx-auto w-full max-w-xl px-4 py-16">
      <Card>
        <CardContent className="flex flex-col items-center gap-4 p-10 text-center">
          <Avatar className="size-20">
            <AvatarImage
              src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${user.email}`}
            />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>

          <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
            ✓ Logged in
          </span>
          <div>
            <h1 className="text-3xl font-bold">Hello, {user.username} 👋</h1>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            {user.createdAt && (
              <p className="mt-1 text-xs text-muted-foreground">
                Member since {new Date(user.createdAt).toLocaleDateString()}
              </p>
            )}
          </div>

          <Separator className="w-full" />
          <p className="text-sm text-muted-foreground">
            This page is protected — signed-out visitors get bounced to
            /sign-in.
          </p>
          <Button variant="destructive" onClick={signOut}>
            <LogOutIcon /> Sign Out
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}
