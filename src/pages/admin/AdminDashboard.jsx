import { useAuth } from "@/store/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AdminDashboard() {
  const { users } = useAuth();
  const admins = users.filter((u) => u.role === "admin").length;
  const recent = [...users]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const STATS = [
    { label: "Total users", value: users.length, icon: "👥" },
    { label: "Admins", value: admins, icon: "🛡️" },
    { label: "Members", value: users.length - admins, icon: "🙋" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Overview of registered accounts (stored in localStorage).
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        {STATS.map((s) => (
          <Card key={s.label}>
            <CardContent className="flex items-center gap-4">
              <span className="grid size-12 place-items-center rounded-2xl bg-card text-xl shadow-neu-xs">
                {s.icon}
              </span>
              <div>
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="space-y-4">
          <h2 className="font-semibold">Recent signups</h2>
          {recent.map((u) => (
            <div key={u.id} className="flex items-center gap-3">
              <Avatar className="size-9">
                <AvatarImage
                  src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${u.email}`}
                />
                <AvatarFallback>
                  {u.username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{u.username}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {u.email}
                </p>
              </div>
              <span
                className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                  u.role === "admin"
                    ? "bg-primary/15 text-primary"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {u.role ?? "user"}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
