import { FaGithub, FaXTwitter, FaInstagram } from "react-icons/fa6";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const PAGES = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Testimony", href: "#testimony" },
  { label: "FAQ", href: "#faq" },
];

export default function FooterSection() {
  return (
    <footer className="mt-8 bg-card shadow-elevation-1">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="space-y-3">
            <p className="text-lg font-bold">Neumorph</p>
            <p className="text-sm text-muted-foreground">
              A guest home page built with shadcn/ui, styled with Neumorph Design.
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Pages
            </p>
            <nav className="flex flex-col items-start gap-1">
              {PAGES.map((p) => (
                <Button key={p.label} variant="link" asChild className="h-auto p-0">
                  <a href={p.href}>{p.label}</a>
                </Button>
              ))}
            </nav>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Follow us
            </p>
                <div className="flex gap-2">
                <Button variant="ghost" size="icon" asChild>
                    <a href="#" aria-label="GitHub"><FaGithub /></a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                    <a href="#" aria-label="X / Twitter"><FaXTwitter /></a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                    <a href="#" aria-label="Instagram"><FaInstagram /></a>
                </Button>
                </div>
          </div>
        </div>

        <Separator className="my-8" />
        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Material. All rights reserved.
        </p>
      </div>
    </footer>
  );
}