import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  { q: "What is shadcn/ui?", a: "It's a collection of copy-paste components built on Radix UI and Tailwind CSS that you own completely." },
  { q: "Is this really Neumorph Design?", a: "Yes — Poppins typography, Neumorph's blue palette, elevation shadow tokens and rounded shapes are all applied through the theme." },
  { q: "Does it support dark mode?", a: "Yes. A full Neumorph dark theme (#121212 surfaces) is included — just add the `dark` class to <html>." },
  { q: "Can I use this commercially?", a: "Yes, everything is MIT licensed." },
];

export default function FaqSection() {
  return (
    <section id="faq" className="mx-auto w-full max-w-3xl scroll-mt-20 px-4 py-16 md:px-6">
      <h2 className="mb-8 text-center text-3xl font-bold tracking-tight">
        Frequently asked questions
      </h2>
      <Accordion type="single" collapsible className="w-full">
        {FAQS.map((f, i) => (
          <AccordionItem key={f.q} value={`faq-${i}`}>
            <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
            <AccordionContent className="">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}