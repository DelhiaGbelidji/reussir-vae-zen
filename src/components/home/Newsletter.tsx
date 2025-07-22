import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer votre adresse email",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Inscription réussie !",
        description: "Merci de vous être inscrit à notre newsletter",
      });
      setEmail("");
      setIsLoading(false);
    }, 1000);
    
    // Note: This would be replaced with actual Supabase integration later
  };

  return (
    <section className="bg-accent py-16">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-primary rounded-2xl py-12 px-6 md:px-12 shadow-lg">
          <div className="max-w-3xl mx-auto text-center">
            <Mail className="w-12 h-12 mx-auto mb-4 text-accent-foreground" />
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-accent-foreground">
              Restez informé
            </h2>
            <p className="text-lg mb-8 text-accent-foreground/90">
              Inscrivez-vous à notre newsletter pour recevoir des conseils, des fiches pratiques 
              et toutes les actualités sur la VAE.
            </p>
            
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Votre adresse email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-accent-foreground/10 text-accent-foreground placeholder:text-accent-foreground/70 border-accent-foreground/20 focus:border-accent-foreground"
                required
              />
              <Button 
                type="submit" 
                variant="accent"
                disabled={isLoading}
                className="sm:flex-shrink-0 font-medium"
              >
                {isLoading ? "Inscription..." : "S'inscrire"}
              </Button>
            </form>
            
            <p className="text-sm mt-4 text-accent-foreground/80">
              En vous inscrivant, vous acceptez de recevoir nos communications par email. 
              Vous pourrez vous désabonner à tout moment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;