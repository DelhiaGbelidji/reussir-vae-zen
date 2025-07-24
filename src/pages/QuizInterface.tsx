import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: string;
  question_text: string;
  question_type: 'qcm' | 'vrai_faux';
  options: string[];
  correct_answer: string;
  explanation: string;
  order_index: number;
}

interface Quiz {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  question_count: number;
  estimated_time: string;
  formation: {
    title: string;
    domain: string;
  };
}

const QuizInterface = () => {
  const { slug } = useParams();
  const { user } = useAuth();
  const { toast } = useToast();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchQuizData();
    }
  }, [slug]);

  const fetchQuizData = async () => {
    try {
      // Fetch quiz information
      const { data: quizData, error: quizError } = await supabase
        .from('quizzes')
        .select(`
          id,
          title,
          description,
          difficulty,
          question_count,
          estimated_time,
          formations!inner(
            title,
            domain
          )
        `)
        .eq('slug', slug)
        .single();

      if (quizError) throw quizError;

      setQuiz({
        id: quizData.id,
        title: quizData.title,
        description: quizData.description,
        difficulty: quizData.difficulty,
        question_count: quizData.question_count,
        estimated_time: quizData.estimated_time,
        formation: {
          title: quizData.formations.title,
          domain: quizData.formations.domain,
        },
      });

      // Fetch questions
      const { data: questionsData, error: questionsError } = await supabase
        .from('quiz_questions')
        .select('*')
        .eq('quiz_id', quizData.id)
        .order('order_index');

      if (questionsError) throw questionsError;

      const formattedQuestions = questionsData?.map(q => ({
        id: q.id,
        question_text: q.question_text,
        question_type: q.question_type as 'qcm' | 'vrai_faux',
        options: Array.isArray(q.options) ? q.options.map(opt => String(opt)) : [],
        correct_answer: q.correct_answer,
        explanation: q.explanation || '',
        order_index: q.order_index,
      })) || [];
      
      setQuestions(formattedQuestions);
    } catch (error) {
      console.error('Error fetching quiz data:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger le quiz",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: value
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      finishQuiz();
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const finishQuiz = async () => {
    // Calculate score
    let correctAnswers = 0;
    questions.forEach(question => {
      if (answers[question.id] === question.correct_answer) {
        correctAnswers++;
      }
    });

    setScore(correctAnswers);
    setShowResults(true);

    // Save results to database if user is logged in
    if (user && quiz) {
      try {
        await supabase.from('quiz_results').insert({
          user_id: user.id,
          quiz_id: quiz.id,
          score: correctAnswers,
          total_questions: questions.length,
          answers: answers,
        });

        toast({
          title: "Quiz terminé !",
          description: `Votre score : ${correctAnswers}/${questions.length}`,
        });
      } catch (error) {
        console.error('Error saving quiz results:', error);
      }
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setScore(0);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-pulse">Chargement du quiz...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!quiz || questions.length === 0) {
    return <Navigate to="/formations" replace />;
  }

  if (!user) {
    toast({
      title: "Connexion requise",
      description: "Vous devez être connecté pour passer un quiz",
      variant: "destructive",
    });
    return <Navigate to="/connexion" replace />;
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              {!showResults ? (
                <>
                  {/* Quiz Header */}
                  <div className="mb-8">
                    <h1 className="font-heading text-3xl font-bold mb-2">
                      {quiz.title}
                    </h1>
                    <p className="text-muted-foreground mb-4">
                      {quiz.formation.title} • {quiz.formation.domain}
                    </p>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-muted-foreground mb-2">
                        <span>Question {currentQuestion + 1} sur {questions.length}</span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                      <Progress value={progress} className="w-full" />
                    </div>
                  </div>

                  {/* Question */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">
                        {currentQ.question_text}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <RadioGroup
                        value={answers[currentQ.id] || ""}
                        onValueChange={handleAnswerChange}
                      >
                        {currentQ.options.map((option, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <RadioGroupItem value={option} id={`option-${index}`} />
                            <Label htmlFor={`option-${index}`} className="cursor-pointer">
                              {option}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>

                      <div className="flex justify-between mt-8">
                        <Button
                          onClick={previousQuestion}
                          disabled={currentQuestion === 0}
                          variant="outline"
                        >
                          Précédent
                        </Button>
                        <Button
                          onClick={nextQuestion}
                          disabled={!answers[currentQ.id]}
                        >
                          {currentQuestion === questions.length - 1 ? 'Terminer' : 'Suivant'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : (
                /* Results */
                <Card>
                  <CardHeader className="text-center">
                    <CardTitle className="text-3xl mb-4">
                      Quiz terminé !
                    </CardTitle>
                    <div className="text-6xl mb-4">
                      {score >= questions.length * 0.8 ? (
                        <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                      ) : (
                        <XCircle className="w-16 h-16 text-red-500 mx-auto" />
                      )}
                    </div>
                    <div className="text-2xl font-bold">
                      {score}/{questions.length}
                    </div>
                    <div className="text-lg text-muted-foreground">
                      {Math.round((score / questions.length) * 100)}% de réussite
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Detailed Results */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">Détail des réponses :</h3>
                      {questions.map((question, index) => {
                        const userAnswer = answers[question.id];
                        const isCorrect = userAnswer === question.correct_answer;
                        
                        return (
                          <div key={question.id} className="border rounded-lg p-4">
                            <div className="flex items-start gap-3">
                              {isCorrect ? (
                                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                              ) : (
                                <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                              )}
                              <div className="flex-1">
                                <p className="font-medium mb-2">
                                  Question {index + 1}: {question.question_text}
                                </p>
                                <p className="text-sm">
                                  <span className="font-medium">Votre réponse :</span> {userAnswer}
                                </p>
                                {!isCorrect && (
                                  <p className="text-sm text-green-600">
                                    <span className="font-medium">Bonne réponse :</span> {question.correct_answer}
                                  </p>
                                )}
                                {question.explanation && (
                                  <p className="text-sm text-muted-foreground mt-2">
                                    <span className="font-medium">Explication :</span> {question.explanation}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex justify-center gap-4">
                      <Button onClick={restartQuiz} variant="outline">
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Recommencer
                      </Button>
                      <Button onClick={() => window.history.back()}>
                        Retour aux formations
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default QuizInterface;