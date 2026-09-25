import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useReveal } from "@/hooks/useReveal";

const FAQS = [
  {
    q: "What is shadcn/ui?",
    a: "It's a collection of copy-paste components built on Radix UI and Tailwind CSS that you own completely.",
  },
  {
    q: "Is this really Neumorphism?",
    a: "Yes — Poppins typography, a monochrome surface, dual light-source shadows (extruded and inset) and soft rounded shapes are all applied through the theme.",
  },
  {
    q: "Does it support dark mode?",
    a: "Yes. A graphite dark theme is included — just add the `dark` class to <html> and every shadow adapts to the darker surface.",
  },
  {
    q: "Can I use this commercially?",
    a: "Yes, everything is MIT licensed.",
  },
];

export default function FaqSection() {
  const { ref, shown } = useReveal();

  return (
    <section
      id="faq"
      ref={ref}
      aria-labelledby="faq-heading"
      className={`mx-auto w-full max-w-4xl scroll-mt-20 px-4 py-20 md:px-8 md:py-24 ${
        shown
          ? "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-6 motion-safe:duration-700"
          : "opacity-0"
      }`}
    >
      <div className="relative overflow-hidden rounded-[2rem] px-5 py-12 sm:px-8 md:px-12 md:py-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-24 size-64 rounded-full"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-28 -left-16 size-64 rounded-full"
        />

        <header className="relative mx-auto mb-9 max-w-2xl text-center md:mb-11">
          <span className="inline-flex items-center rounded-full border border-border/70 bg-background/70 px-3.5 py-1 text-xs font-medium tracking-wide text-muted-foreground shadow-sm">
            Quick answers
          </span>
          <h2
            id="faq-heading"
            className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Frequently asked questions
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-muted-foreground sm:text-base">
            A little more detail about the components, theme, and getting started.
          </p>
        </header>

        <Accordion type="single" collapsible className="relative mx-auto w-full max-w-2xl">
          {FAQS.map((faq, index) => (
            <AccordionItem
              key={faq.q}
              value={`faq-${index}`}
              className="mb-3 overflow-hidden rounded-2xl border border-border/60 bg-background/85 px-5 shadow-neu transition-shadow last:mb-0 data-[state=open]:shadow-neu-lg sm:px-6"
            >
              <AccordionTrigger className="py-5 text-left text-sm font-semibold leading-6 text-foreground hover:no-underline sm:text-base">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="pb-5 pr-6 text-sm leading-7 text-muted-foreground sm:text-[15px] data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-top-2 duration-300 motion-reduce:animate-none">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
