import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,
} from "@/components/ui/carousel";

const TESTIMONIALS = [
  { name: "Andi Pratama", role: "Frontend Engineer", img: 12, quote: "The Neumorph theme makes shadcn feel like a native Google product. Love it." },
  { name: "Siti Rahma", role: "Product Designer", img: 32, quote: "Elevation shadows and Roboto — it finally looks like real Neumorph Design." },
  { name: "Budi Santoso", role: "Founder, TokoKita", img: 51, quote: "We shipped our landing page in a day with these sections." },
  { name: "Maya Kusuma", role: "Student", img: 5, quote: "The carousel and accordion were super easy to wire up." },
  { name: "Rizky Hakim", role: "Backend Engineer", img: 68, quote: "Clean code, clean UI. Exactly what I needed for my demo." },
];

export default function TestimonySection() {
  return (
    <section id="testimony" className="mx-auto w-full max-w-6xl scroll-mt-20 px-4 py-16 md:px-6">
      <div className="mx-auto mb-8 max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight">What people say</h2>
        <p className="mt-2 text-muted-foreground">
          Real feedback from developers using this starter.
        </p>
      </div>

      <Carousel opts={{ align: "start" }} className="mx-auto w-full max-w-4xl">
        <CarouselContent className="-ml-4 p-10 gap-2">
          {TESTIMONIALS.map((t) => (
            <CarouselItem key={t.name} className="pl-4 md:basis-1/2 lg:basis-1/3">
              <Card className="h-full shadow-elevation-1 transition-shadow hover:shadow-neu-lg">
                <CardContent className="flex h-full flex-col items-center gap-6 text-center">
                  <Avatar className="size-14 border">
                    <AvatarImage src={`https://i.pravatar.cc/150?img=${t.img}`} alt={t.name} />
                    <AvatarFallback>
                      {t.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-sm text-muted-foreground">“{t.quote}”</p>
                  <div className="mt-auto">
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}