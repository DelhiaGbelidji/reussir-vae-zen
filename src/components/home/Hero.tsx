import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-secondary py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Réussissez votre <span className="text-primary">VAE</span> avec confiance
            </h1>
            <p className="text-lg md:text-xl mb-8 text-muted-foreground">
              Transformez votre expérience professionnelle en diplôme reconnu.
              Notre plateforme vous accompagne à chaque étape de votre validation des acquis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/formations">
                <Button variant="hero" className="w-full sm:w-auto">
                  Découvrir nos formations
                  <ArrowRight className="ml-1" />
                </Button>
              </Link>
              <Link to="/a-propos">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  En savoir plus
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-primary opacity-10 rounded-2xl" />
            <img 
              src={heroImage} 
              alt="Réussir sa VAE" 
              className="rounded-2xl shadow-lg relative z-10 w-full h-auto"
            />
            <div className="absolute -bottom-3 -right-3 w-24 h-24 bg-gradient-accent rounded-full opacity-70 blur-xl" />
            <div className="absolute -top-3 -left-3 w-32 h-32 bg-gradient-primary rounded-full opacity-70 blur-xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;