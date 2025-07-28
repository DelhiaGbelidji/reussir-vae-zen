import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FormationCard from "@/components/formations/FormationCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Formation {
  id: string;
  title: string;
  domain: string;
  duration: string;
  prerequisites: string;
  summary: string;
  slug: string;
}

const Formations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [formations, setFormations] = useState<Formation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFormations();
  }, []);

  const fetchFormations = async () => {
    try {
      const { data, error } = await supabase
        .from('formations')
        .select('*')
        .order('title');

      if (error) throw error;
      setFormations(data || []);
    } catch (error) {
      console.error('Error fetching formations:', error);
    } finally {
      setLoading(false);
    }
  };

  // Extract unique domains for filtering
  const domains = [...new Set(formations.map((formation) => formation.domain))];

  // Filter formations based on search and domain filter
  const filteredFormations = formations.filter((formation) => {
    const matchesSearch = formation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          formation.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDomain = selectedDomain ? formation.domain === selectedDomain : true;
    return matchesSearch && matchesDomain;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <section className="bg-muted py-12">
          <div className="container mx-auto px-4">
            <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-center">
              Nos formations VAE
            </h1>
            <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-8">
              Découvrez les formations disponibles pour votre validation des acquis de l'expérience.
              Chaque formation est accompagnée de fiches détaillées et de quiz pour vous aider à réussir.
            </p>

            {/* Search and filter */}
            <div className="max-w-3xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <Input
                    type="text"
                    placeholder="Rechercher une formation..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-background"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 pointer-events-none" />
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={selectedDomain === null ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedDomain(null)}
                  >
                    Tous
                  </Button>
                  {domains.map((domain) => (
                    <Button
                      key={domain}
                      variant={selectedDomain === domain ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedDomain(domain)}
                    >
                      {domain}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Formations list */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-pulse">Chargement des formations...</div>
              </div>
            ) : filteredFormations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFormations.map((formation) => (
                  <FormationCard key={formation.id} formation={formation} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">Aucune formation trouvée</h3>
                <p className="text-muted-foreground">
                  Essayez de modifier vos critères de recherche.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Formations;