import Marquee from "@/components/shared/Marquee";

export default function MarqueeSection() {
  return (
    <section className="py-3.5 bg-espresso overflow-hidden" aria-hidden="true">
      <Marquee text="COFFEE · BRUNCH · PASTRIES · LATE LUNCH · EVENING PLATES · GOOD CONVERSATION ·" />
    </section>
  );
}