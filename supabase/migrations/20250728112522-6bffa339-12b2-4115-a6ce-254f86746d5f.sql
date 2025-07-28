-- Ajouter des questions de quiz réalistes pour tester les fonctionnalités

-- Questions pour "Les fondamentaux du management commercial"
INSERT INTO quiz_questions (quiz_id, question_text, question_type, options, correct_answer, explanation, order_index) VALUES 
('bf5806bf-4585-439a-b0be-ad270ce9eeaf', 'Quelle est la première étape d''une démarche commerciale efficace ?', 'multiple_choice', 
'["Analyser les besoins du client", "Présenter le produit", "Négocier le prix", "Conclure la vente"]', 
'Analyser les besoins du client', 
'L''analyse des besoins est fondamentale pour adapter son approche commerciale.', 1),

('bf5806bf-4585-439a-b0be-ad270ce9eeaf', 'Qu''est-ce que le cycle de vente ?', 'multiple_choice', 
'["Une technique de négociation", "L''ensemble des étapes de la prospection à la fidélisation", "Un type de contrat", "Une méthode de calcul des commissions"]', 
'L''ensemble des étapes de la prospection à la fidélisation', 
'Le cycle de vente comprend toutes les phases depuis la recherche de prospects jusqu''à la fidélisation client.', 2),

('bf5806bf-4585-439a-b0be-ad270ce9eeaf', 'Quelle technique permet de mieux comprendre les objections clients ?', 'multiple_choice', 
'["L''écoute active", "La pression commerciale", "La baisse immédiate des prix", "L''argumentaire standardisé"]', 
'L''écoute active', 
'L''écoute active permet de comprendre les vraies préoccupations du client derrière ses objections.', 3);

-- Questions pour "Gestion des ressources humaines"
INSERT INTO quiz_questions (quiz_id, question_text, question_type, options, correct_answer, explanation, order_index) VALUES 
('dd215794-0d3e-4d67-b23f-05758a857105', 'Quel est l''objectif principal de la gestion des ressources humaines ?', 'multiple_choice', 
'["Réduire les coûts salariaux", "Optimiser la performance et le bien-être des collaborateurs", "Embaucher le plus de personnes possible", "Automatiser tous les processus"]', 
'Optimiser la performance et le bien-être des collaborateurs', 
'La GRH vise à créer un équilibre entre performance organisationnelle et épanouissement des salariés.', 1),

('dd215794-0d3e-4d67-b23f-05758a857105', 'Qu''est-ce que l''entretien annuel d''évaluation ?', 'multiple_choice', 
'["Un moyen de sanctionner les employés", "Un outil de développement professionnel et de communication", "Une obligation légale uniquement", "Un prétexte pour augmenter les salaires"]', 
'Un outil de développement professionnel et de communication', 
'L''entretien annuel permet de faire le bilan, fixer des objectifs et planifier le développement des compétences.', 2);

-- Questions pour "Développement de l'enfant"
INSERT INTO quiz_questions (quiz_id, question_text, question_type, options, correct_answer, explanation, order_index) VALUES 
('221c4dc0-6a94-47c0-915e-30950cb24f6a', 'À quel âge l''enfant développe-t-il généralement la permanence de l''objet selon Piaget ?', 'multiple_choice', 
'["6-8 mois", "8-12 mois", "12-18 mois", "18-24 mois"]', 
'8-12 mois', 
'Selon Piaget, la permanence de l''objet se développe vers 8-12 mois, marquant une étape cognitive importante.', 1),

('221c4dc0-6a94-47c0-915e-30950cb24f6a', 'Quelle est la caractéristique principale du stade sensori-moteur ?', 'multiple_choice', 
'["Développement du langage", "Apprentissage par les sens et les mouvements", "Pensée abstraite", "Raisonnement logique"]', 
'Apprentissage par les sens et les mouvements', 
'Le stade sensori-moteur (0-2 ans) se caractérise par l''exploration du monde à travers les sens et l''action.', 2);

-- Questions pour "HTML, CSS et bases du développement web"
INSERT INTO quiz_questions (quiz_id, question_text, question_type, options, correct_answer, explanation, order_index) VALUES 
('e533a105-fa33-4418-81ae-1f56b3c585b7', 'Que signifie HTML ?', 'multiple_choice', 
'["Hypertext Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlink and Text Markup Language"]', 
'Hypertext Markup Language', 
'HTML est l''acronyme de HyperText Markup Language, le langage de balisage standard pour créer des pages web.', 1),

('e533a105-fa33-4418-81ae-1f56b3c585b7', 'Quelle propriété CSS permet de changer la couleur du texte ?', 'multiple_choice', 
'["background-color", "text-color", "color", "font-color"]', 
'color', 
'La propriété CSS "color" permet de définir la couleur du texte d''un élément.', 2),

('e533a105-fa33-4418-81ae-1f56b3c585b7', 'Quel élément HTML est utilisé pour créer un lien hypertexte ?', 'multiple_choice', 
'["<link>", "<a>", "<href>", "<url>"]', 
'<a>', 
'L''élément <a> (anchor) est utilisé pour créer des liens hypertextes en HTML.', 3);

-- Mettre à jour le compteur de questions pour chaque quiz
UPDATE quizzes SET question_count = (
  SELECT COUNT(*) FROM quiz_questions WHERE quiz_questions.quiz_id = quizzes.id
) WHERE id IN (
  'bf5806bf-4585-439a-b0be-ad270ce9eeaf',
  'dd215794-0d3e-4d67-b23f-05758a857105', 
  '221c4dc0-6a94-47c0-915e-30950cb24f6a',
  'e533a105-fa33-4418-81ae-1f56b3c585b7'
);