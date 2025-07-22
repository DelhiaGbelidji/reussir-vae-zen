import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import VaeExplained from "@/components/home/VaeExplained";
import Newsletter from "@/components/home/Newsletter";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <VaeExplained />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;