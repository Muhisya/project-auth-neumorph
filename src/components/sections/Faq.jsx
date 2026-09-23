import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { useReveal } from "@/hooks/useReveal";

const FAQS = [
  { q: "What is shadcn/ui?", a: "It's a collection of copy-paste components built on Radix UI and Tailwind CSS that you own completely." },
  { q: "Is this really Neumorphism?", a: "Yes — Poppins typography, a monochrome surface, dual light-source shadows (extruded and inset) and soft rounded shapes are all applied through the theme." },
  { q: "Does it support dark mode?", a: "Yes. A graphite dark theme is included — just add the `dark` class to <html> and every shadow adapts to the darker surface." },
  { q: "Can I use this commercially?", a: "Yes, everything is MIT licensed." },
];

export default function FaqSection() {
  const { ref, shown } = useReveal();

  return (
    <section
      id="faq"
      ref={ref}
      className={`mx-auto w-full max-w-3xl scroll-mt-20 px-4 py-16 md:px-6 ${
        shown
          ? "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-6 motion-safe:duration-700"
          : "opacity-0"
      }`}
    >
      <h2 className="mb-8 text-center text-3xl font-bold tracking-tight">
        Frequently asked questions
      </h2>
      <Accordion type="single" collapsible className="w-full">
        {FAQS.map((f, i) => (
          <AccordionItem key={f.q} value={`faq-${i}`}>
            <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
            <AccordionContent>{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}