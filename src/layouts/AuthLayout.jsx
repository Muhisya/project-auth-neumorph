import { Outlet } from "react-router-dom";
import { SkipBackIcon, PlayIcon, SkipForwardIcon } from "lucide-react";

export default function AuthLayout() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="relative hidden flex-col items-center justify-center gap-8 overflow-hidden p-12 lg:flex">
        {/* decorative soft shapes */}
        <div className="pointer-events-none absolute -left-24 -top-24 size-80 rounded-full bg-card shadow-neu-lg" />
        <div className="pointer-events-none absolute -bottom-28 -right-20 size-96 rounded-full bg-card shadow-neu-lg" />
        <div className="pointer-events-none absolute left-1/2 top-14 size-16 rounded-full bg-card shadow-neu-inset" />

        {/* fake soft-UI player card */}
        <div className="relative z-10 w-72 rounded-3xl bg-card p-6 shadow-neu">
          <div className="flex items-center gap-4">
            <div className="size-14 rounded-2xl bg-primary/15 shadow-neu-xs" />
            <div className="flex-1 space-y-2">
              <div className="h-2.5 w-3/4 rounded-full bg-muted shadow-neu-inset-sm" />
              <div className="h-2.5 w-1/2 rounded-full bg-muted shadow-neu-inset-sm" />
            </div>
          </div>
          <div className="mt-6 h-2 rounded-full bg-muted shadow-neu-inset-sm">
            <div className="h-full w-2/3 rounded-full bg-primary/60" />
          </div>
          <div className="mt-6 flex items-center justify-center gap-6">
            <span className="grid size-10 place-items-center rounded-full bg-card shadow-neu-xs text-muted-foreground">
              <SkipBackIcon className="size-4" />
            </span>
            <span className="grid size-14 place-items-center rounded-full bg-card text-primary shadow-neu-sm">
              <PlayIcon className="size-5" />
            </span>
            <span className="grid size-10 place-items-center rounded-full bg-card shadow-neu-xs text-muted-foreground">
              <SkipForwardIcon className="size-4" />
            </span>
          </div>
        </div>

        {/* pill toggle */}
        <div className="relative z-10 flex items-center rounded-full bg-card p-1.5 shadow-neu-inset-sm">
          <span className="rounded-full px-5 py-2 text-sm font-medium text-muted-foreground">
            Flat
          </span>
          <span className="rounded-full bg-card px-5 py-2 text-sm font-medium text-primary shadow-neu-xs">
            Soft
          </span>
        </div>

        {/* headline */}
        <div className="relative z-10 max-w-sm text-center">
          <h2 className="text-4xl font-bold leading-tight">
            Interfaces carved
            <br />
            from clay
          </h2>
          <p className="mt-3 text-muted-foreground">
            One surface, two light sources, zero hard edges.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
