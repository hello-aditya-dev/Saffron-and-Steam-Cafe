import Hero from "@/components/home/Hero";
import MarqueeSection from "@/components/home/MarqueeSection";
import Story from "@/components/home/Story";
import OccasionCards from "@/components/home/OccasionCards";
import FeaturedMenu from "@/components/home/FeaturedMenu";
import EveningFeature from "@/components/home/EveningFeature";
import BrandStatement from "@/components/home/BrandStatement";
import Testimonials from "@/components/home/Testimonials";
import GalleryPreview from "@/components/home/GalleryPreview";
import VisitSection from "@/components/home/VisitSection";
import FAQSection from "@/components/home/FAQSection";
import ClosingCTA from "@/components/home/ClosingCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <MarqueeSection />
      <Story />
      <OccasionCards />
      <FeaturedMenu />
      <EveningFeature />
      <BrandStatement />
      <Testimonials />
      <GalleryPreview />
      <VisitSection />
      <FAQSection />
      <ClosingCTA />
    </>
  );
}