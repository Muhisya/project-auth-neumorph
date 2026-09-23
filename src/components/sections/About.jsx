import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useReveal } from "@/hooks/useReveal";
import {
  ZapIcon, PuzzleIcon, LayersIcon, MoonIcon, Volume2Icon,
} from "lucide-react";

const FEATURES = [
  { icon: ZapIcon, title: "Fast", desc: "Powered by Vite and Tailwind v4." },
  { icon: PuzzleIcon, title: "Composable", desc: "Radix UI primitives under the hood." },
  { icon: LayersIcon, title: "Neumorphic", desc: "Extruded cards, debossed inputs, soft shadows." },
  { icon: MoonIcon, title: "Dark mode", desc: "A graphite dark theme included." },
];

export default function AboutSection() {
  const { ref, shown } = useReveal();

  return (
    <section
      id="about"
      ref={ref}
      className={`mx-auto w-full max-w-6xl scroll-mt-20 px-4 py-16 md:px-6 ${
        shown
          ? "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-6 motion-safe:duration-700"
          : "opacity-0"
      }`}
    >
      <Card className="overflow-hidden py-0">
        <CardContent className="grid items-center gap-0 p-0 lg:grid-cols-2">
          {/* ===== Left: soft-UI composition ===== */}
          <AspectRatio ratio={4 / 3} className="order-last h-full lg:order-first">
            <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-background p-8">
              {/* decorative pebbles */}
              <div className="absolute -right-16 -top-16 size-48 rounded-full bg-card shadow-neu-lg" />
              <div className="absolute -bottom-16 -left-14 size-52 rounded-full bg-card shadow-neu-lg" />
              <div className="absolute left-12 top-10 size-8 rounded-full bg-card shadow-neu-inset" />

              {/* mock soft-UI settings kit */}
              <div className="relative z-10 w-full max-w-[280px] space-y-5 rounded-3xl bg-card p-6 shadow-neu">
                {/* toggle row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <span className="grid size-9 place-items-center rounded-xl bg-card text-primary shadow-neu-xs">
                      <MoonIcon className="size-4" />
                    </span>
                    Dark mode
                  </div>
                  <div className="flex h-7 w-12 items-center justify-end rounded-full bg-muted p-1 shadow-neu-inset-sm">
                    <span className="size-5 rounded-full bg-card shadow-neu-xs" />
                  </div>
                </div>

                {/* slider row */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <span className="grid size-9 place-items-center rounded-xl bg-card text-primary shadow-neu-xs">
                        <Volume2Icon className="size-4" />
                      </span>
                      Softness
                    </div>
                    <span className="text-xs text-muted-foreground">80%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted shadow-neu-inset-sm">
                    <div className="h-full w-4/5 rounded-full bg-primary/60" />
                  </div>
                </div>

                {/* avatar stack row */}
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {["A", "S", "B"].map((ch) => (
                      <span
                        key={ch}
                        className="grid size-8 place-items-center rounded-full bg-card text-[10px] font-bold text-primary shadow-neu-xs ring-2 ring-background"
                      >
                        {ch}
                      </span>
                    ))}
                  </div>
                  <span className="grid size-8 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground shadow-neu-xs">
                    +
                  </span>
                </div>
              </div>
            </div>
          </AspectRatio>

          {/* ===== Right: copy + feature pebbles ===== */}
          <div className="flex flex-col gap-5 p-8 md:p-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">About this project</h2>
              <p className="mt-3 text-muted-foreground">
                This guest page is built entirely from shadcn/ui components and themed
                with Neumorphism — one monochrome surface, dual light-source shadows
                and Poppins typography.
              </p>
            </div>

            {/* debossed wells with raised icon pebbles */}
            <ul className="grid gap-3 sm:grid-cols-2">
              {FEATURES.map(({ icon: Icon, title, desc }) => (
                <li
                  key={title}
                  className="flex items-start gap-3 rounded-2xl bg-card p-4 shadow-neu-inset-sm"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-card text-primary shadow-neu-xs">
                    <Icon className="size-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{title}</p>
                    <p className="text-xs text-muted-foreground">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}