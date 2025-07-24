import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Clock, BookOpen } from "lucide-react";
import { Navigate } from "react-router-dom";

interface QuizResult {
  id: string;
  score: number;
  total_questions: number;
  completed_at: string;
  quiz: {
    title: string;
    difficulty: string;
    formation: {
      title: string;
      domain: string;
    };
  };
}

const Dashboard = () => {
  const { user, loading } = useAuth();
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [loadingResults, setLoadingResults] = useState(true);

  useEffect(() => {
    if (user) {
      fetchQuizResults();
    }
  }, [user]);

  const fetchQuizResults = async () => {
    try {
      const { data, error } = await supabase
        .from('quiz_results')
        .select(`
          id,
          score,
          total_questions,
          completed_at,
          quizzes!inner(
            title,
            difficulty,
            formations!inner(
              title,
              domain
            )
          )
        `)
        .order('completed_at', { ascending: false });

      if (error) throw error;

      const formattedResults = data?.map(result => ({
        id: result.id,
        score: result.score,
        total_questions: result.total_questions,
        completed_at: result.completed_at,
        quiz: {
          title: result.quizzes.title,
          difficulty: result.quizzes.difficulty,
          formation: {
            title: result.quizzes.formations.title,
            domain: result.quizzes.formations.domain,
          },
        },
      })) || [];

      setQuizResults(formattedResults);
    } catch (error) {
      console.error('Error fetching quiz results:', error);
    } finally {
      setLoadingResults(false);
    }
  };

  const getScoreColor = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-amber-600";
    return "text-red-600";
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'facile': return "bg-green-100 text-green-800";
      case 'moyen': return "bg-amber-100 text-amber-800";
      case 'difficile': return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!user) {
    return <Navigate to="/connexion" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2">
                Tableau de bord
              </h1>
              <p className="text-muted-foreground mb-8">
                Suivez vos progrès et consultez vos résultats de quiz
              </p>

              {loadingResults ? (
                <div className="text-center py-8">
                  <div className="animate-pulse">Chargement de vos résultats...</div>
                </div>
              ) : quizResults.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-12">
                    <BookOpen className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="font-heading text-xl font-semibold mb-2">
                      Aucun quiz complété
                    </h3>
                    <p className="text-muted-foreground">
                      Commencez par explorer nos formations et passer vos premiers quiz !
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          Quiz complétés
                        </CardTitle>
                        <Trophy className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{quizResults.length}</div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          Score moyen
                        </CardTitle>
                        <Trophy className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {Math.round(
                            quizResults.reduce((acc, result) => 
                              acc + (result.score / result.total_questions) * 100, 0
                            ) / quizResults.length
                          )}%
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          Dernier quiz
                        </CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {new Date(quizResults[0]?.completed_at).toLocaleDateString('fr-FR')}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-4">
                    <h2 className="font-heading text-2xl font-semibold">
                      Historique des quiz
                    </h2>
                    {quizResults.map((result) => (
                      <Card key={result.id}>
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg mb-1">
                                {result.quiz.title}
                              </h3>
                              <p className="text-muted-foreground">
                                {result.quiz.formation.title} • {result.quiz.formation.domain}
                              </p>
                            </div>
                            
                            <div className="flex items-center gap-4">
                              <Badge 
                                variant="outline" 
                                className={getDifficultyColor(result.quiz.difficulty)}
                              >
                                {result.quiz.difficulty.charAt(0).toUpperCase() + result.quiz.difficulty.slice(1)}
                              </Badge>
                              
                              <div className="text-right">
                                <div className={`text-lg font-semibold ${getScoreColor(result.score, result.total_questions)}`}>
                                  {result.score}/{result.total_questions}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {Math.round((result.score / result.total_questions) * 100)}%
                                </div>
                              </div>
                              
                              <div className="text-sm text-muted-foreground">
                                {new Date(result.completed_at).toLocaleDateString('fr-FR')}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;