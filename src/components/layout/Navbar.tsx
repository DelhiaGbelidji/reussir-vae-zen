import { useState } from 'react';
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navItems = [
    { name: "Accueil", path: "/" },
    { name: "Formations", path: "/formations" },
    { name: "À propos", path: "/a-propos" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo and Brand */}
          <NavLink to="/" className="flex items-center gap-2">
            <img src={logo} alt="Réussir ma VAE" className="h-10 w-auto" />
            <span className="font-heading font-semibold text-lg md:text-xl text-foreground">
              Réussir ma VAE
            </span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "font-medium transition-colors hover:text-primary",
                    isActive ? "text-primary" : "text-foreground"
                  )
                }
              >
                {item.name}
              </NavLink>
            ))}
            <NavLink to="/connexion">
              <Button variant="gradient" size="default">
                Connexion
              </Button>
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "block py-2 font-medium transition-colors hover:text-primary",
                    isActive ? "text-primary" : "text-foreground"
                  )
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </NavLink>
            ))}
            <NavLink to="/connexion" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="gradient" size="default" className="w-full mt-2">
                Connexion
              </Button>
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;