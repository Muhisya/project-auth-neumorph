import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/store/auth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LayoutDashboardIcon,
  LogOutIcon,
  MoonIcon,
  SunIcon,
  ShieldIcon,
  UserIcon,
} from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Testimony", href: "#testimony" },
  { label: "FAQ", href: "#faq" },
];

export default function SiteNavbar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [dark, setDark] = useState(false);

  const toggleTheme = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark", !dark);
  };

  const initials = user?.username.slice(0, 2).toUpperCase() ?? "";

  return (
    <header className="sticky top-0 z-50 bg-background shadow-neu-sm">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2 text-lg font-bold">
          <span className="grid size-9 place-items-center rounded-full bg-card text-primary shadow-neu-xs">
            N
          </span>
          Neumorph
        </Link>

        <div className="hidden items-center gap-4 md:flex">
          {NAV_LINKS.map((link) => (
            <Button key={link.label} variant="ghost" asChild>
              <a href={link.href}>{link.label}</a>
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {dark ? <SunIcon /> : <MoonIcon />}
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="rounded-full" aria-label="Account menu">
                  <Avatar className="size-9">
                    <AvatarImage
                      src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${user.email}`}
                    />
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-full max-w-xs">
                <DropdownMenuLabel>
                  <p className="text-sm font-medium">{user.username}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                  <span
                    className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                      user.role === "admin"
                        ? "bg-primary/15 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {user.role ?? "user"}
                  </span>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                {user.role === "admin" ? (
                  <DropdownMenuItem asChild>
                    <Link to="/admin">
                      <ShieldIcon /> Admin panel
                    </Link>
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem asChild>
                    <Link to="/user">
                      <UserIcon /> My Space
                    </Link>
                  </DropdownMenuItem>
                )}

                <DropdownMenuItem asChild>
                  <Link to="/dashboard">
                    <LayoutDashboardIcon /> Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    signOut();
                    navigate("/", { replace: true });
                  }}
                >
                  <LogOutIcon /> Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild>
              <Link to="/sign-in">Sign In</Link>
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
}
