import Header from "@/components/Header";
import SpaceScene from "@/components/SpaceScene";
import ScrollProgress from "@/components/ScrollProgress";
import FeaturedProjects from "@/components/FeaturedProjects";
import CaseHighlight from "@/components/CaseHighlight";
import Process from "@/components/Process";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import HudBadge from "@/components/HudBadge";
import PixelSeparator from "@/components/PixelSeparator";
import CookieBanner from "@/components/CookieBanner";

export default function Home() {
  return (
    <div className="w-full">
      <ScrollProgress />
      <Header />
      <SpaceScene />
      <PixelSeparator />
      <FeaturedProjects />
      <PixelSeparator />
      <CaseHighlight />
      <PixelSeparator />
      <Process />
      <PixelSeparator />
      <About />
      <PixelSeparator />
      <Contact />
      <Footer />
      <HudBadge />
      <CookieBanner />
    </div>
  );
}
