import { useParams, Link } from "react-router-dom";
import { Clock, GraduationCap, Layers, ArrowLeft, BookOpen } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import QuizCard from "@/components/quiz/QuizCard";
import formations from "@/data/formations";
import quizzes from "@/data/quizzes";

const FormationDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const formation = formations.find((f) => f.slug === slug);
  const relatedQuizzes = quizzes.filter((q) => q.formationId === formation?.id);

  if (!formation) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Formation non trouvée</h2>
            <Link to="/formations">
              <Button>Retour aux formations</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <section className="bg-muted py-12">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <Link to="/formations" className="inline-flex items-center text-primary hover:underline mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour aux formations
              </Link>
              <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                {formation.title}
              </h1>
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="inline-flex items-center bg-secondary/50 text-secondary-foreground px-3 py-1 rounded-full text-sm">
                  <Layers className="mr-2 h-4 w-4" />
                  {formation.domain}
                </div>
                <div className="inline-flex items-center bg-secondary/50 text-secondary-foreground px-3 py-1 rounded-full text-sm">
                  <Clock className="mr-2 h-4 w-4" />
                  Durée : {formation.duration}
                </div>
                <div className="inline-flex items-center bg-secondary/50 text-secondary-foreground px-3 py-1 rounded-full text-sm">
                  <GraduationCap className="mr-2 h-4 w-4" />
                  Prérequis : {formation.prerequisites}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Formation content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h2 className="font-heading text-2xl font-semibold mb-6">
                  Présentation de la formation
                </h2>
                <div className="prose max-w-none">
                  <p className="text-lg mb-4">
                    {formation.summary}
                  </p>
                  <p className="mb-4">
                    Cette certification est accessible par la Validation des Acquis de l'Expérience (VAE).
                    Pour l'obtenir, vous devrez démontrer que vous possédez les compétences, aptitudes et
                    connaissances nécessaires à travers votre expérience professionnelle.
                  </p>
                  <p>
                    Notre plateforme vous accompagne tout au long de votre démarche VAE avec des ressources
                    pédagogiques adaptées et des quiz d'entraînement pour vous aider à identifier vos points
                    forts et vos axes d'amélioration.
                  </p>
                </div>

                <div className="mt-8">
                  <h2 className="font-heading text-2xl font-semibold mb-6">
                    Quiz associés
                  </h2>
                  {relatedQuizzes.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {relatedQuizzes.map((quiz) => (
                        <QuizCard key={quiz.id} quiz={quiz} />
                      ))}
                    </div>
                  ) : (
                    <Card variant="bordered" className="p-6 text-center">
                      <p className="text-muted-foreground mb-4">
                        Aucun quiz n'est disponible pour cette formation pour le moment.
                      </p>
                    </Card>
                  )}
                </div>
              </div>

              <div className="lg:col-span-1">
                <Card variant="elevated" className="p-6 sticky top-24">
                  <h3 className="font-heading text-xl font-semibold mb-4">
                    Accompagnement VAE
                  </h3>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <BookOpen className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                      <span>Fiches pédagogiques complètes</span>
                    </li>
                    <li className="flex items-start">
                      <BookOpen className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                      <span>Quiz d'auto-évaluation adaptés</span>
                    </li>
                    <li className="flex items-start">
                      <BookOpen className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                      <span>Conseils personnalisés pour votre dossier</span>
                    </li>
                    <li className="flex items-start">
                      <BookOpen className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                      <span>Préparation à l'entretien avec le jury</span>
                    </li>
                  </ul>
                  <Button variant="gradient" size="lg" className="w-full">
                    Démarrer ma VAE
                  </Button>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FormationDetail;