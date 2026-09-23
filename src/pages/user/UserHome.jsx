import { Link } from "react-router-dom";
import { useAuth } from "@/store/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { SettingsIcon, GlobeIcon, CalendarIcon, MailIcon } from "lucide-react";

export default function UserHome() {
  const user = useAuth((s) => s.user);

  const DETAILS = [
    { icon: MailIcon, label: "Email", value: user.email },
    { icon: CalendarIcon, label: "Member since", value: new Date(user.createdAt).toLocaleDateString() },
  ];

  return (
    <div className="mx-auto w-full max-w-3xl space-y-8 px-4 py-12">
      {/* Greeting card */}
      <Card>
        <CardContent className="flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left">
          <Avatar className="size-20 shadow-neu-sm">
            <AvatarImage src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${user.email}`} />
            <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
              <h1 className="text-2xl font-bold">Hello, {user.username} 👋</h1>
              <span className="rounded-full bg-muted px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground shadow-neu-xs">
                {user.role ?? "user"}
              </span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Welcome to your personal space — only signed-in members can see this page.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Account details */}
      <Card>
        <CardContent className="space-y-1">
          <h2 className="mb-3 font-semibold">Account details</h2>
          {DETAILS.map(({ icon: Icon, label, value }, i) => (
            <div key={label}>
              {i > 0 && <Separator />}
              <div className="flex items-center justify-between gap-4 py-3 text-sm">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Icon className="size-4" /> {label}
                </span>
                <span className="truncate font-medium">{value}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick actions */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Button size="lg" asChild>
          <Link to="/user/profile"><SettingsIcon /> Edit profile</Link>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <Link to="/"><GlobeIcon /> Back to site</Link>
        </Button>
      </div>
    </div>
  );
}