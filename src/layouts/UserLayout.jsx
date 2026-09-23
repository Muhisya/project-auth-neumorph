import { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/store/auth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet, SheetContent, SheetTitle, SheetTrigger,
} from "@/components/ui/sheet";
import {
  UserIcon, SettingsIcon, GlobeIcon, LogOutIcon,
  MenuIcon, MoonIcon, SunIcon,
} from "lucide-react";

const LINKS = [
  { to: "/user", end: true, icon: UserIcon, label: "My Space" },
  { to: "/user/profile", icon: SettingsIcon, label: "Profile" },
];

function UserNavItem({ to, end, icon: Icon, label }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
          isActive
            ? "shadow-neu-inset-sm text-primary"      // pressed-in when active
            : "text-muted-foreground hover:text-foreground"
        }`
      }
    >
      <Icon className="size-4 shrink-0" />
      {label}
    </NavLink>
  );
}

export default function UserLayout() {
  const user = useAuth((s) => s.user);
  const signOut = useAuth((s) => s.signOut);
  const navigate = useNavigate();
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
        <Link to="/user" className="mb-4 flex items-center gap-2 px-2 text-lg font-bold">
          <span className="grid size-9 place-items-center rounded-full bg-card text-primary shadow-neu-xs">
            <UserIcon className="size-4" />
          </span>
          My Space
          <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            User
          </span>
        </Link>

        {LINKS.map((l) => <UserNavItem key={l.to} {...l} />)}

        <div className="mt-auto space-y-2">
          <Button variant="ghost" asChild className="w-full justify-start">
            <Link to="/"><GlobeIcon /> View site</Link>
          </Button>

          <div className="neu-well flex items-center gap-3">
            <Avatar className="size-9">
              <AvatarImage src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${user?.email}`} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{user?.username}</p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                {user?.role ?? "user"}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="ghost" size="icon"
              onClick={toggleTheme} aria-label="Toggle theme"
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

      {/* ===== Main column ===== */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* mobile top bar */}
        <header className="sticky top-0 z-40 flex items-center justify-between gap-3 border-b bg-background p-4 md:hidden">
          <Link to="/user" className="flex items-center gap-2 font-bold">
            <span className="grid size-8 place-items-center rounded-full bg-card text-primary shadow-neu-xs">
              <UserIcon className="size-4" />
            </span>
            My Space
          </Link>

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
              {dark ? <SunIcon /> : <MoonIcon />}
            </Button>
            <Button variant="ghost" size="icon" onClick={handleSignOut} aria-label="Sign out">
              <LogOutIcon />
            </Button>

            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <MenuIcon />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetTitle className="flex items-center gap-2">
                  <Avatar className="size-8">
                    <AvatarImage src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${user?.email}`} />
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                  {user?.username}
                </SheetTitle>

                <nav className="mt-6 flex flex-col gap-1">
                  {LINKS.map((l) => <UserNavItem key={l.to} {...l} />)}
                  <Button variant="ghost" asChild className="justify-start">
                    <Link to="/" onClick={() => setMenuOpen(false)}>
                      <GlobeIcon /> View site
                    </Link>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </header>

        <main className="flex-1">
          <Outlet />
        </main>

        <footer className="py-6 text-center text-xs text-muted-foreground">
          My Space — member area of Neumorph
        </footer>
      </div>
    </div>
  );
}