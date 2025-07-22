import { QuizProps } from "@/components/quiz/QuizCard";

const quizzes: QuizProps[] = [
  {
    id: "1",
    title: "Les fondamentaux du management commercial",
    description: "Testez vos connaissances sur les concepts essentiels du management commercial et de la gestion d'équipe en point de vente.",
    questionCount: 15,
    estimatedTime: "20 minutes",
    difficulty: "moyen",
    formationId: "1", // BTS Management Commercial Opérationnel
    slug: "fondamentaux-management-commercial",
  },
  {
    id: "2",
    title: "Gestion des ressources humaines",
    description: "Évaluez vos compétences en matière de gestion administrative du personnel, recrutement et formation.",
    questionCount: 20,
    estimatedTime: "25 minutes",
    difficulty: "difficile",
    formationId: "2", // Licence Pro Ressources Humaines
    slug: "gestion-ressources-humaines",
  },
  {
    id: "3",
    title: "Développement de l'enfant",
    description: "Testez vos connaissances sur les étapes du développement de l'enfant de 0 à 6 ans et les besoins associés.",
    questionCount: 12,
    estimatedTime: "15 minutes",
    difficulty: "facile",
    formationId: "3", // CAP Petite Enfance
    slug: "developpement-enfant",
  },
  {
    id: "4",
    title: "HTML, CSS et bases du développement web",
    description: "Évaluez vos connaissances sur les fondamentaux du développement web front-end.",
    questionCount: 18,
    estimatedTime: "22 minutes",
    difficulty: "moyen",
    formationId: "4", // Titre Pro Développeur Web
    slug: "html-css-bases-dev-web",
  },
  {
    id: "5",
    title: "Gestion administrative et commerciale",
    description: "Testez vos compétences en gestion administrative, commerciale et comptable au sein d'une PME.",
    questionCount: 15,
    estimatedTime: "20 minutes",
    difficulty: "moyen",
    formationId: "5", // BTS Gestion de la PME
    slug: "gestion-administrative-commerciale",
  },
  {
    id: "6",
    title: "Animation de groupe et dynamique sociale",
    description: "Évaluez vos connaissances sur les techniques d'animation de groupe et la gestion de la dynamique sociale.",
    questionCount: 14,
    estimatedTime: "18 minutes",
    difficulty: "facile",
    formationId: "6", // BPJEPS Animation Sociale
    slug: "animation-groupe-dynamique-sociale",
  },
];

export default quizzes;