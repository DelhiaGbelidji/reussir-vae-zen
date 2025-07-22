import { Card, CardContent } from "@/components/ui/card";
import iconDocumentation from "@/assets/icon-documentation.png";
import iconQuiz from "@/assets/icon-quiz.png";
import iconCertification from "@/assets/icon-certification.png";

const features = [
  {
    title: "Documentation VAE",
    description: "Accédez à des fiches détaillées sur les compétences et connaissances requises pour votre VAE.",
    icon: iconDocumentation,
  },
  {
    title: "Quiz interactifs",
    description: "Testez vos connaissances avec nos quiz spécialement conçus pour vous préparer à votre VAE.",
    icon: iconQuiz,
  },
  {
    title: "Certification",
    description: "Obtenez votre certification grâce à notre accompagnement à chaque étape de votre parcours.",
    icon: iconCertification,
  },
];

const Features = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Comment réussir votre VAE
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Notre plateforme vous offre tous les outils nécessaires pour transformer 
            votre expérience professionnelle en diplôme reconnu.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} variant="gradient" className="overflow-hidden transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-8 flex flex-col items-center text-center">
                <div className="mb-6 bg-background rounded-full p-4 shadow-sm">
                  <img
                    src={feature.icon}
                    alt={feature.title}
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <h3 className="font-heading text-xl font-semibold mb-3">
                  {feature.title}
                </h3>
                <p className="text-card-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;