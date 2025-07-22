import { Check } from "lucide-react";

const benefits = [
  "Valorisation de votre expérience professionnelle",
  "Obtention d'un diplôme reconnu sans retourner en formation",
  "Amélioration de vos perspectives de carrière",
  "Renforcement de votre confiance professionnelle",
  "Validation officielle de vos compétences acquises",
];

const VaeExplained = () => {
  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Qu'est-ce que la VAE ?
            </h2>
            <p className="text-lg mb-6 text-muted-foreground">
              La <strong>Validation des Acquis de l'Expérience (VAE)</strong> est un dispositif qui permet 
              à toute personne, quels que soient son âge, sa nationalité, son statut et son niveau de formation, 
              de faire valider les acquis de son expérience pour obtenir une certification professionnelle.
            </p>
            <p className="text-lg mb-8 text-muted-foreground">
              Une certification obtenue par la VAE a la même valeur qu'une certification obtenue 
              par la voie de la formation initiale, continue ou en apprentissage.
            </p>
            
            <div className="space-y-3">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <Check className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <p className="text-foreground">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-background rounded-xl p-6 shadow-md">
            <h3 className="font-heading text-xl font-semibold mb-4 text-primary">
              Les étapes de la VAE
            </h3>
            <ol className="space-y-6">
              <li className="flex">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-4 font-medium">
                  1
                </div>
                <div>
                  <h4 className="font-medium mb-1">Information et conseil</h4>
                  <p className="text-sm text-muted-foreground">
                    Renseignez-vous sur les certifications accessibles et les démarches à suivre.
                  </p>
                </div>
              </li>
              <li className="flex">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-4 font-medium">
                  2
                </div>
                <div>
                  <h4 className="font-medium mb-1">Recevabilité de la demande</h4>
                  <p className="text-sm text-muted-foreground">
                    Déposez votre dossier de candidature qui sera examiné par l'organisme certificateur.
                  </p>
                </div>
              </li>
              <li className="flex">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-4 font-medium">
                  3
                </div>
                <div>
                  <h4 className="font-medium mb-1">Constitution du dossier</h4>
                  <p className="text-sm text-muted-foreground">
                    Décrivez et analysez vos expériences en lien avec le référentiel de la certification visée.
                  </p>
                </div>
              </li>
              <li className="flex">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-4 font-medium">
                  4
                </div>
                <div>
                  <h4 className="font-medium mb-1">Évaluation par le jury</h4>
                  <p className="text-sm text-muted-foreground">
                    Présentez votre dossier devant un jury qui évaluera vos compétences.
                  </p>
                </div>
              </li>
              <li className="flex">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-4 font-medium">
                  5
                </div>
                <div>
                  <h4 className="font-medium mb-1">Validation</h4>
                  <p className="text-sm text-muted-foreground">
                    Obtenez une validation totale ou partielle de la certification visée.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VaeExplained;