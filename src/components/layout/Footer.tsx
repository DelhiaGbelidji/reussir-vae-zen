import { NavLink } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Mail } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="Réussir ma VAE" className="h-10 w-auto" />
              <span className="font-heading font-semibold text-lg">
                Réussir ma VAE
              </span>
            </div>
            <p className="text-sm mt-2">
              Votre partenaire pour réussir votre Validation des Acquis de l'Expérience. 
              Nous vous accompagnons à chaque étape de votre parcours.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="font-heading font-semibold text-lg mb-4">Liens Rapides</h3>
            <ul className="space-y-2">
              <li>
                <NavLink to="/" className="text-sm hover:text-primary transition-colors">
                  Accueil
                </NavLink>
              </li>
              <li>
                <NavLink to="/formations" className="text-sm hover:text-primary transition-colors">
                  Formations
                </NavLink>
              </li>
              <li>
                <NavLink to="/a-propos" className="text-sm hover:text-primary transition-colors">
                  À propos
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className="text-sm hover:text-primary transition-colors">
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Informations */}
          <div className="md:col-span-1">
            <h3 className="font-heading font-semibold text-lg mb-4">Informations</h3>
            <ul className="space-y-2">
              <li>
                <NavLink to="/mentions-legales" className="text-sm hover:text-primary transition-colors">
                  Mentions légales
                </NavLink>
              </li>
              <li>
                <NavLink to="/politique-de-confidentialite" className="text-sm hover:text-primary transition-colors">
                  Politique de confidentialité
                </NavLink>
              </li>
              <li>
                <NavLink to="/conditions-utilisation" className="text-sm hover:text-primary transition-colors">
                  Conditions d'utilisation
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Newsletter and Social */}
          <div className="md:col-span-1">
            <h3 className="font-heading font-semibold text-lg mb-4">Suivez-nous</h3>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="text-secondary-foreground hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-secondary-foreground hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-secondary-foreground hover:text-primary transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="mailto:contact@reussirmavae.fr" className="text-secondary-foreground hover:text-primary transition-colors" aria-label="Email">
                <Mail size={20} />
              </a>
            </div>
            <NavLink to="/newsletter" className="text-sm hover:text-primary transition-colors">
              S'inscrire à la newsletter
            </NavLink>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-border/50 text-sm text-center">
          <p>© {currentYear} Réussir ma VAE. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;