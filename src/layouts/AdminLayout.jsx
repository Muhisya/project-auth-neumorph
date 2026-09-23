import { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/store/auth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  LayoutDashboardIcon,
  UsersIcon,
  SettingsIcon,
  LogOutIcon,
  ShieldIcon,
  GlobeIcon,
  MoonIcon,
  SunIcon,
} from "lucide-react";

const LINKS = [
  { to: "/admin", end: true, icon: LayoutDashboardIcon, label: "Dashboard" },
  { to: "/admin/users", icon: UsersIcon, label: "Users" },
  { to: "/admin/settings", icon: SettingsIcon, label: "Settings" },
];

function AdminNavItem({ to, end, icon: Icon, label }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
          isActive
            ? "shadow-neu-inset-sm text-primary" // pressed-in when active
            : "text-muted-foreground hover:text-foreground"
        }`
      }
    >
      <Icon className="size-4 shrink-0" />
      {label}
    </NavLink>
  );
}

export default function AdminLayout() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const [dark, setDark] = useState(() =>
    document.documentElement.classList.contains("dark"),
  );

  const toggleTheme = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark", !dark);
  };

  const handleSignOut = () => {
    signOut();
    navigate("/", { replace: true });
  };

  const initials = user?.username.slice(0, 2).toUpperCase() ?? "";

  return (
    <div className="flex min-h-svh">
      {/* ===== Sidebar (desktop) ===== */}
      <aside className="sticky top-0 hidden h-svh w-64 flex-col gap-2 border-r p-4 md:flex">
        <Link
          to="/"
          className="mb-4 flex items-center gap-2 px-2 text-lg font-bold"
        >
          <span className="grid size-9 place-items-center rounded-full bg-card text-primary shadow-neu-xs">
            <ShieldIcon className="size-4" />
          </span>
          Admin
        </Link>

        {LINKS.map((l) => (
          <AdminNavItem key={l.to} {...l} />
        ))}

        <div className="mt-auto space-y-2">
          <Button variant="ghost" asChild className="w-full justify-start">
            <Link to="/">
              <GlobeIcon /> View site
            </Link>
          </Button>

          <div className="neu-well flex items-center gap-3">
            <Avatar className="size-9">
              <AvatarImage
                src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${user?.email}`}
              />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{user?.username}</p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-primary">
                Admin
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="shrink-0"
            >
              {dark ? <SunIcon /> : <MoonIcon />}
            </Button>
            <Button
              variant="ghost"
              className="flex-1 justify-start text-destructive"
              onClick={handleSignOut}
            >
              <LogOutIcon /> Sign out
            </Button>
          </div>
        </div>
      </aside>

      {/* ===== Main ===== */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* mobile top bar */}
        <header className="sticky top-0 z-40 border-b bg-background p-4 md:hidden">
          <div className="mb-3 flex items-center justify-between">
            <Link to="/admin" className="flex items-center gap-2 font-bold">
              <span className="grid size-8 place-items-center rounded-full bg-card text-primary shadow-neu-xs">
                <ShieldIcon className="size-4" />
              </span>
              Admin
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSignOut}
              aria-label="Sign out"
            >
              <LogOutIcon />
            </Button>
          </div>
          <nav className="flex gap-1 overflow-x-auto">
            {LINKS.map((l) => (
              <AdminNavItem key={l.to} {...l} />
            ))}
          </nav>
        </header>

        <main className="flex-1 p-6 md:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
