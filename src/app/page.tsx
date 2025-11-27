import Header from "@/components/Header";
import SpaceScene from "@/components/SpaceScene";
import About from "@/components/About";
import CTA from "@/components/CTA";
import Separator from "@/components/Separator";
import Approach from "@/components/Approach";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";

export default function Home() {
  return (
    <div className="w-full max-w-[1400px] mx-auto">
      <Header />
      <SpaceScene />
      <About />
      <CTA />
      <Separator />
      <Approach />
      <Separator />
      <Contact />
      <Footer />
      <CookieBanner />
    </div>
  );
}
