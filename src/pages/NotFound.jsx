// src/pages/NotFound.jsx
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="grid min-h-svh place-items-center px-4 text-center">
      <div>
        <p className="text-8xl font-bold text-primary">404</p>
        <p className="mt-2 text-muted-foreground">
          This page got pressed too hard and fell into the surface.
        </p>
        <Button asChild className="mt-6">
          <Link to="/">Back home</Link>
        </Button>
      </div>
    </div>
  );
}