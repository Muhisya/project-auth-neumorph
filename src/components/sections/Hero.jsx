import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  PlayIcon, SkipBackIcon, SkipForwardIcon, HeartIcon,
} from "lucide-react";

export default function HeroSection() {
  return (
    <section id="home" className="mx-auto w-full max-w-6xl scroll-mt-20 px-4 pt-10 md:px-6">
      <Card className="overflow-hidden py-0">
        <CardContent className="grid items-center gap-0 p-0 lg:grid-cols-2">
          {/* ===== Left: copy ===== */}
          <div className="flex flex-col gap-4 p-8 md:p-12">
            <span className="w-fit rounded-full bg-card px-3 py-1 text-xs font-medium text-primary shadow-neu-inset-sm">
              ✨ Built with shadcn/ui + Neumorphism
            </span>

            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              Interfaces carved<br className="hidden md:block" /> from clay
            </h1>

            <p className="text-muted-foreground">
              A clean starter combining React, Tailwind CSS v4 and Radix UI —
              restyled as soft UI: extruded surfaces, debossed inputs and two
              gentle light sources.
            </p>

            <div className="mt-2 flex flex-wrap gap-3">
              <Button size="lg">Get Started</Button>
              <Button size="lg" variant="outline">Learn More</Button>
            </div>
          </div>

          {/* ===== Right: soft-UI composition (AspectRatio kept for the task sheet) ===== */}
          <AspectRatio ratio={4 / 3} className="h-full">
            <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-background p-8">
              {/* decorative pebbles */}
              <div className="absolute -left-16 -top-16 size-48 rounded-full bg-card shadow-neu-lg" />
              <div className="absolute -bottom-20 -right-14 size-56 rounded-full bg-card shadow-neu-lg" />
              <div className="absolute right-14 top-8 size-10 rounded-full bg-card shadow-neu-inset" />

              {/* mock soft-UI music player */}
              <div className="relative z-10 w-full max-w-[280px] rounded-3xl bg-card p-6 shadow-neu">
                <span className="absolute -right-3 -top-3 grid size-10 place-items-center rounded-full bg-card text-destructive shadow-neu-xs">
                  <HeartIcon className="size-4" />
                </span>

                <div className="flex items-center gap-4">
                  <div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-primary/15 text-xl shadow-neu-xs">
                    🎵
                  </div>
                  <div className="flex-1 space-y-2.5">
                    <div className="h-2.5 w-3/4 rounded-full bg-muted shadow-neu-inset-sm" />
                    <div className="h-2.5 w-1/2 rounded-full bg-muted shadow-neu-inset-sm" />
                  </div>
                </div>

                <div className="mt-6 h-2 rounded-full bg-muted shadow-neu-inset-sm">
                  <div className="h-full w-2/3 rounded-full bg-primary/60" />
                </div>

                <div className="mt-6 flex items-center justify-center gap-6">
                  <span className="grid size-10 place-items-center rounded-full bg-card text-muted-foreground shadow-neu-xs">
                    <SkipBackIcon className="size-4" />
                  </span>
                  <span className="grid size-14 place-items-center rounded-full bg-card text-primary shadow-neu-sm">
                    <PlayIcon className="size-5" />
                  </span>
                  <span className="grid size-10 place-items-center rounded-full bg-card text-muted-foreground shadow-neu-xs">
                    <SkipForwardIcon className="size-4" />
                  </span>
                </div>
              </div>

              {/* flat vs soft pill toggle */}
              <div className="absolute bottom-6 z-10 flex items-center rounded-full bg-card p-1.5 shadow-neu-inset-sm">
                <span className="rounded-full px-4 py-1.5 text-xs font-medium text-muted-foreground">Flat</span>
                <span className="rounded-full bg-card px-4 py-1.5 text-xs font-medium text-primary shadow-neu-xs">Soft</span>
              </div>
            </div>
          </AspectRatio>
        </CardContent>
      </Card>
    </section>
  );
}