import { useState } from 'react';
import { NavLink } from "react-router-dom";
import { Menu, X, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navItems = [
    { name: "Accueil", path: "/" },
    { name: "Formations", path: "/formations" },
    ...(user ? [{ name: "Tableau de bord", path: "/tableau-de-bord" }] : []),
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
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm">
                  <User className="h-4 w-4" />
                  <span>{user.email}</span>
                </div>
                <Button 
                  variant="outline" 
                  onClick={signOut}
                  className="flex items-center space-x-2"
                  size="sm"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Déconnexion</span>
                </Button>
              </div>
            ) : (
              <>
                <NavLink to="/connexion">
                  <Button variant="outline" size="default">
                    Connexion
                  </Button>
                </NavLink>
                <NavLink to="/inscription">
                  <Button variant="gradient" size="default">
                    Inscription
                  </Button>
                </NavLink>
              </>
            )}
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
            {user ? (
              <div className="space-y-4 mt-4">
                <div className="flex items-center space-x-2 text-sm">
                  <User className="h-4 w-4" />
                  <span>{user.email}</span>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    signOut();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Déconnexion</span>
                </Button>
              </div>
            ) : (
              <div className="space-y-2 mt-4">
                <NavLink to="/connexion" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" size="default" className="w-full">
                    Connexion
                  </Button>
                </NavLink>
                <NavLink to="/inscription" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="gradient" size="default" className="w-full">
                    Inscription
                  </Button>
                </NavLink>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;