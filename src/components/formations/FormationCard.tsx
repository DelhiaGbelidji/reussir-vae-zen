import { Link } from "react-router-dom";
import { Clock, GraduationCap, Layers } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface FormationProps {
  id: string;
  title: string;
  domain: string;
  duration: string;
  prerequisites: string;
  summary: string;
  slug: string;
}

const FormationCard = ({ formation }: { formation: FormationProps }) => {
  return (
    <Card variant="elevated" className="h-full flex flex-col">
      <CardContent className="p-6 flex-grow">
        <div className="mb-4">
          <span className="inline-block bg-secondary text-secondary-foreground text-xs font-medium px-2.5 py-1 rounded">
            {formation.domain}
          </span>
        </div>
        <h3 className="font-heading text-xl font-semibold mb-3">
          {formation.title}
        </h3>
        <p className="text-muted-foreground mb-4 line-clamp-3">
          {formation.summary}
        </p>
        <div className="space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="w-4 h-4 mr-2" />
            <span>Durée : {formation.duration}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <GraduationCap className="w-4 h-4 mr-2" />
            <span>Prérequis : {formation.prerequisites}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0 mt-auto">
        <Link to={`/formations/${formation.slug}`} className="w-full">
          <Button variant="default" className="w-full">
            <Layers className="mr-2 h-4 w-4" />
            Voir les détails
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default FormationCard;