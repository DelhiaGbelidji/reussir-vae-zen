import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Mail, X } from "lucide-react";
import { newsletterSchema } from "@/lib/validation";
import { z } from "zod";

interface NewsletterProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Newsletter = ({ isOpen, onClose }: NewsletterProps) => {
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate input with Zod schema
    try {
      newsletterSchema.parse({ email: email.trim(), confirmEmail: confirmEmail.trim() });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Erreur de validation",
          description: error.issues[0].message,
          variant: "destructive",
        });
        return;
      }
    }

    setIsLoading(true);

    try {
      const { error } = await supabase
        .from("newsletter_subscribers")
        .insert([{ email: email.trim().toLowerCase() }]);

      if (error) {
        if (error.code === "23505") { // Unique constraint violation
          toast({
            title: "Déjà inscrit",
            description: "Cette adresse e-mail est déjà inscrite à la newsletter",
            variant: "destructive",
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "Inscription réussie !",
          description: "Merci de vous être inscrit à notre newsletter VAE",
        });
        setEmail("");
        setConfirmEmail("");
        onClose();
      }
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'inscription",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Newsletter VAE
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute right-4 top-4 h-6 w-6"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">
            Recevez chaque semaine nos conseils sur la VAE, les formations disponibles, 
            et comment réussir votre parcours de formation en ligne.
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Adresse e-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmEmail">Confirmer l'adresse e-mail</Label>
              <Input
                id="confirmEmail"
                type="email"
                placeholder="votre@email.com"
                value={confirmEmail}
                onChange={(e) => setConfirmEmail(e.target.value)}
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? "Inscription..." : "S'inscrire à la newsletter"}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Hook for managing first-time visitor popup
export const useNewsletterPopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const hasSeenNewsletter = localStorage.getItem("hasSeenNewsletterPopup");
    if (!hasSeenNewsletter) {
      // Show popup after a short delay for better UX
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = () => {
    setShowPopup(false);
    localStorage.setItem("hasSeenNewsletterPopup", "true");
  };

  return { showPopup, closePopup };
};