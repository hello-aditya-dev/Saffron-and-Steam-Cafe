"use client";

import { ChevronDown } from "lucide-react";
import Container from "@/components/shared/Container";
import Reveal from "@/components/ui/Reveal";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Do I need a reservation?",
    a: "Walk-ins are always welcome, but a reservation guarantees your table, especially on weekends. Book through our contact page or call us directly.",
  },
  {
    q: "Do you have vegetarian and vegan options?",
    a: "Our menu is largely vegetarian, and many dishes can be made vegan on request. We also offer oat, almond and soy milk for all coffee drinks.",
  },
  {
    q: "Is there a gluten-free menu?",
    a: "Several items are naturally gluten-free or can be adapted. Look for the GF label on the menu, and always confirm with the team before ordering.",
  },
  {
    q: "Are you hiring?",
    a: "We are always keen to hear from passionate baristas, cooks and hospitality people. Send a short note to hello@saffronandsteam.example with \"Careers\" in the subject line.",
  },
  {
    q: "Can I host a private gathering?",
    a: "We can accommodate small groups and semi-private events. Reach out via the contact page with the date, group size and what you have in mind.",
  },
  {
    q: "Is parking available?",
    a: "Street parking is available on Kapurthala Lane. The nearest metro station is Lodhi Road (Violet Line), about a five-minute walk.",
  },
  {
    q: "Are dogs allowed?",
    a: "Well-behaved dogs are welcome in our outdoor seating area. Water bowls are available on request.",
  },
  {
    q: "What about allergens?",
    a: "Some dishes can be adapted, but our kitchen handles gluten, dairy, nuts and other allergens. Please speak with the team before ordering.",
  },
];

export default function FAQSection() {
  return (
    <section className="py-[--spacing-section] bg-ivory">
      <Container>
        <Reveal className="text-center mb-10">
          <h2 className="font-serif text-heading text-espresso">Common questions</h2>
        </Reveal>

        <Reveal delay={0.1} className="max-w-2xl mx-auto">
          <Accordion type="single" collapsible className="divide-y divide-border">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-[0.9375rem] text-espresso hover:text-tangerine transition-colors duration-300 py-5 text-left">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-[0.875rem] text-olive leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </Container>
    </section>
  );
}