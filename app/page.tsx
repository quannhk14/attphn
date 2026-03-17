import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { FoodPlacesSection } from "@/components/food-places-section";
import { MapPreviewSection } from "@/components/map-preview-section";
import { NewsSection } from "@/components/news-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <NewsSection />
      <FoodPlacesSection />
      <MapPreviewSection />
      <Footer />
    </main>
  );
}
