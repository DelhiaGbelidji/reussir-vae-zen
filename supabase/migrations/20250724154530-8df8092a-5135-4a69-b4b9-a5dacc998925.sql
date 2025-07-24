-- Create formations table to store training information
CREATE TABLE public.formations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  domain TEXT NOT NULL,
  duration TEXT NOT NULL,
  prerequisites TEXT NOT NULL,
  summary TEXT NOT NULL,
  description TEXT,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create quizzes table to store quiz information
CREATE TABLE public.quizzes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  formation_id UUID NOT NULL REFERENCES public.formations(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('facile', 'moyen', 'difficile')),
  question_count INTEGER NOT NULL DEFAULT 0,
  estimated_time TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create quiz_questions table to store individual questions
CREATE TABLE public.quiz_questions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  quiz_id UUID NOT NULL REFERENCES public.quizzes(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  question_type TEXT NOT NULL CHECK (question_type IN ('qcm', 'vrai_faux')),
  options JSONB, -- Array of possible answers for QCM
  correct_answer TEXT NOT NULL,
  explanation TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create quiz_results table to store user quiz results
CREATE TABLE public.quiz_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  quiz_id UUID NOT NULL REFERENCES public.quizzes(id) ON DELETE CASCADE,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  answers JSONB NOT NULL, -- Store user answers
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, quiz_id, completed_at)
);

-- Create chat_messages table for chatbot history
CREATE TABLE public.chat_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  response TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.formations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for formations (public read)
CREATE POLICY "Formations are viewable by everyone" 
ON public.formations FOR SELECT USING (true);

CREATE POLICY "Only admins can manage formations" 
ON public.formations FOR ALL USING (false);

-- Create policies for quizzes (public read)
CREATE POLICY "Quizzes are viewable by everyone" 
ON public.quizzes FOR SELECT USING (true);

CREATE POLICY "Only admins can manage quizzes" 
ON public.quizzes FOR ALL USING (false);

-- Create policies for quiz_questions (public read)
CREATE POLICY "Quiz questions are viewable by everyone" 
ON public.quiz_questions FOR SELECT USING (true);

CREATE POLICY "Only admins can manage quiz questions" 
ON public.quiz_questions FOR ALL USING (false);

-- Create policies for quiz_results (user can view their own)
CREATE POLICY "Users can view their own quiz results" 
ON public.quiz_results FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own quiz results" 
ON public.quiz_results FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own quiz results" 
ON public.quiz_results FOR UPDATE USING (auth.uid() = user_id);

-- Create policies for chat_messages (user can view their own)
CREATE POLICY "Users can view their own chat messages" 
ON public.chat_messages FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own chat messages" 
ON public.chat_messages FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_formations_updated_at
  BEFORE UPDATE ON public.formations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_quizzes_updated_at
  BEFORE UPDATE ON public.quizzes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data into formations table
INSERT INTO public.formations (title, domain, duration, prerequisites, summary, description, slug) VALUES
('BTS Management Commercial Opérationnel', 'Commerce', '24 mois', 'Bac ou équivalent', 'Formation complète en management commercial et gestion d''équipe', 'Cette formation vous prépare aux métiers du commerce et du management d''équipe commerciale. Vous apprendrez à gérer un point de vente, animer une équipe, et développer la relation client.', 'bts-management-commercial-operationnel'),
('Licence Pro Ressources Humaines', 'RH', '12 mois', 'Bac+2 ou équivalent', 'Spécialisation en gestion des ressources humaines', 'Formation spécialisée dans tous les aspects de la gestion des ressources humaines : recrutement, formation, paie, droit du travail, et gestion des compétences.', 'licence-pro-ressources-humaines'),
('CAP Petite Enfance', 'Petite Enfance', '18 mois', 'Niveau 3ème', 'Formation aux métiers de la petite enfance', 'Formation complète pour travailler avec les enfants de 0 à 6 ans dans différents environnements : crèches, écoles maternelles, centres de loisirs.', 'cap-petite-enfance'),
('Titre Pro Développeur Web', 'Informatique', '15 mois', 'Bac ou équivalent', 'Développement d''applications web et mobiles', 'Formation complète au développement web : HTML, CSS, JavaScript, frameworks modernes, bases de données, et développement d''applications.', 'titre-pro-developpeur-web'),
('BTS Gestion de la PME', 'Gestion', '24 mois', 'Bac ou équivalent', 'Gestion administrative et commerciale d''une PME', 'Formation polyvalente pour assister le dirigeant d''une PME dans la gestion administrative, commerciale, et comptable de l''entreprise.', 'bts-gestion-de-la-pme'),
('BPJEPS Animation Sociale', 'Animation', '18 mois', 'Bac ou équivalent', 'Animation et encadrement de groupes', 'Formation pour devenir animateur social et encadrer des activités d''animation auprès de différents publics.', 'bpjeps-animation-sociale');

-- Insert sample quizzes
INSERT INTO public.quizzes (formation_id, title, description, difficulty, question_count, estimated_time, slug) VALUES
((SELECT id FROM public.formations WHERE slug = 'bts-management-commercial-operationnel'), 'Les fondamentaux du management commercial', 'Testez vos connaissances sur les concepts essentiels du management commercial et de la gestion d''équipe en point de vente.', 'moyen', 15, '20 minutes', 'fondamentaux-management-commercial'),
((SELECT id FROM public.formations WHERE slug = 'licence-pro-ressources-humaines'), 'Gestion des ressources humaines', 'Évaluez vos compétences en matière de gestion administrative du personnel, recrutement et formation.', 'difficile', 20, '25 minutes', 'gestion-ressources-humaines'),
((SELECT id FROM public.formations WHERE slug = 'cap-petite-enfance'), 'Développement de l''enfant', 'Testez vos connaissances sur les étapes du développement de l''enfant de 0 à 6 ans et les besoins associés.', 'facile', 12, '15 minutes', 'developpement-enfant'),
((SELECT id FROM public.formations WHERE slug = 'titre-pro-developpeur-web'), 'HTML, CSS et bases du développement web', 'Évaluez vos connaissances sur les fondamentaux du développement web front-end.', 'moyen', 18, '22 minutes', 'html-css-bases-dev-web'),
((SELECT id FROM public.formations WHERE slug = 'bts-gestion-de-la-pme'), 'Gestion administrative et commerciale', 'Testez vos compétences en gestion administrative, commerciale et comptable au sein d''une PME.', 'moyen', 15, '20 minutes', 'gestion-administrative-commerciale'),
((SELECT id FROM public.formations WHERE slug = 'bpjeps-animation-sociale'), 'Animation de groupe et dynamique sociale', 'Évaluez vos connaissances sur les techniques d''animation de groupe et la gestion de la dynamique sociale.', 'facile', 14, '18 minutes', 'animation-groupe-dynamique-sociale');