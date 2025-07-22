import { Link } from "react-router-dom";
import { Clock, HelpCircle, FileCheck } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface QuizProps {
  id: string;
  title: string;
  description: string;
  questionCount: number;
  estimatedTime: string;
  difficulty: "facile" | "moyen" | "difficile";
  formationId: string;
  slug: string;
}

const difficultyColors = {
  facile: "bg-green-100 text-green-800",
  moyen: "bg-amber-100 text-amber-800",
  difficile: "bg-red-100 text-red-800",
};

const QuizCard = ({ quiz }: { quiz: QuizProps }) => {
  return (
    <Card variant="bordered" className="h-full flex flex-col">
      <CardContent className="p-6 flex-grow">
        <div className="flex justify-between items-start mb-4">
          <Badge variant="outline" className={difficultyColors[quiz.difficulty]}>
            {quiz.difficulty.charAt(0).toUpperCase() + quiz.difficulty.slice(1)}
          </Badge>
          <div className="flex items-center text-muted-foreground text-sm">
            <HelpCircle className="w-4 h-4 mr-1" />
            {quiz.questionCount} questions
          </div>
        </div>
        
        <h3 className="font-heading text-xl font-semibold mb-3">
          {quiz.title}
        </h3>
        
        <p className="text-muted-foreground mb-4">
          {quiz.description}
        </p>
        
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="w-4 h-4 mr-2" />
          <span>Temps estimé : {quiz.estimatedTime}</span>
        </div>
      </CardContent>
      
      <CardFooter className="p-6 pt-0 mt-auto">
        <Link to={`/quiz/${quiz.slug}`} className="w-full">
          <Button variant="accent" className="w-full">
            <FileCheck className="mr-2 h-4 w-4" />
            Commencer le quiz
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default QuizCard;