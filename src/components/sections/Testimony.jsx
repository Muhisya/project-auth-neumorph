import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useReveal } from "@/hooks/useReveal";

const TESTIMONIALS = [
  {
    name: "Andi Pratama",
    role: "Frontend Engineer",
    img: 12,
    quote:
      "The neumorphic theme makes shadcn feel soft and tactile — like the UI is carved from clay.",
  },
  {
    name: "Siti Rahma",
    role: "Product Designer",
    img: 32,
    quote:
      "Dual-light shadows and Poppins — it finally looks like real soft UI.",
  },
  {
    name: "Budi Santoso",
    role: "Founder, TokoKita",
    img: 51,
    quote: "We shipped our landing page in a day with these sections.",
  },
  {
    name: "Maya Kusuma",
    role: "Student",
    img: 5,
    quote: "The carousel and accordion were super easy to wire up.",
  },
  {
    name: "Rizky Hakim",
    role: "Backend Engineer",
    img: 68,
    quote: "Clean code, clean UI. Exactly what I needed for my demo.",
  },
];

export default function TestimonySection() {
  const { ref, shown } = useReveal();

  return (
    <section
      id="testimony"
      ref={ref}
      aria-labelledby="testimony-heading"
      className={`mx-auto w-full max-w-6xl scroll-mt-20 px-4 py-20 md:px-8 md:py-24 ${
        shown
          ? "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-6 motion-safe:duration-700"
          : "opacity-0"
      }`}
    >
      <div className="relative overflow-hidden rounded-[2rem] px-5 py-12 md:px-12 md:py-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-24 size-72 rounded-full"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -left-20 size-72 rounded-full"
        />

        <header className="relative mx-auto mb-10 max-w-2xl text-center md:mb-12">
          <span className="inline-flex items-center rounded-full border border-border/70 bg-background/70 px-3.5 py-1 text-xs font-medium tracking-wide text-muted-foreground shadow-sm">
            Community feedback
          </span>
          <h2
            id="testimony-heading"
            className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            What people are saying
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-muted-foreground sm:text-base">
            A few words from developers building with this starter.
          </p>
        </header>

        <Carousel
          opts={{ align: "start", loop: true }}
          aria-label="Developer testimonials"
          className="relative mx-auto w-full max-w-6xl px-10 sm:px-10"
        >
          <CarouselContent className="ml-1 py-4">
            {TESTIMONIALS.map((testimonial) => (
              <CarouselItem
                key={testimonial.name}
                className="basis-full pl-4 sm:basis-1/2 lg:basis-1/3"
              >
                <Card className="group h-full rounded-2xl border border-border/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-neu-lg">
                  <CardContent className="flex h-full min-h-64 flex-col p-6 sm:p-7">
                    <span
                      aria-hidden="true"
                      className="-mb-1 select-none font-serif text-5xl leading-none text-primary/35"
                    >
                      “
                    </span>
                    <blockquote className="flex-1 text-[15px] leading-7 text-foreground/80">
                      {testimonial.quote}
                    </blockquote>
                    <div className="mt-7 flex items-center gap-3 border-t border-border/60 pt-5">
                      <Avatar className="size-11 ring-2 ring-background shadow-sm">
                        <AvatarImage
                          src={`https://i.pravatar.cc/150?img=${testimonial.img}`}
                          alt=""
                        />
                        <AvatarFallback>
                          {testimonial.name
                            .split(" ")
                            .map((part) => part[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-foreground">
                          {testimonial.name}
                        </p>
                        <p className="mt-0.5 truncate text-xs text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious
            aria-label="Previous testimonial"
            className="left-0 size-9 border-border/70 bg-background/90 shadow-sm transition-transform hover:scale-105"
          />
          <CarouselNext
            aria-label="Next testimonial"
            className="right-0 size-9 border-border/70 bg-background/90 shadow-sm transition-transform hover:scale-105"
          />
        </Carousel>
      </div>
    </section>
  );
}

// Notes: keeps the existing data, avatar source, reveal hook, and custom
// neumorphic shadows. If the project does not enable `loop` in its carousel
// implementation, remove that option; the rest of the component is unchanged.
