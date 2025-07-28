import { z } from "zod";

// Auth validation schemas
export const loginSchema = z.object({
  email: z.string()
    .min(1, "L'email est requis")
    .email("Format d'email invalide")
    .max(255, "L'email est trop long"),
  password: z.string()
    .min(1, "Le mot de passe est requis")
    .min(6, "Le mot de passe doit contenir au moins 6 caractères")
    .max(128, "Le mot de passe est trop long"),
});

export const signupSchema = z.object({
  email: z.string()
    .min(1, "L'email est requis")
    .email("Format d'email invalide")
    .max(255, "L'email est trop long"),
  password: z.string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .max(128, "Le mot de passe est trop long")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Le mot de passe doit contenir au moins une minuscule, une majuscule et un chiffre"),
  confirmPassword: z.string(),
  displayName: z.string()
    .min(1, "Le nom d'affichage est requis")
    .max(50, "Le nom d'affichage est trop long")
    .regex(/^[a-zA-ZÀ-ÿ\s-']+$/, "Le nom ne peut contenir que des lettres, espaces, tirets et apostrophes"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

// Newsletter validation schema
export const newsletterSchema = z.object({
  email: z.string()
    .min(1, "L'email est requis")
    .email("Format d'email invalide")
    .max(255, "L'email est trop long"),
  confirmEmail: z.string()
    .min(1, "La confirmation d'email est requise")
    .email("Format d'email invalide"),
}).refine((data) => data.email === data.confirmEmail, {
  message: "Les adresses email ne correspondent pas",
  path: ["confirmEmail"],
});

// Chat message validation schema
export const chatMessageSchema = z.object({
  message: z.string()
    .min(1, "Le message ne peut pas être vide")
    .max(1000, "Le message est trop long (maximum 1000 caractères)")
    .trim(),
});

// Sanitize HTML content
export const sanitizeHtml = (input: string): string => {
  return input
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .trim();
};

// Rate limiting helper
export const createRateLimit = (windowMs: number, maxRequests: number) => {
  const requests = new Map<string, number[]>();

  return (identifier: string): boolean => {
    const now = Date.now();
    const windowStart = now - windowMs;
    
    if (!requests.has(identifier)) {
      requests.set(identifier, []);
    }
    
    const userRequests = requests.get(identifier)!;
    const recentRequests = userRequests.filter(timestamp => timestamp > windowStart);
    
    if (recentRequests.length >= maxRequests) {
      return false;
    }
    
    recentRequests.push(now);
    requests.set(identifier, recentRequests);
    return true;
  };
};