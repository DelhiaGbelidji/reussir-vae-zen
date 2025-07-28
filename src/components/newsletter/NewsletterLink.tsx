import { useState } from "react";
import { Newsletter } from "./Newsletter";

export const NewsletterLink = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-sm hover:text-primary transition-colors text-left"
      >
        S'inscrire à la newsletter
      </button>
      <Newsletter isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};